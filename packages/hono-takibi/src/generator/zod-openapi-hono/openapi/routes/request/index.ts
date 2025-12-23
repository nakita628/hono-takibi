import type { Components, Content, Parameter, RequestBody, Schema } from '../../../../../openapi/index.js'
import { requestParamsArray, sanitizeIdentifier } from '../../../../../utils/index.js'
import { zodToOpenAPI } from '../../../../zod-to-openapi/index.js'
import { requestBody } from '../request/body/index.js'
import { params } from '../params/index.js'

/**
 * Generates a `request:{ ... }` string for Hono route validation from OpenAPI parameters and request body.
 *
 * @param parameters - OpenAPI `parameters` array (query, path, header).
 * @param body - OpenAPI `requestBody` object.
 * @returns A formatted `request:{ ... }` string or empty string if neither is defined.
 *
 * @remarks
 * - Combines parameters and request body into a single object.
 * - Deduplicates schemas if multiple content types share the same body schema.
 * - Uses `params` instead of `path` for Hono compatibility.
 */
export function request(
  parameters: readonly Parameter[] | undefined,
  body: RequestBody | undefined,
  components?: Components,
  options?: { readonly useComponentRefs?: boolean },
): string {
  const isRecord = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null
  const isRef = (v: unknown): v is { $ref: string } => isRecord(v) && typeof v.$ref === 'string'
  const isSchema = (v: unknown): v is Schema => isRecord(v)
  const isMedia = (v: unknown): v is Content[string] => isRecord(v) && isSchema(v.schema)
  const isExampleValue = (
    v: unknown,
  ): v is NonNullable<Content[string]['examples']>[string] => {
    if (!isRecord(v)) return false
    if (isRef(v)) return true
    const summaryOk = v.summary === undefined || typeof v.summary === 'string'
    const descriptionOk = v.description === undefined || typeof v.description === 'string'
    const externalValueOk = v.externalValue === undefined || typeof v.externalValue === 'string'
    return summaryOk && descriptionOk && externalValueOk
  }

  const toIdentifier = (raw: string): string => {
    const sanitized = sanitizeIdentifier(raw)
    return /^[A-Za-z_$]/.test(sanitized) ? sanitized : `_${sanitized}`
  }
  const requestBodyConstName = (key: string): string => {
    const base = key.endsWith('Body')
      ? `${key.slice(0, -'Body'.length)}RequestBody`
      : `${key}RequestBody`
    return toIdentifier(base)
  }

  const resolvedBodyRef = (() => {
    if (!(body && isRef(body))) return undefined
    if (!body.$ref.startsWith('#/components/requestBodies/')) return undefined
    const key = body.$ref.split('/').pop()
    if (!key) return undefined
    const resolved = components?.requestBodies?.[key]
    if (!resolved) return undefined
    return { key, constName: requestBodyConstName(key) }
  })()

  const resolvedBody: RequestBody | undefined = (() => {
    if (!body) return undefined
    if (!isRef(body)) return body
    if (!body.$ref.startsWith('#/components/requestBodies/')) return body
    const key = body.$ref.split('/').pop()
    const resolved = key ? components?.requestBodies?.[key] : undefined
    return resolved ?? body
  })()

  // Early return if no parameters or content
  if (!(parameters || resolvedBodyRef || resolvedBody?.content)) return ''

  const requestParams = parameters
    ? (() => {
        const paramsObj = params(parameters)
        const requestParamsArr = requestParamsArray(paramsObj)
        return requestParamsArr.length ? `request:{${requestParamsArr.join(',')}},` : ''
      })()
    : ''

  if (resolvedBodyRef && options?.useComponentRefs) {
    const requestBodyCode = `body:${resolvedBodyRef.constName},`
    if (requestParams) return requestParams.replace('request:{', `request:{${requestBodyCode}`)
    return `request:{${requestBodyCode}},`
  }

  if (resolvedBody?.content) {
    const contentEntries = Object.entries(resolvedBody.content).filter(
      (entry): entry is [string, Content[string]] => isMedia(entry[1]),
    )
    if (contentEntries.length === 0) return requestParams

    const contentWithResolvedExamples: Record<string, Content[string]> = {}
    for (const [contentType, media] of contentEntries) {
      if (!components?.examples) {
        contentWithResolvedExamples[contentType] = media
        continue
      }

      const examples = media.examples
      if (!examples || Object.keys(examples).length === 0) {
        contentWithResolvedExamples[contentType] = media
        continue
      }

      const resolvedExamples: Record<string, NonNullable<Content[string]['examples']>[string]> = {}
      for (const [exampleKey, example] of Object.entries(examples)) {
        if (isRef(example) && example.$ref.startsWith('#/components/examples/')) {
          const name = example.$ref.split('/').pop()
          const resolved = name ? components.examples?.[name] : undefined
          if (isExampleValue(resolved)) {
            resolvedExamples[exampleKey] = resolved
            continue
          }
        }
        if (isExampleValue(example)) {
          resolvedExamples[exampleKey] = example
        }
      }

      contentWithResolvedExamples[contentType] = { ...media, examples: resolvedExamples }
    }

    // Eliminate schema duplication
    const uniqueSchemas = new Map<string, string>()
    for (const [, media] of contentEntries) {
      const z = zodToOpenAPI(media.schema)
      uniqueSchemas.set(z, z)
    }
    const required = resolvedBody.required ?? false
    const [firstSchema] = uniqueSchemas.values()
    const requestBodyCode = requestBody(required, contentWithResolvedExamples, firstSchema, {
      description: resolvedBody.description,
    })
    if (requestParams) return requestParams.replace('request:{', `request:{${requestBodyCode}`)
    return `request:{${requestBodyCode}},`
  }
  return requestParams
}
