import type { Content } from '../../../../../../openapi/index.js'
import { isUniqueContentSchema } from '../../../../../../utils/index.js'

/**
 * Generates a request body configuration string for a route.
 *
 * @param required - Indicates if the request body is required.
 * @param content - OpenAPI content object describing media types and schemas.
 * @param schema - Zod schema string used for validation.
 * @returns A formatted request body definition string, or an empty string if unsupported.
 */
export function requestBody(required: boolean, content: Content, schema: string): string {
  const contentTypes = Object.keys(content)
  if (contentTypes.length === 0) return ''

  const isUniqueSchema = isUniqueContentSchema(contentTypes, content)
  if (!isUniqueSchema) return ''

  // if z.date() → z.coerce.date()
  const contentParts = contentTypes
    .map(
      (contentType) =>
        `'${contentType}':{schema:${
          schema.includes('z.date()') ? `z.coerce.${schema.replace('z.', '')}` : schema
        }}`,
    )
    .join(',')

  return `body:{required:${required},content:{${contentParts}}},`
}
