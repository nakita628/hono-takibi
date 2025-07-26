import { escapeStringLiteral } from '../../../../../utils/index.js'
import type { Responses } from '../../../../../openapi/index.js'
import { isUniqueContentSchema } from '../../../../../validator/index.js'
import { propertySchema } from '../../../../zod/helper/property-schema.js'

/**
 * Generates a Zod-compatible response schema definition from OpenAPI responses.
 *
 * @param responses - OpenAPI response object keyed by HTTP status code.
 * @returns A string of TypeScript code representing the response schema.
 *
 * @remarks
 * - Supports JSON content with `schema`, `examples`, and `description`.
 * - Skips responses without `content` (e.g., 204 No Content).
 * - Deduplicates content types if all share the same schema.
 * - Escapes all descriptions safely for inline code.
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
