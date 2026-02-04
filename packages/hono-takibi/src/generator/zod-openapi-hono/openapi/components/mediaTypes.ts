import type { Components, Media, Reference } from '../../../../openapi/index.js'
import {
  ensureSuffix,
  toIdentifierPascalCase,
  zodToOpenAPISchema,
} from '../../../../utils/index.js'
import { zodToOpenAPI } from '../../../zod-to-openapi/index.js'

function isMedia(value: Media | Reference): value is Media {
  return typeof value === 'object' && value !== null && 'schema' in value
}

/**
 * Generates TypeScript code for OpenAPI component mediaTypes.
 *
 * @param components - The OpenAPI components object.
 * @param exportMediaTypes - Whether to export the mediaType constants.
 * @param exportMediaTypesTypes - Whether to export the inferred Zod types.
 * @param readonly - Whether to add `.readonly()` modifier to schemas.
 * @returns A string of TypeScript code with mediaType definitions.
 *
 * @example
 * ```ts
 * // Input
 * { JsonMedia: { schema: { type: 'object', properties: { id: { type: 'integer' } } } } }
 *
 * // Output
 * export const JsonMediaSchema = z.object({ id: z.number().int() })
 * export type JsonMedia = z.infer<typeof JsonMediaSchema>
 * ```
 */
export function mediaTypesCode(
  components: Components,
  exportMediaTypes: boolean,
  exportMediaTypesTypes: boolean,
  readonly?: boolean | undefined,
): string {
  const { mediaTypes } = components
  if (!mediaTypes) return ''

  const entries = Object.entries(mediaTypes)
  if (entries.length === 0) return ''

  return entries
    .map(([k, v]) => {
      if (!isMedia(v)) return undefined
      const name = toIdentifierPascalCase(ensureSuffix(k, 'Schema'))
      const zodCode = zodToOpenAPI(v.schema)
      return zodToOpenAPISchema(
        name,
        zodCode,
        exportMediaTypes,
        exportMediaTypesTypes,
        true,
        readonly,
      )
    })
    .filter((v) => v !== undefined)
    .join('\n\n')
}
