import path from 'node:path'

import { emit } from '../../emit/index.js'
import { zodToOpenAPI } from '../../generator/zod-to-openapi/index.js'
import type { Components } from '../../openapi/index.js'
import {
  ensureSuffix,
  renderNamedImport,
  toIdentifierPascalCase,
  uncapitalize,
  zodToOpenAPISchema,
} from '../../utils/index.js'

/**
 * Generates media type component files.
 *
 * @param mediaTypes - OpenAPI mediaTypes object
 * @param output - Output file path or directory
 * @param split - Whether to split into multiple files
 * @param readonly - Whether to add `.readonly()` modifier to schemas
 * @returns Promise resolving to success message or error
 *
 * @example
 * ```ts
 * // Generate mediaTypes in single file
 * await mediaTypes(
 *   { JsonMedia: { schema: { type: 'object', ... } } },
 *   'src/mediaTypes.ts',
 *   false
 * )
 *
 * // Generate mediaTypes in split mode
 * await mediaTypes(
 *   { JsonMedia: {...}, XmlMedia: {...} },
 *   'src/mediaTypes',
 *   true
 * )
 * // Creates: src/mediaTypes/jsonMedia.ts, src/mediaTypes/xmlMedia.ts, src/mediaTypes/index.ts
 * ```
 */
export async function mediaTypes(
  mediaTypes: Components['mediaTypes'],
  output: string,
  split: boolean,
  readonly?: boolean,
) {
  if (!mediaTypes) return { ok: false, error: 'No mediaTypes found' } as const
  const keys = Object.keys(mediaTypes)
  if (keys.length === 0) return { ok: true, value: 'No mediaTypes found' } as const
  const importCode = renderNamedImport(['z'], '@hono/zod-openapi')
  if (split) {
    const outDir = output.replace(/\.ts$/, '')
    const indexCode = `${keys
      .sort()
      .map((v) => `export * from './${uncapitalize(v)}.ts'`)
      .join('\n')}\n`
    const results = await Promise.all([
      ...keys.map((k) => {
        const v = mediaTypes[k]
        const name = toIdentifierPascalCase(ensureSuffix(k, 'MediaTypeSchema'))
        const filePath = path.join(outDir, `${uncapitalize(k)}.ts`)
        if (typeof v === 'object' && v !== null && '$ref' in v && v.$ref) {
          const refKey = v.$ref.split('/').at(-1) ?? ''
          const refName = toIdentifierPascalCase(ensureSuffix(refKey, 'MediaTypeSchema'))
          const importPath = `./${uncapitalize(refKey)}.ts`
          const body = `import { ${refName} } from '${importPath}'\n\nexport const ${name} = ${refName}\n`
          return emit(body, path.dirname(filePath), filePath)
        }
        if (typeof v === 'object' && v !== null && 'schema' in v) {
          const zodCode = zodToOpenAPI(v.schema)
          const schemaCode = zodToOpenAPISchema(name, zodCode, true, false, true, readonly)
          const body = `${importCode}\n\n${schemaCode}\n`
          return emit(body, path.dirname(filePath), filePath)
        }
        const body = `${importCode}\n\nexport const ${name} = z.unknown()\n`
        return emit(body, path.dirname(filePath), filePath)
      }),
      emit(indexCode, path.dirname(path.join(outDir, 'index.ts')), path.join(outDir, 'index.ts')),
    ])
    const e = results.find((result) => !result.ok)
    if (e) return e
    return {
      ok: true,
      value: `Generated MediaType code written to ${outDir}/*.ts (index.ts included)`,
    } as const
  }
  const definitions = keys
    .map((k) => {
      const v = mediaTypes[k]
      const name = toIdentifierPascalCase(ensureSuffix(k, 'MediaTypeSchema'))
      if (typeof v === 'object' && v !== null && '$ref' in v && v.$ref) {
        const refKey = v.$ref.split('/').at(-1) ?? ''
        const refName = toIdentifierPascalCase(ensureSuffix(refKey, 'MediaTypeSchema'))
        return `export const ${name} = ${refName}`
      }
      if (typeof v === 'object' && v !== null && 'schema' in v) {
        const zodCode = zodToOpenAPI(v.schema)
        return zodToOpenAPISchema(name, zodCode, true, false, true, readonly)
      }
      return `export const ${name} = z.unknown()`
    })
    .join('\n\n')
  const code = `${importCode}\n\n${definitions}\n`
  const emitResult = await emit(code, path.dirname(output), output)
  if (!emitResult.ok) return { ok: false, error: emitResult.error } as const
  return { ok: true, value: `Generated mediaTypes code written to ${output}` } as const
}
