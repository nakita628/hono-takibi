import type { Responses } from '../../../../../types'
import type { Config } from '../../../../../config'
import { escapeStr } from '../../../../../core/text/escape-str'
import { isUniqueContentSchema } from '../../../../../core/validator/is-unique-content-schema'
import { generatePropertySchema } from '../../../../zod/property/generate-zod-property-schema'

/**
 * Generates a response schema for different status codes
 * @param { Responses } responses - OpenAPI response definitions for different status codes
 * @param { Config } config - Config
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
export function generateResponseSchema(responses: Responses, config: Config): string {
  // 1. get response codes (200, 404, etc.)
  const responseCodes = Object.keys(responses)
  // 2. processing for each response code
  const responseEntries = responseCodes.map((code) => {
    const response = responses[code]
    // 2.1 no content (description only response)
    if (!response.content)
      return `${code}:{description:'${escapeStr(response.description ?? '')}',},`
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
      return `${code}:{description:'${escapeStr(response.description ?? '')}',content:{${contentParts.join(',')}},},`
    }
  })
  // 3.combine all response definitions
  return responseEntries.join('')
}
