import path from 'node:path'
import { zodToOpenAPI } from '../../generator/zod-to-openapi/index.js'
import { core } from '../../helper/index.js'
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
  readonly?: boolean | undefined,
): Promise<
  { readonly ok: true; readonly value: string } | { readonly ok: false; readonly error: string }
> {
  if (!mediaTypes) return { ok: false, error: 'No mediaTypes found' }

  const keys = Object.keys(mediaTypes)
  if (keys.length === 0) return { ok: true, value: 'No mediaTypes found' }

  const importCode = renderNamedImport(['z'], '@hono/zod-openapi')

  if (split) {
    const outDir = output.replace(/\.ts$/, '')

    // Generate index.ts with sorted exports
    const indexCode = `${keys
      .sort()
      .map((v) => `export * from './${uncapitalize(v)}.ts'`)
      .join('\n')}\n`

    const results = await Promise.all([
      ...keys.map((key) => {
        const v = mediaTypes[key]
        const name = toIdentifierPascalCase(ensureSuffix(key, 'MediaTypeSchema'))
        const filePath = path.join(outDir, `${uncapitalize(key)}.ts`)

        // Handle $ref references
        if (typeof v === 'object' && v !== null && '$ref' in v && v.$ref) {
          const refKey = v.$ref.split('/').at(-1) ?? ''
          const refName = toIdentifierPascalCase(ensureSuffix(refKey, 'MediaTypeSchema'))
          const importPath = `./${uncapitalize(refKey)}.ts`
          const body = `import { ${refName} } from '${importPath}'\n\nexport const ${name} = ${refName}\n`
          return core(body, path.dirname(filePath), filePath)
        }

        // Generate Zod schema from Media.schema
        if (typeof v === 'object' && v !== null && 'schema' in v) {
          const zodCode = zodToOpenAPI(v.schema)
          const schemaCode = zodToOpenAPISchema(name, zodCode, true, false, true, readonly)
          const body = `${importCode}\n\n${schemaCode}\n`
          return core(body, path.dirname(filePath), filePath)
        }

        // Fallback for unknown structure
        const body = `${importCode}\n\nexport const ${name} = z.unknown()\n`
        return core(body, path.dirname(filePath), filePath)
      }),
      core(indexCode, path.dirname(path.join(outDir, 'index.ts')), path.join(outDir, 'index.ts')),
    ])

    const firstError = results.find((r) => !r.ok)
    if (firstError) return firstError

    return {
      ok: true,
      value: `Generated MediaType code written to ${outDir}/*.ts (index.ts included)`,
    }
  }

  // Single file mode
  const definitions = keys
    .map((key) => {
      const v = mediaTypes[key]
      const name = toIdentifierPascalCase(ensureSuffix(key, 'MediaTypeSchema'))

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
  const coreResult = await core(code, path.dirname(output), output)
  if (!coreResult.ok) return { ok: false, error: coreResult.error }
  return { ok: true, value: `Generated mediaTypes code written to ${output}` }
}
