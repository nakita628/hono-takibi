import { isMedia, isRefObject } from '../../../../guard/index.js'
import { makeRef } from '../../../../helper/openapi.js'
import type { Components } from '../../../../openapi/index.js'
import {
  ensureSuffix,
  toIdentifierPascalCase,
  zodToOpenAPISchema,
} from '../../../../utils/index.js'
import { zodToOpenAPI } from '../../../zod-to-openapi/index.js'

/**
 * Generates TypeScript code for OpenAPI component mediaTypes.
 *
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
  readonly?: boolean,
) {
  const { mediaTypes } = components
  if (!mediaTypes) return ''
  const entries = Object.entries(mediaTypes)
  if (entries.length === 0) return ''
  // Same shapes as the split generator (core/components/mediaTypes.ts): an alias names its
  // target's constant and an entry without a body `schema` is `z.unknown()`, so every
  // `#/components/mediaTypes/*` reference has a constant to bind.
  return entries
    .map(([k, v]) => {
      const name = toIdentifierPascalCase(ensureSuffix(k, 'MediaTypeSchema'))
      const zodCode = isRefObject(v)
        ? makeRef(v.$ref)
        : isMedia(v)
          ? zodToOpenAPI(v.schema)
          : 'z.unknown()'
      return zodToOpenAPISchema(
        name,
        zodCode,
        exportMediaTypes,
        exportMediaTypesTypes,
        true,
        readonly,
      )
    })
    .join('\n\n')
}
