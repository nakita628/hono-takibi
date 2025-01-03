import { escapeQuote } from '../../../core/text/escape-quote'
import { isUniqueContentSchema } from '../../../core/validator/is-unique-content-schema'
import type { Responses } from '../../../types'
import { generateDescription } from '../../openapi/description/generate-description'
import { generatePropertySchema } from '../../zod/generate-zod-property-schema'

/**
 * Generates a response schema for different status codes
 *
 * @function generateResponseSchema
 * @param responses - OpenAPI response definitions for different status codes
 * @returns Generated TypeScript code string for response validation
 *
 * @example
 * const responses = {
 *   '200': {
 *     description: 'Success response',
 *     content: {
 *       'application/json': {
 *         schema: {
 *           type: 'object',
 *           properties: {
 *             users: {
 *               type: 'array',
 *               items: { $ref: '#/components/schemas/User' }
 *             }
 *           }
 *         }
 *       }
 *     }
 *   },
 *   '404': {
 *     description: 'Not found',
 *     content: {
 *       'application/json': {
 *         schema: { $ref: '#/components/schemas/Error' }
 *       }
 *     }
 *   },
 *   '204': {
 *     description: 'No content'
 *   }
 * }
 *
 * const schema = generateResponseSchema(responses)
 * // Returns:
 * // 200:{description:'Success response',content:{'application/json':{schema:z.object({users:z.array(User)})}}},
 * // 404:{description:'Not found',content:{'application/json':{schema:Error}}},
 * // 204:{description:'No content',}
 *
 * @note
 * - Handles multiple response status codes
 * - Supports:
 *   - JSON response bodies
 *   - Schema references
 *   - Array responses
 *   - No-content responses
 *   - Inline schema definitions
 * - Generates Zod validation schemas for each response
 * - Preserves response descriptions
 * - Handles nested schema structures
 * - Automatically resolves schema references
 */
export function generateResponseSchema(responses: Responses): string {
  // 1. get response codes (200, 404, etc.)
  const responseCodes = Object.keys(responses)
  // 2. processing for each response code
  const responseEntries = responseCodes.map((code) => {
    const response = responses[code]
    // 2.1 generate description
    const description = generateDescription(response.description)
    // 2.2 no content (description only response)
    if (!response.content) return `${code}:${description}`
    // 2.3 processing application/json content types
    const jsonContent = response.content['application/json']
    if (!jsonContent) return `${code}:${description}`
    // 2.4 generate zod schema
    const schema = jsonContent.schema
    const zodSchema = generatePropertySchema(schema)
    // 2.5 generating a response definition

    // check duplication
    const contentTypes = Object.keys(response.content)

    const isUniqueSchema = isUniqueContentSchema(contentTypes, response.content)

    // all duplication same schema
    if (isUniqueSchema) {
      const contentParts: string[] = []
      for (const contentType of contentTypes) {
        contentParts.push(`'${contentType}':{schema:${zodSchema}}`)
      }
      return `${code}:{description:'${escapeQuote(response.description)}',content:{${contentParts.join(',')}},},`
    }
  })
  // 3.combine all response definitions
  return responseEntries.join('')
}
