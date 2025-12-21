import type { Components, Parameters, RequestBodies } from '../../../../../openapi/index.js'
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
  parameters: readonly Parameters[] | undefined,
  body: RequestBodies | undefined,
  components?: Components,
  options?: { readonly useComponentRefs?: boolean },
): string {
  const isRecord = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null
  const isRef = (v: unknown): v is { $ref: string } => isRecord(v) && typeof v.$ref === 'string'

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

  const resolvedBody: RequestBodies | undefined = (() => {
    if (!body) return undefined
    if (!isRef(body)) return body
    if (!body.$ref.startsWith('#/components/requestBodies/')) return body
    const key = body.$ref.split('/').pop()
    const resolved = key ? components?.requestBodies?.[key] : undefined
    return resolved ?? body
  })()

  // Early return if no parameters or content
  if (!(parameters || resolvedBodyRef || resolvedBody?.content)) return ''

  const requestBodyContentTypes = Object.keys(resolvedBody?.content || {})
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

  if (requestBodyContentTypes.length > 0 && resolvedBody?.content) {
    const contentWithResolvedExamples = (() => {
      if (!components?.examples) return resolvedBody.content
      const out = Object.fromEntries(
        Object.entries(resolvedBody.content).map(([contentType, media]) => {
          const examples = media.examples
          if (!examples || Object.keys(examples).length === 0) return [contentType, media]

          const resolvedExamples = Object.fromEntries(
            Object.entries(examples).map(([exampleKey, example]) => {
              if (isRef(example) && example.$ref.startsWith('#/components/examples/')) {
                const name = example.$ref.split('/').pop()
                const resolved = name ? components.examples?.[name] : undefined
                return [exampleKey, resolved ?? example]
              }
              return [exampleKey, example]
            }),
          )

          return [contentType, { ...media, examples: resolvedExamples }]
        }),
      )
      return out
    })()

    // Eliminate schema duplication
    const uniqueSchemas = new Map<string, string>()
    for (const contentType of requestBodyContentTypes) {
      const { schema } = resolvedBody.content[contentType]
      const z = zodToOpenAPI(schema)
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
