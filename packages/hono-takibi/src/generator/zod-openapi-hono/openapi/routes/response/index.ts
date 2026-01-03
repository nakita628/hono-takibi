import { makeContent, makeExamples } from '../../../../../helper/openapi.js'
import type { Responses } from '../../../../../openapi/index.js'
import {
  ensureSuffix,
  escapeStringLiteral,
  isUniqueContentSchema,
  toIdentifierPascalCase,
} from '../../../../../utils/index.js'
import { zodToOpenAPI } from '../../../../zod-to-openapi/index.js'

/**
 * Generates a Zod-compatible response schema definition from OpenAPI responses.
 *
 * @param responses - OpenAPI response object keyed by HTTP status code.
 * @returns A string of TypeScript code representing the response schema.
 */
export function response(responses: { [k: string]: Responses }): string {
  const buildContentCode = (content: NonNullable<Responses['content']>): string => {
    const contentTypes = Object.keys(content)
    if (!isUniqueContentSchema(contentTypes, content)) return ''

    const contentParts = contentTypes.map((contentType) => {
      const media = content[contentType]
      const zodSchema = zodToOpenAPI(media.schema)
      const examples = media.examples ? makeExamples(media.examples) : undefined
      const examplesCode = examples ? `,examples:${examples}` : ''
      return `'${contentType}':{schema:${zodSchema}${examplesCode}}`
    })
    return `content:{${contentParts.join(',')}}`
  }

  const buildResponseCode = (code: string, res: Responses): string => {
    // Only quote status codes that start with a digit but are not purely numeric (e.g., "2XX")
    // Purely numeric codes (e.g., "200") should not be quoted
    const quotedCode = /^\d+$/.test(code) ? code : /^\d/.test(code) ? `'${code}'` : code

    // Handle $ref responses
    if (res.$ref) {
      if (res.$ref.startsWith('#/components/responses/')) {
        const key = res.$ref.split('/').pop()
        if (key) {
          return `${quotedCode}:${toIdentifierPascalCase(ensureSuffix(key, 'Response'))},`
        }
      }
      return `${quotedCode}:{$ref:${JSON.stringify(res.$ref)}},`
    }

    const descriptionCode = `description:'${escapeStringLiteral(res.description ?? '')}'`

    const props = [
      res.summary ? `summary:${JSON.stringify(res.summary)}` : undefined,
      res.description ? `description:${JSON.stringify(res.description)}` : undefined,
      res.content ? `content:{${makeContent(res.content)}}` : undefined,
    ].filter((v) => v !== undefined).join(',')

    if (!res.content) {
      return `${quotedCode}:{${descriptionCode},},`
    }

    const contentCode = buildContentCode(res.content)
    if (!contentCode) return `${quotedCode}:{${descriptionCode},},`

    return `${quotedCode}:{${descriptionCode},${contentCode}},`
  }

  return Object.entries(responses)
    .map(([code, res]) => buildResponseCode(code, res))
    .join('')
}
