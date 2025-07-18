import type { Parameters, RequestBody } from '../../../../../openapi/index.js'
import { paramsObject, requestParams, requestParamsArray } from './index.js'
import { propertySchema } from '../../../../zod/property/property-schema.js'
import { formatRequestObject } from '../request/object/format-request-object.js'
import { requestBody } from '../request/body/request-body.js'
import { insertRequestBody } from '../request/body/insert-request-body.js'

/**
 * Generates TypeScript code for request validation based on OpenAPI specification
 * @param { Parameters[] | undefined } parameters - Array of path parameters from OpenAPI specification
 * @param { RequestBody | undefined } body - Request body definition from OpenAPI specification
 * @returns { string } Generated TypeScript code string for request validation
 *
 * - Handles both path parameters and request body validation
 * - Supports:
 *   - Path parameters with Zod validation
 *   - JSON request bodies with schema references
 *   - Array type request bodies
 *   - Required/optional request bodies
 * - Returns empty string if no parameters or body are defined
 * - Properly combines parameters and body when both are present
 * - Handles schema references and inline schemas
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
        return requestParamsArr.length ? formatRequestObject(requestParamsArr) : ''
      })()
    : ''

  if (requestBodyContentTypes.length > 0 && body?.content) {
    // Eliminate schema duplication
    const uniqueSchemas = new Map<string, string>()

    for (const contentType of requestBodyContentTypes) {
      const { schema } = body.content[contentType]
      const zodSchema = propertySchema(schema)

      uniqueSchemas.set(zodSchema, zodSchema)
    }

    const request_body_required = body.required ?? false
    const [firstSchema] = uniqueSchemas.values()

    const requestBodyCode = requestBody(request_body_required, body.content, firstSchema)

    return params ? insertRequestBody(params, requestBodyCode) : requestParams(requestBodyCode)
  }

  return params
}
