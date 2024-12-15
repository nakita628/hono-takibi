import { Responses } from '../../../types'
import { getRefName } from '../../../core/schema/references/get-ref-name'
import { generateZodArray } from '../../zod/generate-zod-array'
import { generateZodSchema } from '../../zod/generate-zod-schema'

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
    // 2.1 no content (description only response)
    if (!response.content) return `${code}:{description:'${response.description}',},`
    // 2.2 processing application/json content types
    const jsonContent = response.content['application/json']
    if (!jsonContent) return `${code}:{description:'${response.description}',},`
    // 2.3 generate zod schema
    const schema = jsonContent.schema
    const zodSchema = (() => {
      if (schema.$ref) return getRefName(schema.$ref) || 'z.any()'
      if (schema.type === 'array') {
        if (!schema.items) return 'z.array(z.any())'
        if (schema.items.$ref) {
          const refName = getRefName(schema.items.$ref)
          if (refName) return generateZodArray(refName)
        }
        return `z.array(${generateZodSchema(schema.items)})`
      }
      return generateZodSchema(schema)
    })()
    // 2.4 generating a response definition
    return `${code}:{description:'${response.description}',content:{'application/json':{schema:${zodSchema},},},},`
  })
  // 3.combine all response definitions
  return responseEntries.join('')
}
