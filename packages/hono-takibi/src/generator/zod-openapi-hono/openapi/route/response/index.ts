import type { Responses } from '../../../../../openapi/index.js'
import { isUniqueContentSchema } from '../../../../../core/validator/index.js'
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
export function response(responses: Responses): string {
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

        const examples = content.examples
        const exampleString =
          examples && Object.keys(examples).length > 0
            ? `,examples:{${Object.entries(examples)
                .map(([key, example]) => {
                  const parts = []
                  if (example.summary) parts.push(`summary:${JSON.stringify(example.summary)}`)
                  if (example.value !== undefined)
                    parts.push(`value:${JSON.stringify(example.value)}`)
                  return `${JSON.stringify(key)}:{${parts.join(',')}}`
                })
                .join(',')}}`
            : ''

        contentParts.push(`'${contentType}':{schema:${zodSchema}${exampleString}}`)
      }
      return `${code}:{description:'${escapeStringLiteral(response.description ?? '')}',content:{${contentParts.join(',')}},},`
    }
  })
  // 3.combine all response definitions
  return responseEntries.join('')
}
