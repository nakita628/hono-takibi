import type { Responses } from '../../../../../types'
import type { Config } from '../../../../../config'
import { escapeQuote } from '../../../../../core/text/escape-quote'
import { isUniqueContentSchema } from '../../../../../core/validator/is-unique-content-schema'
import { generatePropertySchema } from '../../../../zod/generate-zod-property-schema'

/**
 * Generates a response schema for different status codes
 *
 * @function generateResponseSchema
 * @param responses - OpenAPI response definitions for different status codes
 * @returns Generated TypeScript code string for response validation
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
export function generateResponseSchema(
  responses: Responses,
  // namingCase: 'camelCase' | 'PascalCase' = 'camelCase',
  config: Config,
): string {
  // 1. get response codes (200, 404, etc.)
  const responseCodes = Object.keys(responses)
  // 2. processing for each response code
  const responseEntries = responseCodes.map((code) => {
    const response = responses[code]
    // 2.1 no content (description only response)
    if (!response.content)
      return `${code}:{description:'${escapeQuote(response.description ?? '')}',},`
    // check duplication
    const contentTypes = Object.keys(response.content)
    const isUniqueSchema = isUniqueContentSchema(contentTypes, response.content)

    // all duplication same schema
    if (isUniqueSchema) {
      const contentParts: string[] = []
      for (const contentType of contentTypes) {
        const content = response.content[contentType]
        const zodSchema = generatePropertySchema(content.schema, config)
        contentParts.push(`'${contentType}':{schema:${zodSchema}}`)
      }
      return `${code}:{description:'${escapeQuote(response.description ?? '')}',content:{${contentParts.join(',')}},},`
    }
  })
  // 3.combine all response definitions
  return responseEntries.join('')
}
