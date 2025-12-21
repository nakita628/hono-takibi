import type { Components, Responses, Schemas } from '../../../../../openapi/index.js'
import {
  ensureSuffix,
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
  const isSchema = (v: unknown): v is Schemas => isRecord(v)

  const toIdentifier = (raw: string): string => {
    const sanitized = sanitizeIdentifier(raw)
    return /^[A-Za-z_$]/.test(sanitized) ? sanitized : `_${sanitized}`
  }
  const responseConstName = (key: string): string => {
    const base = key.endsWith('Response') ? key : `${key}Response`
    return toIdentifier(base)
  }

  const headerConstName = (key: string): string => {
    const base = key.endsWith('HeaderSchema')
      ? key
      : key.endsWith('Header')
        ? `${key}Schema`
        : `${key}HeaderSchema`
    return toIdentifier(base)
  }

  const linkConstName = (key: string): string => toIdentifier(ensureSuffix(key, 'Link'))

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
        const headersString = (() => {
          const raw = responseValue.headers
          if (!(raw && isRecord(raw))) return ''

          const headerSchemaExpr = (header: unknown): string => {
            if (!isRecord(header)) return 'z.any()'
            const rawSchema = header.schema
            const schema = isSchema(rawSchema) ? rawSchema : {}
            const description =
              typeof header.description === 'string' ? header.description : undefined
            const example = 'example' in header ? header.example : undefined
            const merged: Schemas = {
              ...schema,
              ...(description !== undefined && schema.description === undefined
                ? { description }
                : {}),
              ...(example !== undefined && schema.example === undefined ? { example } : {}),
            }
            return zodToOpenAPI(merged)
          }


          const entries = Object.entries(raw).map(([name, header]) => {
            if (isRef(header) && header.$ref.startsWith('#/components/headers/')) {
              const key = header.$ref.split('/').pop()
              const resolved = resolveRef(header.$ref, '#/components/headers/', components?.headers)
              if (key && resolved && options?.useComponentRefs) {
                const base = headerConstName(key)
                return `${JSON.stringify(name)}:${base}`
              }
              const base = headerSchemaExpr(resolved ?? header)
              return `${JSON.stringify(name)}:${base}`
            }
            const base = headerSchemaExpr(header)
            return `${JSON.stringify(name)}:${base}`
          })

          return entries.length > 0 ? `headers:z.object({${entries.join(',')}}),` : ''
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
                    if (isRef(example)) {
                      if (example.$ref.startsWith('#/components/examples/')) {
                        const key = example.$ref.split('/').pop()
                        const resolved = resolveRef(
                          example.$ref,
                          '#/components/examples/',
                          components?.examples,
                        )
                        if (key && resolved && options?.useComponentRefs) {
                          return `${JSON.stringify(exampleKey)}:${toIdentifier(ensureSuffix(key, 'Example'))}`
                        }
                      }
                      return `${JSON.stringify(exampleKey)}:{$ref:${JSON.stringify(example.$ref)}}`
                    }

                    const fields = [
                      example.summary !== undefined
                        ? `summary:${JSON.stringify(example.summary)}`
                        : undefined,
                      example.value !== undefined
                        ? `value:${JSON.stringify(example.value)}`
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

      const headersString = (() => {
        const raw = responseValue.headers
        if (!(raw && isRecord(raw))) return ''

        const headerSchemaExpr = (header: unknown): string => {
          if (!isRecord(header)) return 'z.any()'
          const rawSchema = header.schema
          const schema = isSchema(rawSchema) ? rawSchema : {}
          const description =
            typeof header.description === 'string' ? header.description : undefined
          const example = 'example' in header ? header.example : undefined
          const merged: Schemas = {
            ...schema,
            ...(description !== undefined && schema.description === undefined
              ? { description }
              : {}),
            ...(example !== undefined && schema.example === undefined ? { example } : {}),
          }
          return zodToOpenAPI(merged)
        }

        const entries = Object.entries(raw).map(([name, header]) => {
          if (isRef(header) && header.$ref.startsWith('#/components/headers/')) {
            const key = header.$ref.split('/').pop()
            const resolved = resolveRef(header.$ref, '#/components/headers/', components?.headers)
            if (key && resolved && options?.useComponentRefs) {
              const base = headerConstName(key)
              return `${JSON.stringify(name)}:${base}`
            }
            const base = headerSchemaExpr(resolved ?? header)
            return `${JSON.stringify(name)}:${base}`
          }
          const base = headerSchemaExpr(header)
          return `${JSON.stringify(name)}:${base}`
        })

        return entries.length > 0 ? `headers:z.object({${entries.join(',')}}),` : ''
      })()

      const linksString = (() => {
        const raw = responseValue.links
        if (!(raw && isRecord(raw))) return ''

        if (!options?.useComponentRefs) {
          const out: Record<string, unknown> = {}
          for (const [name, link] of Object.entries(raw)) {
            if (isRef(link)) {
              const resolved = resolveRef(link.$ref, '#/components/links/', components?.links)
              out[name] = resolved ?? link
              continue
            }
            out[name] = link
          }
          return Object.keys(out).length > 0 ? `links:${JSON.stringify(out)},` : ''
        }

        const entries = Object.entries(raw).map(([name, link]) => {
          if (isRef(link)) {
            const resolved = resolveRef(link.$ref, '#/components/links/', components?.links)
            const key = resolved ? link.$ref.split('/').pop() : undefined
            if (key && resolved) return `${JSON.stringify(name)}:${linkConstName(key)}`
            return `${JSON.stringify(name)}:{$ref:${JSON.stringify(link.$ref)}}`
          }
          return `${JSON.stringify(name)}:${JSON.stringify(link)}`
        })

        return entries.length > 0 ? `links:{${entries.join(',')}},` : ''
      })()

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
                  if (isRef(example)) {
                    if (example.$ref.startsWith('#/components/examples/')) {
                      const key = example.$ref.split('/').pop()
                      const resolved = resolveRef(
                        example.$ref,
                        '#/components/examples/',
                        components?.examples,
                      )
                      if (key && resolved && options?.useComponentRefs) {
                        return `${JSON.stringify(exampleKey)}:${toIdentifier(ensureSuffix(key, 'Example'))}`
                      }
                    }
                    return `${JSON.stringify(exampleKey)}:{$ref:${JSON.stringify(example.$ref)}}`
                  }

                  const fields = [
                    example.summary !== undefined
                      ? `summary:${JSON.stringify(example.summary)}`
                      : undefined,
                    example.value !== undefined
                      ? `value:${JSON.stringify(example.value)}`
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
