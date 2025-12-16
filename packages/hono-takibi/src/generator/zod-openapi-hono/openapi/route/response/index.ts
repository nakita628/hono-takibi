import type { Components, Responses } from '../../../../../openapi/index.js'
import {
  escapeStringLiteral,
  isUniqueContentSchema,
  sanitizeIdentifier,
} from '../../../../../utils/index.js'
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
export function response(
  responses: Responses,
  components?: Components,
  options?: { readonly useComponentRefs?: boolean },
): string {
  const isRecord = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null
  const isRef = (v: unknown): v is { $ref: string } => isRecord(v) && typeof v.$ref === 'string'

  const toIdentifier = (raw: string): string => {
    const sanitized = sanitizeIdentifier(raw)
    return /^[A-Za-z_$]/.test(sanitized) ? sanitized : `_${sanitized}`
  }
  const responseConstName = (key: string): string => {
    const base = key.endsWith('Response') ? key : `${key}Response`
    return toIdentifier(base)
  }

  const resolveRef = <T>(
    $ref: string,
    prefix: string,
    map: Record<string, T> | undefined,
  ): T | undefined => {
    if (!map) return undefined
    if (!$ref.startsWith(prefix)) return undefined
    const key = $ref.split('/').pop()
    if (!key) return undefined
    return map[key]
  }

  // 1. get response codes (200, 404, etc.)
  return Object.keys(responses)
    .map((code) => {
      const res = responses[code]

      if (typeof res.$ref === 'string') {
        const resolvedResponse = components?.responses
          ? resolveRef(res.$ref, '#/components/responses/', components.responses)
          : undefined

        const key = res.$ref.startsWith('#/components/responses/')
          ? res.$ref.split('/').pop()
          : undefined

        if (key && resolvedResponse && options?.useComponentRefs) {
          return `${code}:${responseConstName(key)},`
        }

        if (!resolvedResponse) {
          return `${code}:{$ref:${JSON.stringify(res.$ref)}},`
        }

        const responseValue = resolvedResponse
        const headers = (() => {
          const raw = responseValue.headers
          if (!(raw && isRecord(raw))) return undefined
          const out: Record<string, unknown> = {}
          for (const [name, header] of Object.entries(raw)) {
            if (isRef(header)) {
              const resolved = resolveRef(header.$ref, '#/components/headers/', components?.headers)
              out[name] = resolved ?? header
              continue
            }
            out[name] = header
          }
          return Object.keys(out).length > 0 ? out : undefined
        })()

        const links = (() => {
          const raw = responseValue.links
          if (!(raw && isRecord(raw))) return undefined
          const out: Record<string, unknown> = {}
          for (const [name, link] of Object.entries(raw)) {
            if (isRef(link)) {
              const resolved = resolveRef(link.$ref, '#/components/links/', components?.links)
              out[name] = resolved ?? link
              continue
            }
            out[name] = link
          }
          return Object.keys(out).length > 0 ? out : undefined
        })()

        const headersString = headers ? `headers:${JSON.stringify(headers)},` : ''
        const linksString = links ? `links:${JSON.stringify(links)},` : ''

        const content = responseValue.content
        if (!content) {
          return `${code}:{description:'${escapeStringLiteral(responseValue.description ?? '')}',${headersString}${linksString}},`
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
                  .map(([exampleKey, example]) => {
                    const resolvedExample =
                      isRef(example) && example.$ref.startsWith('#/components/examples/')
                        ? (resolveRef(
                            example.$ref,
                            '#/components/examples/',
                            components?.examples,
                          ) ?? example)
                        : example

                    if (isRef(resolvedExample)) {
                      return `${JSON.stringify(exampleKey)}:{$ref:${JSON.stringify(resolvedExample.$ref)}}`
                    }

                    const fields = [
                      resolvedExample.summary !== undefined
                        ? `summary:${JSON.stringify(resolvedExample.summary)}`
                        : undefined,
                      resolvedExample.value !== undefined
                        ? `value:${JSON.stringify(resolvedExample.value)}`
                        : undefined,
                    ].filter((field) => field !== undefined)

                    return `${JSON.stringify(exampleKey)}:{${fields.join(',')}}`
                  })
                  .join(',')}}`
              : ''

          return `'${ct}':{schema:${z}${exampleString}}`
        })
        return `${code}:{description:'${escapeStringLiteral(responseValue.description ?? '')}',${headersString}${linksString}content:{${contentParts.join(',')}}},`
      }

      const responseValue = res

      const headers = (() => {
        const raw = responseValue.headers
        if (!(raw && isRecord(raw))) return undefined
        const out: Record<string, unknown> = {}
        for (const [name, header] of Object.entries(raw)) {
          if (isRef(header)) {
            const resolved = resolveRef(header.$ref, '#/components/headers/', components?.headers)
            out[name] = resolved ?? header
            continue
          }
          out[name] = header
        }
        return Object.keys(out).length > 0 ? out : undefined
      })()

      const links = (() => {
        const raw = responseValue.links
        if (!(raw && isRecord(raw))) return undefined
        const out: Record<string, unknown> = {}
        for (const [name, link] of Object.entries(raw)) {
          if (isRef(link)) {
            const resolved = resolveRef(link.$ref, '#/components/links/', components?.links)
            out[name] = resolved ?? link
            continue
          }
          out[name] = link
        }
        return Object.keys(out).length > 0 ? out : undefined
      })()

      const headersString = headers ? `headers:${JSON.stringify(headers)},` : ''
      const linksString = links ? `links:${JSON.stringify(links)},` : ''

      const content = responseValue.content
      if (!content) {
        return `${code}:{description:'${escapeStringLiteral(responseValue.description ?? '')}',${headersString}${linksString}},`
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
                .map(([exampleKey, example]) => {
                  const resolvedExample =
                    isRef(example) && example.$ref.startsWith('#/components/examples/')
                      ? (resolveRef(example.$ref, '#/components/examples/', components?.examples) ??
                        example)
                      : example

                  if (isRef(resolvedExample)) {
                    return `${JSON.stringify(exampleKey)}:{$ref:${JSON.stringify(resolvedExample.$ref)}}`
                  }

                  const fields = [
                    resolvedExample.summary !== undefined
                      ? `summary:${JSON.stringify(resolvedExample.summary)}`
                      : undefined,
                    resolvedExample.value !== undefined
                      ? `value:${JSON.stringify(resolvedExample.value)}`
                      : undefined,
                  ].filter((field) => field !== undefined)

                  return `${JSON.stringify(exampleKey)}:{${fields.join(',')}}`
                })
                .join(',')}}`
            : ''

        return `'${ct}':{schema:${z}${exampleString}}`
      })
      return `${code}:{description:'${escapeStringLiteral(responseValue.description ?? '')}',${headersString}${linksString}content:{${contentParts.join(',')}}},`
    })
    .join('')
}
