import path from 'node:path'
import { schemasCode } from '../generator/zod-openapi-hono/openapi/components/schemas.js'
import { zodToOpenAPI } from '../generator/zod-to-openapi/index.js'
import { zodType } from '../generator/zod-to-openapi/type/index.js'
import { analyzeCircularSchemas, core, makeBarell, sortByDependencies } from '../helper/index.js'
import type { OpenAPI, Schema } from '../openapi/index.js'
import { ensureSuffix, lowerFirst, toIdentifierPascalCase } from '../utils/index.js'

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
    const { zSchemaMap, cyclicSchemas, extendedCyclicSchemas, cyclicGroupPascal } =
      analyzeCircularSchemas(schemas, schemaNames)

    const allResults = await Promise.all([
      ...schemaNames.map((schemaName) => {
        const schema = schemas[schemaName] as Schema
        const z = zSchemaMap.get(schemaName) ?? zodToOpenAPI(schema)
        const variableName = toIdentifierPascalCase(ensureSuffix(schemaName, 'Schema'))
        const safeSchemaName = toIdentifierPascalCase(schemaName)

        const isCircular = cyclicSchemas.has(schemaName)
        const isExtendedCircular = extendedCyclicSchemas.has(schemaName)
        const isSelfReferencing = z.includes(variableName)
        const needsLazy = isCircular || isSelfReferencing
        const needsTypeDef = needsLazy || isExtendedCircular

        const typeDefinition = needsTypeDef
          ? `${zodType(schema, safeSchemaName, cyclicGroupPascal)}\n\n`
          : ''
        const zExpr = needsLazy ? `z.lazy(()=>${z})` : z
        const returnType = needsTypeDef ? `:z.ZodType<${safeSchemaName}Type>` : ''

        const schemaCode = `export const ${variableName}${returnType}=${zExpr}.openapi('${safeSchemaName}')`
        const zodInferCode = exportType
          ? `\n\nexport type ${safeSchemaName}=z.infer<typeof ${variableName}>`
          : ''
        const zs = `${typeDefinition}${schemaCode}${zodInferCode}`

        const importZ = `import{z}from'@hono/zod-openapi'`
        const deps = findSchemaRefs(zs, schemaName).filter((d) => d in schemas)
        const depImports =
          deps.length > 0
            ? deps.map((d) => `import{${d}Schema}from'./${lowerFirst(d)}'`).join('\n')
            : ''
        const fileCode = [importZ, depImports, '\n', zs].filter(Boolean).join('\n')
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

  const importCode = `import{z}from'@hono/zod-openapi'`
  const schemaDefinitions = schemasCode({ schemas }, true, exportType)
  const sorted = sortByDependencies(schemaDefinitions)
  const schemaDefinitionsCode = `${importCode}\n\n${sorted}`
  const coreResult = await core(schemaDefinitionsCode, path.dirname(output), output)
  if (!coreResult.ok) return { ok: false, error: coreResult.error }
  return { ok: true, value: `Generated schema code written to ${output}` }
}
