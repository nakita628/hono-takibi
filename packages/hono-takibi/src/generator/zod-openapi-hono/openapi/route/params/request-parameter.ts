import type { Parameters, RequestBody } from '../../../../../openapi/index.js'
import { requestParamsArray } from '../../../../../utils/index.js'
import { zodToOpenAPI } from '../../../../zod/helper/zod-to-openapi.js'
import { requestBody } from '../request/body/index.js'
import { paramsObject } from './index.js'

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
export function requestParameter(
  parameters: Parameters[] | undefined,
  body: RequestBody | undefined,
): string {
  // Early return if no parameters or content
  if (!(parameters || body?.content)) {
    return ''
  }
  const requestBodyContentTypes = Object.keys(body?.content || {})
  const params = parameters
    ? (() => {
        const paramsObj = paramsObject(parameters)
        const requestParamsArr = requestParamsArray(paramsObj)
        if (requestParamsArr.length) {
          return `request:{${requestParamsArr.join(',')}},`
        }
        return ''
      })()
    : ''
  if (requestBodyContentTypes.length > 0 && body?.content) {
    // Eliminate schema duplication
    const uniqueSchemas = new Map<string, string>()
    for (const contentType of requestBodyContentTypes) {
      const { schema } = body.content[contentType]
      const z = zodToOpenAPI(schema)
      uniqueSchemas.set(z, z)
    }
    const request_body_required = body.required ?? false
    const [firstSchema] = uniqueSchemas.values()
    const requestBodyCode = requestBody(request_body_required, body.content, firstSchema)
    if (params) {
      return params.replace('request:{', `request:{${requestBodyCode}`)
    }
    return `request:{${requestBodyCode}},`
  }
  return params
}
