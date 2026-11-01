import { isHeader } from '../../../../guard/index.js'
import { makeHeaderSchema, makeRef } from '../../../../helper/index.js'
import type { Components } from '../../../../openapi/index.js'
import {
  ensureSuffix,
  toIdentifierPascalCase,
  zodToOpenAPISchema,
} from '../../../../utils/index.js'

/**
 * Generates TypeScript code for OpenAPI component headers.
 *
 * Handles both inline header definitions and $ref references,
 * converting them to Zod schema constants.
 *
 *
 * @example
 * ```ts
 * headersCode(components, true, true)
 * // → 'export const XRateLimitHeaderSchema = z.number()\n\nexport type XRateLimitHeader = z.infer<typeof XRateLimitHeaderSchema>'
 * ```
 */
export function headersCode(
  components: Components,
  exportHeaders: boolean,
  exportHeadersTypes: boolean,
  readonly?: boolean,
) {
  const { headers } = components
  if (!headers) return ''
  return Object.entries(headers)
    .map(([k, header]) => {
      const schemaName = toIdentifierPascalCase(ensureSuffix(k, 'HeaderSchema'))
      // `readonly` reaches the schema of the header, where it is put on the objects and
      // arrays alone: a scalar is not wrapped, and a reference names a constant that has it
      // already.
      if ('$ref' in header) {
        const refName = makeRef(header.$ref)
        return zodToOpenAPISchema(schemaName, refName, exportHeaders, exportHeadersTypes, true)
      }
      if (isHeader(header)) {
        // A header's constant is the Zod schema of its value, whether the header declares it
        // as `schema` or under the one media type of `content` (#410): it is a member of the
        // `z.object()` a response's `headers` is.
        const schema = makeHeaderSchema(header, readonly)
        return zodToOpenAPISchema(schemaName, schema, exportHeaders, exportHeadersTypes, true)
      }
      return ''
    })
    .filter(Boolean)
    .join('\n\n')
}
