import { isUniqueContentSchema } from '../../../../../../core/validator/index.js'
import type { Content } from '../../../../../../openapi/index.js'

/**
 * Generates a request body configuration for OpenAPI schema
 * @param { boolean } required - Whether the request body is required
 * @param { Content } content - Content of the request body
 * @param { string } zodSchema - Zod schema string for request body validation
 * @returns { string } Generated request body configuration string
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
      contentParts.push(`'${contentType}':{schema:${zodSchema}}`)
    }
    return `body:{required:${required},content:{${contentParts.join(',')}},},`
  }
  return ''
}
