import type { Responses } from '../../../../../openapi/index.js'
import { escapeStringLiteral, isUniqueContentSchema } from '../../../../../utils/index.js'
import { zodToOpenAPI } from '../../../../zod-to-openapi/index.js'

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
// export function response(responses: Responses): string {
//   // 1. get response codes (200, 404, etc.)
//   const responseCodes = Object.keys(responses)
//   // 2. processing for each response code
//   const responseEntries = responseCodes.map((code) => {
//     const response = responses[code]
//     // 2.1 no content (description only response)
//     if (!response.content)
//       return `${code}:{description:'${escapeStringLiteral(response.description ?? '')}',},`
//     // check duplication
//     const contentTypes = Object.keys(response.content)
//     const isUniqueSchema = isUniqueContentSchema(contentTypes, response.content)
//     // all duplication same schema
//     if (isUniqueSchema) {
//       const contentParts: string[] = []
//       for (const contentType of contentTypes) {
//         const content = response.content[contentType]
//         const z = zodToOpenAPI(content.schema)

//         const examples = content.examples
//         const exampleString =
//           examples && Object.keys(examples).length > 0
//             ? `,examples:{${Object.entries(examples)
//                 .map(([key, example]) => {
//                   const parts = []
//                   if (example.summary) parts.push(`summary:${JSON.stringify(example.summary)}`)
//                   if (example.value !== undefined)
//                     parts.push(`value:${JSON.stringify(example.value)}`)
//                   return `${JSON.stringify(key)}:{${parts.join(',')}}`
//                 })
//                 .join(',')}}`
//             : ''
//         contentParts.push(`'${contentType}':{schema:${z}${exampleString}}`)
//       }
//       return `${code}:{description:'${escapeStringLiteral(response.description ?? '')}',content:{${contentParts.join(',')}}},`
//     }
//   })
//   // 3.combine all response definitions
//   return responseEntries.join('')
// }

export function response(responses: Responses): string {
  // 1. get response codes (200, 404, etc.)
  const responseEntries = Object.keys(responses).map((code) => {
    const res = responses[code]
    const content = res.content
    if (!content) {
      return `${code}:{description:'${escapeStringLiteral(res.description ?? '')}',},`
    }
    const contentTypes = Object.keys(content)
    const isUnique = isUniqueContentSchema(contentTypes, content)

    const sharedZ = isUnique ? zodToOpenAPI(content[contentTypes[0]].schema) : undefined

    const contentParts = contentTypes.map((ct) => {
      const media = content[ct]
      const z = sharedZ ?? zodToOpenAPI(media.schema)

      const examples = media.examples
      const exampleString =
        examples && Object.keys(examples).length > 0
          ? `,examples:{${Object.entries(examples)
              .map(([k, v]) => {
                const parts: string[] = []
                if (v.summary) parts.push(`summary:${JSON.stringify(v.summary)}`)
                if (v.value !== undefined) parts.push(`value:${JSON.stringify(v.value)}`)
                return `${JSON.stringify(k)}:{${parts.join(',')}}`
              })
              .join(',')}}`
          : ''
      return `'${ct}':{schema:${z}${exampleString}}`
    })
    return `${code}:{description:'${escapeStringLiteral(res.description ?? '')}',content:{${contentParts.join(',')}}},`
  })
  return responseEntries.join('')
}
