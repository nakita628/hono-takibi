import path from 'node:path'
import { schemasCode } from '../generator/zod-openapi-hono/openapi/components/schemas.js'
import {
  analyzeCircularSchemas,
  core,
  makeBarell,
  makeSchemaCode,
  makeSchemaInfo,
  makeTypeDefinition,
  sortByDependencies,
} from '../helper/index.js'
import type { OpenAPI, Schema } from '../openapi/index.js'
import { lowerFirst, renderNamedImport } from '../utils/index.js'

function findSchemaRefs(code: string, selfName: string): readonly string[] {
  const re = /\b([A-Za-z_$][A-Za-z0-9_$]*)Schema\b/g
  const found = new Set<string>()
  for (const m of code.matchAll(re)) {
    const base = m[1] ?? ''
    if (base && base !== selfName) found.add(base)
  }
  return [...found]
}

function makeSplitSchemaFile(
  schemaName: string,
  schema: Schema,
  schemas: Record<string, Schema>,
  analysis: ReturnType<typeof analyzeCircularSchemas>,
  exportType: boolean,
): string {
  const info = makeSchemaInfo(schemaName, schema, analysis)

  const typeDefinition = info.needsTypeDef
    ? `${makeTypeDefinition(info, analysis.cyclicGroupPascal)}\n\n`
    : ''

  const schemaCode = makeSchemaCode(info, { exportKeyword: 'export ', exportType })
  const content = `${typeDefinition}${schemaCode}`

  const deps = findSchemaRefs(content, schemaName).filter((d) => d in schemas)
  const depImports =
    deps.length > 0
      ? deps.map((d) => renderNamedImport([`${d}Schema`], `./${lowerFirst(d)}`)).join('\n')
      : ''

  const importZ = renderNamedImport(['z'], '@hono/zod-openapi')
  return [importZ, depImports, '\n', content].filter(Boolean).join('\n')
}

/**
 * Generate Zod schemas from an OpenAPI/TypeSpec source.
 */
export async function schemas(
  openAPI: OpenAPI,
  output: string | `${string}.ts`,
  exportType: boolean,
  split?: boolean,
): Promise<
  { readonly ok: true; readonly value: string } | { readonly ok: false; readonly error: string }
> {
  if (!openAPI.components?.schemas) return { ok: false, error: 'No schemas found' }
  const schemas = openAPI.components.schemas
  const schemaNames = Object.keys(schemas)

  if (split) {
    const outDir = output.replace(/\.ts$/, '')
    const analysis = analyzeCircularSchemas(schemas, schemaNames)

    const allResults = await Promise.all([
      ...schemaNames.map((schemaName) => {
        const fileCode = makeSplitSchemaFile(
          schemaName,
          schemas[schemaName],
          schemas,
          analysis,
          exportType,
        )
        const filePath = `${outDir}/${lowerFirst(schemaName)}.ts`
        return core(fileCode, path.dirname(filePath), filePath)
      }),
      core(makeBarell(schemas), path.dirname(`${outDir}/index.ts`), `${outDir}/index.ts`),
    ])

    const firstError = allResults.find((r) => !r.ok)
    if (firstError && !firstError.ok) return { ok: false, error: firstError.error }

    return {
      ok: true,
      value: `Generated schema code written to ${outDir}/*.ts (index.ts included)`,
    }
  }

  if (schemaNames.length === 0) {
    return { ok: true, value: 'No schemas found' }
  }

  const importCode = renderNamedImport(['z'], '@hono/zod-openapi')
  const schemaDefinitions = schemasCode({ schemas }, true, exportType)
  const sorted = sortByDependencies(schemaDefinitions)
  const schemaDefinitionsCode = `${importCode}\n\n${sorted}`
  const coreResult = await core(schemaDefinitionsCode, path.dirname(output), output)
  if (!coreResult.ok) return { ok: false, error: coreResult.error }
  return { ok: true, value: `Generated schema code written to ${output}` }
}
