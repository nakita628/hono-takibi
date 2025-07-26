import type { Content } from '../../../../../../openapi/index.js'
import { isUniqueContentSchema } from '../../../../../../validator/index.js'
import { coerce } from '../../../../../zod/utils/index.js'

/**
 * Generates a request body configuration string for a route.
 *
 * @param required - Indicates if the request body is required.
 * @param content - OpenAPI content object describing media types and schemas.
 * @param zodSchema - Zod schema string used for validation.
 * @returns A formatted request body definition string, or an empty string if unsupported.
 */
export function requestBody(required: boolean, content: Content, zodSchema: string): string {
  const contentTypes = Object.keys(content)
  if (contentTypes.length === 0) return ''

  // check duplication
  const isUniqueSchema = isUniqueContentSchema(contentTypes, content)

  // all duplication same schema
  if (isUniqueSchema) {
    const contentParts: string[] = []
    for (const contentType of contentTypes) {
      // z.date() → z.coerce.date()
      if (zodSchema.includes('z.date()')) {
        contentParts.push(`'${contentType}':{schema:${coerce(zodSchema)}}`)
      } else {
        contentParts.push(`'${contentType}':{schema:${zodSchema}}`)
      }
    }
    return `body:{required:${required},content:{${contentParts.join(',')}},},`
  }
  return ''
}
