import type { Responses } from '../../../../../openapi/index.js'
import { isUniqueContentSchema } from '../../../../../core/validator/is-unique-content-schema.js'
import { propertySchema } from '../../../../zod/property/property-schema.js'
import { escapeStringLiteral } from '../../../../../core/utils/index.js'

/**
 * Generates a response schema for different status codes
 * @param { Responses } responses - OpenAPI response definitions for different status codes
 * @returns { string } Generated TypeScript code string for response validation
 *
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
    if (!response.content)
      return `${code}:{description:'${escapeStringLiteral(response.description ?? '')}',},`
    // check duplication
    const contentTypes = Object.keys(response.content)
    const isUniqueSchema = isUniqueContentSchema(contentTypes, response.content)

    // all duplication same schema
    if (isUniqueSchema) {
      const contentParts: string[] = []
      for (const contentType of contentTypes) {
        const content = response.content[contentType]
        const zodSchema = propertySchema(content.schema)
        contentParts.push(`'${contentType}':{schema:${zodSchema}}`)
      }
      return `${code}:{description:'${escapeStringLiteral(response.description ?? '')}',content:{${contentParts.join(',')}},},`
    }
  })
  // 3.combine all response definitions
  return responseEntries.join('')
}
