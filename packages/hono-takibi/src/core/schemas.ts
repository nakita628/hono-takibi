import path from 'node:path'
import { zodToOpenAPI } from '../generator/zod-to-openapi/index.js'
import { zodType } from '../generator/zod-to-openapi/type/index.js'
import { core, makeBarell, sortSchemaBlocks } from '../helper/index.js'
import type { OpenAPI, Schema } from '../openapi/index.js'
import {
  ensureSuffix,
  lowerFirst,
  toIdentifierPascalCase,
  zodToOpenAPISchema,
} from '../utils/index.js'

const findSchemaRefs = (code: string, selfName: string): string[] => {
  const re = /\b([A-Za-z_$][A-Za-z0-9_$]*)Schema\b/g
  const out = new Set<string>()
  for (const m of code.matchAll(re)) {
    const base = m[1] ?? ''
    if (base !== selfName && base) out.add(base)
  }
  return Array.from(out)
}

/**
 * Extracts schema references from generated Zod code.
 */
const extractSchemaRefs = (zSchema: string, varNames: ReadonlySet<string>): readonly string[] => {
  const refs: string[] = []
  for (const varName of varNames) {
    const pattern = new RegExp(`\\b${varName}\\b`)
    if (pattern.test(zSchema)) refs.push(varName)
  }
  return refs
}

/**
 * Detects schemas involved in circular references using Tarjan's algorithm.
 */
const detectCircularSchemas = (
  schemaNames: readonly string[],
  depsMap: ReadonlyMap<string, readonly string[]>,
): ReadonlySet<string> => {
  const cyclicSchemas = new Set<string>()

  const nameToVarName = new Map<string, string>()
  const varNameToName = new Map<string, string>()
  for (const name of schemaNames) {
    const varName = toIdentifierPascalCase(ensureSuffix(name, 'Schema'))
    nameToVarName.set(name, varName)
    varNameToName.set(varName, name)
  }

  let index = 0
  const indices = new Map<string, number>()
  const lowLinks = new Map<string, number>()
  const onStack = new Set<string>()
  const stack: string[] = []
  const sccs: string[][] = []

  const strongConnect = (name: string): void => {
    indices.set(name, index)
    lowLinks.set(name, index)
    index++
    stack.push(name)
    onStack.add(name)

    const deps = depsMap.get(name) ?? []
    for (const depVarName of deps) {
      const depName = varNameToName.get(depVarName)
      if (depName === undefined) continue

      if (!indices.has(depName)) {
        strongConnect(depName)
        lowLinks.set(name, Math.min(lowLinks.get(name) ?? 0, lowLinks.get(depName) ?? 0))
      } else if (onStack.has(depName)) {
        lowLinks.set(name, Math.min(lowLinks.get(name) ?? 0, indices.get(depName) ?? 0))
      }
    }

    if (lowLinks.get(name) === indices.get(name)) {
      const scc: string[] = []
      let w: string | undefined
      do {
        w = stack.pop()
        if (w !== undefined) {
          onStack.delete(w)
          scc.push(w)
        }
      } while (w !== name && w !== undefined)
      sccs.push(scc)
    }
  }

  for (const name of schemaNames) {
    if (!indices.has(name)) strongConnect(name)
  }

  for (const scc of sccs) {
    if (scc.length > 1) {
      for (const name of scc) cyclicSchemas.add(name)
    } else if (scc.length === 1) {
      const name = scc[0]
      if (name !== undefined) {
        const varName = nameToVarName.get(name)
        const deps = depsMap.get(name) ?? []
        if (varName && deps.includes(varName)) cyclicSchemas.add(name)
      }
    }
  }

  return cyclicSchemas
}

/**
 * Generate Zod schemas from an OpenAPI/TypeSpec source.
 *
 * @remarks
 * - When `split=true`, writes one file per schema (and an `index.ts`).
 * - Otherwise, emits a single `.ts` file.
 *
 * ```mermaid
 * flowchart TD
 *   A["schema()"] --> B["parseOpenAPI"]
 *   B --> C{"ok?"}
 *   C -- Yes --> D["collect components.schemas"]
 *   C -- No  --> E["return error"]
 *   D --> F{"split mode?"}
 *   F -- Yes --> G["emit per-file + index"]
 *   F -- No  --> H["emit single file"]
 *   G --> I["return success message"]
 *   H --> I
 * ```
 */
export async function schemas(
  openAPI: OpenAPI,
  output: string | `${string}.ts`,
  exportType: boolean,
  split?: boolean,
): Promise<
  | {
      readonly ok: true
      readonly value: string
    }
  | {
      readonly ok: false
      readonly error: string
    }
