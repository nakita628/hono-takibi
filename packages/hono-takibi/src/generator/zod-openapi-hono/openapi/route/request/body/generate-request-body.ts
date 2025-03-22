import { isUniqueContentSchema } from '../../../../../../core/validator/is-unique-content-schema'
import type { Content } from '../../../../../../type'

/**
 * @function generateRequestBody
 * @description Generates a request body configuration for OpenAPI schema
 * @param required - Whether the request body is required
 * @param content - Content of the request body
 * @param zodSchema - Zod schema string for request body validation
 * @returns string - Generated request body configuration string
 */
export function generateRequestBody(
  required: boolean,
  content: Content,
  zodSchema: string,
): string {
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
