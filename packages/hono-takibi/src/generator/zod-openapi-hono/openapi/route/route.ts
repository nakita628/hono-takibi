import type { Components, Operation } from '../../../../openapi/index.js'
import {
  createRoute,
  escapeStringLiteral,
  methodPath,
  sanitizeIdentifier,
} from '../../../../utils/index.js'
import { requestParameter } from './params/index.js'
import { response } from './response/index.js'

/**
 * Generates TypeScript code for a Hono route from OpenAPI operation details.
 *
 * @param path - The route path (e.g., `/users/{id}`).
 * @param method - The HTTP method (e.g., `get`, `post`).
 * @param operation - The OpenAPI Operation object.
 * @returns A TypeScript code string defining the route via `createRoute`.
 *
 * @remarks
 * - Combines tags, method, path, operationId, summary, description, security, request, and response.
 * - Escapes all string literals.
 * - Produces a complete `.openapi()` route definition with validation.
 */
export function route(
  path: string,
  method: string,
  operation: Operation,
  components?: Components,
  options?: { readonly useComponentRefs?: boolean },
): string {
  const {
    tags,
    operationId,
    summary,
    description,
    security,
    parameters,
    requestBody,
    responses,
    callbacks,
  } = operation

  const isRecord = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null
  const isRef = (v: unknown): v is { $ref: string } => isRecord(v) && typeof v.$ref === 'string'

  const toIdentifier = (raw: string): string => {
    const sanitized = sanitizeIdentifier(raw)
    return /^[A-Za-z_$]/.test(sanitized) ? sanitized : `_${sanitized}`
  }
  const callbackConstName = (key: string): string => {
    const base = key.endsWith('Callback') ? key : `${key}Callback`
    return toIdentifier(base)
  }

  const callbacksCode = (() => {
    if (!(callbacks && isRecord(callbacks))) return ''
    if (!options?.useComponentRefs) {
      const out: Record<string, unknown> = {}
      for (const [callbackName, value] of Object.entries(callbacks)) {
        if (isRef(value) && value.$ref.startsWith('#/components/callbacks/')) {
          const key = value.$ref.split('/').pop()
          const resolved = key ? components?.callbacks?.[key] : undefined
          out[callbackName] = resolved ?? value
          continue
        }
        out[callbackName] = value
      }
      return Object.keys(out).length > 0 ? `callbacks:${JSON.stringify(out)},` : ''
    }

    const entries = Object.entries(callbacks).map(([callbackName, value]) => {
      if (isRef(value) && value.$ref.startsWith('#/components/callbacks/')) {
        const key = value.$ref.split('/').pop()
        const resolved = key ? components?.callbacks?.[key] : undefined
        if (key && resolved) return `${JSON.stringify(callbackName)}:${callbackConstName(key)}`
        return `${JSON.stringify(callbackName)}:{$ref:${JSON.stringify(value.$ref)}}`
      }
      return `${JSON.stringify(callbackName)}:${JSON.stringify(value)}`
    })
    return entries.length > 0 ? `callbacks:{${entries.join(',')}},` : ''
  })()

  const tagList = tags ? JSON.stringify(tags) : '[]'
  const requestParams = requestParameter(parameters, requestBody, components, options)

  const args = {
    routeName: `${methodPath(method, path)}Route`,
    tags: tags ? `tags:${tagList},` : '',
    method: `method:'${method}',`,
    path: `path:'${path}',`,
    operationId: operationId ? `operationId:'${operationId}',` : '',
    summary: summary ? `summary:'${escapeStringLiteral(summary)}',` : '',
    description: description ? `description:'${escapeStringLiteral(description)}',` : '',
    security: security ? `security:${JSON.stringify(security)},` : '',
    callbacks: callbacksCode,
    requestParams: requestParams ? `${requestParams}` : '',
    responses: responses ? `responses:{${response(responses, components, options)}}` : '',
  }
  return createRoute(args)
}
