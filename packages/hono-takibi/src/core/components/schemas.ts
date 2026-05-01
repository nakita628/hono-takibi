import path from 'node:path'

import { emit } from '../../emit/index.js'
import { schemasCode } from '../../generator/zod-openapi-hono/openapi/components/schemas.js'
import { analyzeCircularSchemas, ast, makeSplitSchemaFile } from '../../helper/index.js'
import type { Components } from '../../openapi/index.js'
import { makeBarrel, renderNamedImport, uncapitalize } from '../../utils/index.js'

/**
 * Generates schema component files.
 *
 * @param schemas - OpenAPI schemas object
 * @param output - Output file path or directory
 * @param split - Whether to split into multiple files
 * @param exportType - Whether to export TypeScript types
 * @param readonly - Whether to add `.readonly()` modifier to schemas
 * @returns Promise resolving to success message or error
 *
 * @example
 * ```ts
 * // Generate schemas in single file
 * await schemas(
 *   { User: { type: 'object', ... } },
 *   'src/schemas.ts',
 *   false,
 *   true,
 *   false
 * )
 *
 * // Generate schemas in split mode with readonly
 * await schemas(
 *   { User: {...}, Post: {...} },
 *   'src/schemas',
 *   true,
 *   true,
 *   true
 * )
 * // Creates: src/schemas/user.ts, src/schemas/post.ts, src/schemas/index.ts
 * // Each schema has .readonly() modifier
 * ```
 */
export async function schemas(
  schemas: Components['schemas'],
  output: string,
  split: boolean,
  exportType: boolean,
  readonly?: boolean,
) {
  if (!schemas) return { ok: false, error: 'No schemas found' } as const
  const schemaNames = Object.keys(schemas)
  if (schemaNames.length === 0) return { ok: true, value: 'No schemas found' } as const
  if (split) {
    const outDir = output.replace(/\.ts$/, '')
    const analysis = analyzeCircularSchemas(schemas, schemaNames, readonly)
    const results = await Promise.all([
      ...schemaNames.map((schemaName) => {
        const fileCode = makeSplitSchemaFile(
          schemaName,
          schemas[schemaName],
          schemas,
          analysis,
          exportType,
          readonly,
        )
        const filePath = `${outDir}/${uncapitalize(schemaName)}.ts`
        return emit(fileCode, path.dirname(filePath), filePath)
      }),
      emit(makeBarrel(schemas), path.dirname(`${outDir}/index.ts`), `${outDir}/index.ts`),
    ])
    const e = results.find((result) => !result.ok)
    if (e) return e
    return {
      ok: true,
      value: `Generated schema code written to ${outDir}/*.ts (index.ts included)`,
    } as const
  }
  const importCode = renderNamedImport(['z'], '@hono/zod-openapi')
  const schemaDefinitions = schemasCode({ schemas }, true, exportType, readonly)
  const sorted = ast(schemaDefinitions)
  const schemaDefinitionsCode = `${importCode}\n\n${sorted}`
  const emitResult = await emit(schemaDefinitionsCode, path.dirname(output), output)
  if (!emitResult.ok) return { ok: false, error: emitResult.error } as const
  return { ok: true, value: `Generated schema code written to ${output}` } as const
}