> {
  if (!openAPI.components?.schemas) return { ok: false, error: 'No schemas found' }
  const schemas = openAPI.components.schemas
  // split
  if (split) {
    const outDir = output.replace(/\.ts$/, '')
    const schemaNames = Object.keys(schemas)

    // Pre-generate all Zod schemas to analyze dependencies
    const varNameSet = new Set(
      schemaNames.map((name) => toIdentifierPascalCase(ensureSuffix(name, 'Schema'))),
    )
    const zSchemaMap = new Map<string, string>()
    const depsMap = new Map<string, readonly string[]>()

    for (const schemaName of schemaNames) {
      const schema = schemas[schemaName]
      const zSchema = zodToOpenAPI(schema)
      const varName = toIdentifierPascalCase(ensureSuffix(schemaName, 'Schema'))
      zSchemaMap.set(schemaName, zSchema)
      const refs = extractSchemaRefs(zSchema, varNameSet).filter((ref) => ref !== varName)
      depsMap.set(schemaName, refs)
    }

    // Detect circular references
    const cyclicSchemas = detectCircularSchemas(schemaNames, depsMap)

    for (const schemaName of schemaNames) {
      const schema = schemas[schemaName] as Schema
      const z = zSchemaMap.get(schemaName) ?? zodToOpenAPI(schema)
      const variableName = toIdentifierPascalCase(ensureSuffix(schemaName, 'Schema'))
      const safeSchemaName = toIdentifierPascalCase(schemaName)

      const isCircular = cyclicSchemas.has(schemaName)
      const isSelfReferencing = z.includes(variableName)
      const needsLazy = isCircular || isSelfReferencing

      const typeDefinition = needsLazy ? `${zodType(schema, safeSchemaName)}\n\n` : ''
      const zExpr = needsLazy ? `z.lazy(() => ${z})` : z
      const returnType = needsLazy ? `:z.ZodType<${safeSchemaName}Type>` : ''

      const schemaCode = `export const ${variableName}${returnType} = ${zExpr}.openapi('${safeSchemaName}')`
      const zodInferCode = exportType
        ? `\n\nexport type ${safeSchemaName} = z.infer<typeof ${variableName}>`
        : ''
      const zs = `${typeDefinition}${schemaCode}${zodInferCode}`

      const importZ = `import { z } from '@hono/zod-openapi'`
      const deps = findSchemaRefs(zs, schemaName).filter((d) => d in schemas)
      const depImports =
        deps.length > 0
          ? deps.map((d) => `import { ${d}Schema } from './${lowerFirst(d)}'`).join('\n')
          : ''
      const fileCode = [importZ, depImports, '\n', zs].filter(Boolean).join('\n')
      const filePath = `${outDir}/${lowerFirst(schemaName)}.ts`
      const coreResult = await core(fileCode, path.dirname(filePath), filePath)
      if (!coreResult.ok) return { ok: false, error: coreResult.error }
    }

    const coreResult = await core(
      makeBarell(schemas),
      path.dirname(`${outDir}/index.ts`),
      `${outDir}/index.ts`,
    )
    if (!coreResult.ok) return { ok: false, error: coreResult.error }

    return {
      ok: true,
      value: `Generated schema code written to ${outDir}/*.ts (index.ts included)`,
    }
  }

  const schemaNames = Object.keys(schemas)
  if (schemaNames.length === 0) {
    return { ok: true, value: 'No schemas found' }
  }

  const schemaBlocks = schemaNames.map((schemaName) => {
    const schema = schemas[schemaName]
    const z = zodToOpenAPI(schema)
    const variableName = toIdentifierPascalCase(ensureSuffix(schemaName, 'Schema'))
    const zExpr = z.includes(variableName) ? `z.lazy(() => ${z})` : z
    const code = zodToOpenAPISchema(variableName, zExpr, true, exportType)
    return { name: variableName, code }
  })

  const sortedBlocks = sortSchemaBlocks(schemaBlocks)
  const schemaDefinitions = sortedBlocks.map((block) => block.code).join('\n\n')
  const importCode = `import { z } from '@hono/zod-openapi'`
  const schemaDefinitionsCode = `${importCode}\n\n${schemaDefinitions}`
  const coreResult = await core(schemaDefinitionsCode, path.dirname(output), output)
  if (!coreResult.ok) return { ok: false, error: coreResult.error }
  return { ok: true, value: `Generated schema code written to ${output}` }
}
