/**
 * Schema component generation module.
 *
 * Handles generation of Zod schemas from OpenAPI schema components
 * with support for split mode and circular dependency detection.
 *
 * @module core/components/schemas
 */
import path from 'node:path'
import { schemasCode } from '../../generator/zod-openapi-hono/openapi/components/schemas.js'
import {
  analyzeCircularSchemas,
  ast,
  core,
  makeBarell,
  makeSplitSchemaFile,
} from '../../helper/index.js'
import type { Components } from '../../openapi/index.js'
import { lowerFirst, renderNamedImport } from '../../utils/index.js'

/**
 * Generates schema component files.
 *
 * @param schemas - OpenAPI schemas object
 * @param output - Output file path or directory
 * @param split - Whether to split into multiple files
 * @param exportType - Whether to export TypeScript types
 * @returns Promise resolving to success message or error
 *
 * @example
 * ```ts
 * // Generate schemas in single file
 * await schemas(
 *   { User: { type: 'object', ... } },
 *   'src/schemas.ts',
 *   false,
 *   true
 * )
 *
 * // Generate schemas in split mode
 * await schemas(
 *   { User: {...}, Post: {...} },
 *   'src/schemas',
 *   true,
 *   true
 * )
 * // Creates: src/schemas/user.ts, src/schemas/post.ts, src/schemas/index.ts
 * ```
 */
export async function schemas(
  schemas: Components['schemas'],
  output: string,
  split: boolean,
  exportType: boolean,
): Promise<
  { readonly ok: true; readonly value: string } | { readonly ok: false; readonly error: string }
> {
  if (!schemas) return { ok: false, error: 'No schemas found' }

  const schemaNames = Object.keys(schemas)
  if (schemaNames.length === 0) return { ok: true, value: 'No schemas found' }

  if (split) {
    const outDir = String(output).replace(/\.ts$/, '')
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
    if (firstError) return firstError

    return {
      ok: true,
      value: `Generated schema code written to ${outDir}/*.ts (index.ts included)`,
    }
  }

  const importCode = renderNamedImport(['z'], '@hono/zod-openapi')
  const schemaDefinitions = schemasCode({ schemas }, true, exportType)
  const sorted = ast(schemaDefinitions)
  const schemaDefinitionsCode = `${importCode}\n\n${sorted}`
  const coreResult = await core(schemaDefinitionsCode, path.dirname(output), output)
  if (!coreResult.ok) return { ok: false, error: coreResult.error }
  return { ok: true, value: `Generated schema code written to ${output}` }
}
