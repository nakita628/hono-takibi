import type { Content } from '../../../../../../openapi/index.js'
import { isUniqueContentSchema } from '../../../../../../utils/index.js'

/**
 * Generates a request body configuration string for a route.
 *
 * @param required - Indicates if the request body is required.
 * @param content - OpenAPI content object describing media types and schemas.
 * @param schema - Zod schema string used for validation.
 * @param options - Additional request body config.
 * @returns A formatted request body definition string, or an empty string if unsupported.
 */
export function requestBody(
  required: boolean,
  content: Content,
  schema: string,
  options?: { description?: string },
): string {
  const isRecord = (value: unknown): value is Record<string, unknown> =>
    typeof value === 'object' && value !== null

  const isRef = (value: unknown): value is { $ref: string } =>
    isRecord(value) && typeof value.$ref === 'string'

  const contentTypes = Object.keys(content)
  if (contentTypes.length === 0) return ''

  const isUniqueSchema = isUniqueContentSchema(contentTypes, content)
  if (!isUniqueSchema) return ''

  const description = options?.description
  const descriptionPart = description ? `description:${JSON.stringify(description)},` : ''

  // if z.date() → z.coerce.date()
  const contentParts = contentTypes
    .map((contentType) => {
      const media = content[contentType]
      const examples = media.examples
      // const examplesString =
      //   examples && Object.keys(examples).length > 0
      //     ? `,examples:{${Object.entries(examples)
      //         .map(([exampleKey, example]) => {
      //           if (isRef(example)) {
      //             return `${JSON.stringify(exampleKey)}:{$ref:${JSON.stringify(example.$ref)}}`
      //           }
      //           const fields = [
      //             example?.summary !== undefined
      //               ? `summary:${JSON.stringify(example.summary)}`
      //               : undefined,
      //             example?.value !== undefined
      //               ? `value:${JSON.stringify(example.value)}`
      //               : undefined,
      //           ].filter((field) => field !== undefined)
      //           return `${JSON.stringify(exampleKey)}:{${fields.join(',')}}`
      //         })
      //         .join(',')}}`
      //     : ''

      const {
        required,
        nullable,
        additionalProperties,
        discriminator,
        const: unknown,
        $ref,
        ...rest
      } = media.schema

      const openapiSchema = rest ? JSON.stringify(rest) : undefined
      const openapiSchemaBody =
        openapiSchema && openapiSchema.startsWith('{') && openapiSchema.endsWith('}')
          ? openapiSchema.slice(1, -1)
          : openapiSchema
      const openapiProps = [
        meta?.parameters ? `param:${JSON.stringify(meta.parameters)}` : undefined,
        openapiSchemaBody && openapiSchemaBody.length > 0 ? openapiSchemaBody : undefined,
      ].filter((v) => v !== undefined)



      const schemaCode = schema.includes('z.date()')
        ? `z.coerce.${schema.replace('z.', '')}`
        : schema
      return `'${contentType}':{schema:${schemaCode}${examplesString}}`
    })
    .join(',')

  return `body:{${descriptionPart}required:${required},content:{${contentParts}}},`
}
