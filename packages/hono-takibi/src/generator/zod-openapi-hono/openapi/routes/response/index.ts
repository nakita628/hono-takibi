import type { Components, Responses } from '../../../../../openapi/index.js'
import { escapeStringLiteral, isUniqueContentSchema, sanitizeIdentifier } from '../../../../../utils/index.js'
import { zodToOpenAPI } from '../../../../zod-to-openapi/index.js'

const toIdentifier = (raw: string): string => {
  const sanitized = sanitizeIdentifier(raw)
  return /^[A-Za-z_$]/.test(sanitized) ? sanitized : `_${sanitized}`
}

const responseConstName = (key: string): string =>
  toIdentifier(key.endsWith('Response') ? key : `${key}Response`)

/**
 * Generates a Zod-compatible response schema definition from OpenAPI responses.
 *
 * @param responses - OpenAPI response object keyed by HTTP status code.
 * @param components - Optional OpenAPI components for resolving references.
 * @returns A string of TypeScript code representing the response schema.
 */
export function response(
  responses: { [k: string]: Responses },
  components?: Components,
): string {
  const buildExamplesCode = (examples: NonNullable<Responses['content']>[string]['examples']): string => {
    if (!examples || Object.keys(examples).length === 0) return ''
    const entries = Object.entries(examples)
      .map(([key, example]) => {
        if ('$ref' in example && example.$ref) {
          return `${JSON.stringify(key)}:{$ref:${JSON.stringify(example.$ref)}}`
        }
        if ('value' in example) {
          const parts = []
          if (example.summary) parts.push(`summary:${JSON.stringify(example.summary)}`)
          if (example.value !== undefined) parts.push(`value:${JSON.stringify(example.value)}`)
          return `${JSON.stringify(key)}:{${parts.join(',')}}`
        }
        return `${JSON.stringify(key)}:${JSON.stringify(example)}`
      })
      .join(',')
    return `,examples:{${entries}}`
  }

  const buildContentCode = (content: NonNullable<Responses['content']>): string => {
    const contentTypes = Object.keys(content)
    if (!isUniqueContentSchema(contentTypes, content)) return ''

    const contentParts = contentTypes.map((contentType) => {
      const media = content[contentType]
      const zodSchema = zodToOpenAPI(media.schema)
      const examplesCode = buildExamplesCode(media.examples)
      return `'${contentType}':{schema:${zodSchema}${examplesCode}}`
    })
    return `content:{${contentParts.join(',')}}`
  }

  const buildResponseCode = (code: string, res: Responses): string => {
    // Handle $ref responses
    if (res.$ref) {
      if (res.$ref.startsWith('#/components/responses/')) {
        const key = res.$ref.split('/').pop()
        const resolved = key ? components?.responses?.[key] : undefined
        // Use component const name when the component exists
        if (key && resolved) {
          return `${code}:${responseConstName(key)},`
        }
      }
      return `${code}:{$ref:${JSON.stringify(res.$ref)}},`
    }

    const descriptionCode = `description:'${escapeStringLiteral(res.description ?? '')}'`

    if (!res.content) {
      return `${code}:{${descriptionCode},},`
    }

    const contentCode = buildContentCode(res.content)
    if (!contentCode) return `${code}:{${descriptionCode},},`

    return `${code}:{${descriptionCode},${contentCode}},`
  }

  return Object.entries(responses)
    .map(([code, res]) => buildResponseCode(code, res))
    .join('')
}
