import { makeContent } from '../../../../../../helper/components.js'
import type { RequestBody } from '../../../../../../openapi/index.js'

/**
 * Generates a request body configuration string for a route.
 *
 * @param required - Indicates if the request body is required.
 * @param content - OpenAPI content object describing media types and schemas.
 * @param schema - Zod schema string used for validation.
 * @param options - Additional request body config.
 * @returns A formatted request body definition string, or an empty string if unsupported.
 */
// export function requestBody(
//   required: boolean,
//   content: Content,
//   schema: string,
//   options?: { description?: string },
// ): string {
//   const contentTypes = Object.keys(content)
//   if (contentTypes.length === 0) return ''

//   const isUniqueSchema = isUniqueContentSchema(contentTypes, content)
//   if (!isUniqueSchema) return ''

//   const description = options?.description
//   const descriptionPart = description ? `description:${JSON.stringify(description)},` : ''

//   const contentParts = contentTypes
//     .map((contentType) => {
//       const media = content[contentType]
//       const examples = media.examples
//       const examplesString =
//         examples && Object.keys(examples).length > 0
//           ? `,examples:{${Object.entries(examples)
//             .map(([exampleKey, example]) => {
//               if ('$ref' in example && example.$ref) {
//                 return `${JSON.stringify(exampleKey)}:{$ref:${JSON.stringify(example.$ref)}}`
//               }
//               if ('value' in example) {
//                 const fields = [
//                   example.summary !== undefined
//                     ? `summary:${JSON.stringify(example.summary)}`
//                     : undefined,
//                   example.description !== undefined
//                     ? `description:${JSON.stringify(example.description)}`
//                     : undefined,
//                   example.value !== undefined ? `value:${JSON.stringify(example.value)}` : undefined,
//                 ].filter((field) => field !== undefined)
//                 return `${JSON.stringify(exampleKey)}:{${fields.join(',')}}`
//               }
//               return `${JSON.stringify(exampleKey)}:${JSON.stringify(example)}`
//             })
//             .join(',')}}`
//           : ''

//       // if z.date() → z.coerce.date()
//       const schemaCode = schema.includes('z.date()')
//         ? `z.coerce.${schema.replace('z.', '')}`
//         : schema
//       return `'${contentType}':{schema:${schemaCode}${examplesString}}`
//     })
//     .join(',')

//   return `body:{${descriptionPart}required:${required},content:{${contentParts}}},`
// }


export function requestBody(
  body: RequestBody
) {
  const props = [
    body.description ? `description:${JSON.stringify(body.description)}` : undefined,
    body.content && body.content !== undefined ? `content:{${makeContent(body.content)}}` : undefined,
    body.required ? `required:${body.required}` : undefined,
  ].filter((v) => v !== undefined).join(',')
  return `body:{${props}}`
}