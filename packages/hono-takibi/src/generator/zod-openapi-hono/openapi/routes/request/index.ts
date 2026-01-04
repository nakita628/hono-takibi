import type { Parameter, RequestBody } from '../../../../../openapi/index.js'
import {
  ensureSuffix,
  isRecord,
  requestParamsArray,
  toIdentifierPascalCase,
} from '../../../../../utils/index.js'
import { params } from '../params/index.js'
import { makeRequest } from '../../../../../helper/openapi.js'

/**
 * Generates a `request:{ ... }` string for Hono route validation from OpenAPI parameters and request body.
 *
 * @param parameters - OpenAPI `parameters` array (query, path, header).
 * @param body - OpenAPI `requestBody` object.
 * @returns A formatted `request:{ ... }` string or empty string if neither is defined.
 */
export function request(
  parameters: readonly Parameter[] | undefined,
  body: RequestBody | undefined,
): string {
  // Type guard for $ref
  const isRef = (v: unknown): v is { $ref: string } =>
    isRecord(v) && typeof v.$ref === 'string'

  // Handle $ref to requestBodies component
  if (body && isRef(body) && body.$ref.startsWith('#/components/requestBodies/')) {
    const key = body.$ref.split('/').pop()
    if (key) {
      const bodyCode = `body:${toIdentifierPascalCase(ensureSuffix(key, 'RequestBody'))}`
      if (parameters && parameters.length > 0) {
        const paramsObj = params(parameters)
        const requestParamsArr = requestParamsArray(paramsObj)
        if (requestParamsArr.length > 0) {
          return `request:{${bodyCode},${requestParamsArr.join(',')}},`
        }
      }
      return `request:{${bodyCode}},`
    }
  }

  // Use makeRequest for inline content
  return makeRequest(parameters, body)
}
