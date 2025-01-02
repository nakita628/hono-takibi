import { generateFormatRequestObject } from '../object/generate-format-request-object'
import { generateParamsObject } from './generate-params-object'
import { generateRequestBody } from '../body/generate-request-body'
import { generateRequestParamsArray } from './generate-request-params-array'
import { generateInsertRequestBody } from '../body/generate-insert-request-body'
import { generateRequestParams } from './generate-request-params'
import type { Parameters, RequestBody } from '../../../types'
import { generatePropertySchema } from '../../zod/generate-zod-property-schema'

/**
 * Generates TypeScript code for request validation based on OpenAPI specification
 *
 * @function generateRequestParameter
 *
 * @param parameters - Array of path parameters from OpenAPI specification
 * @param requestBody - Request body definition from OpenAPI specification
 * @returns Generated TypeScript code string for request validation
 *
 * @example
 * // Path parameters only
 * const params = [{
 *   name: 'userId',
 *   in: 'path',
 *   required: true,
 *   schema: { type: 'string' }
 * }]
 * generateRequestParameter(params, undefined)
 * // Returns: 'request: { params: z.object({ userId: z.string() }) }'
 *
 * // Request body only
 * const body = {
 *   content: {
 *     'application/json': {
 *       schema: { $ref: '#/components/schemas/CreateUser' }
 *     }
 *   },
 *   required: true
 * }
 * generateRequestParameter(undefined, body)
 * // Returns: 'request: { json: CreateUser }'
 *
 * // Both parameters and body
 * generateRequestParameter(params, body)
 * // Returns: 'request: { params: z.object({ userId: z.string() }), json: CreateUser }'
 *
 * @note
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
export function generateRequestParameter(
  parameters: Parameters[] | undefined,
  requestBody: RequestBody | undefined,
): string {
  // Early return if no parameters or content
  if (!(parameters || requestBody?.content)) {
    return ''
  }

  // Generate params if they exist
  const params = parameters
    ? (() => {
        const paramsObj = generateParamsObject(parameters)
        const requestParamsArr = generateRequestParamsArray(paramsObj)
        return requestParamsArr.length ? generateFormatRequestObject(requestParamsArr) : ''
      })()
    : ''

  // Handle request body if it exists
  if (requestBody?.content) {
    const contentType = Object.keys(requestBody.content)[0]
    if (contentType) {
      const schema = requestBody.content[contentType].schema
      const zodSchema = generatePropertySchema(schema)
      const request_body_required = requestBody.required ?? false
      const requestBodyCode = generateRequestBody(
        request_body_required,
        requestBody.content,
        zodSchema,
      )
      return params
        ? generateInsertRequestBody(params, requestBodyCode)
        : generateRequestParams(requestBodyCode)
    }
  }

  return params
  // if (!(parameters || requestBody?.content?.['application/json'])) {
  //   return ''
  // }

  // const params = parameters
  //   ? (() => {
  //       const paramsObj = generateParamsObject(parameters)
  //       const requestParamsArr = generateRequestParamsArray(paramsObj)
  //       return requestParamsArr.length ? generateFormatRequestObject(requestParamsArr) : ''
  //     })()
  //   : ''

  // if (requestBody?.content?.['application/json']) {
  //   const schema = requestBody.content['application/json'].schema
  //   const zodSchema = generatePropertySchema(schema)
  //   const request_body_required = requestBody.required ?? false
  //   const requestBodyCode = generateRequestBody(
  //     request_body_required,
  //     requestBody.content,
  //     zodSchema,
  //   )
  //   return params
  //     ? generateInsertRequestBody(params, requestBodyCode)
  //     : generateRequestParams(requestBodyCode)
  // }

  // if (requestBody?.content?.['application/xml']) {
  //   const schema = requestBody.content['application/xml'].schema
  //   const zodSchema = generatePropertySchema(schema)
  //   const request_body_required = requestBody.required ?? false
  //   const requestBodyCode = generateRequestBody(
  //     request_body_required,
  //     requestBody.content,
  //     zodSchema,
  //   )
  //   return params
  //     ? generateInsertRequestBody(params, requestBodyCode)
  //     : generateRequestParams(requestBodyCode)
  // }

  // if (requestBody?.content?.['application/x-www-form-urlencoded']) {
  //   const schema = requestBody.content['application/x-www-form-urlencoded'].schema
  //   const zodSchema = generatePropertySchema(schema)
  //   const request_body_required = requestBody.required ?? false
  //   const requestBodyCode = generateRequestBody(
  //     request_body_required,
  //     requestBody.content,
  //     zodSchema,
  //   )
  //   return params
  //     ? generateInsertRequestBody(params, requestBodyCode)
  //     : generateRequestParams(requestBodyCode)
  // }

  // if (requestBody?.content?.['application/octet-stream']) {
  //   const schema = requestBody.content['application/octet-stream'].schema
  //   const zodSchema = generatePropertySchema(schema)
  //   const request_body_required = requestBody.required ?? false
  //   const requestBodyCode = generateRequestBody(
  //     request_body_required,
  //     requestBody.content,
  //     zodSchema,
  //   )
  //   return params
  //     ? generateInsertRequestBody(params, requestBodyCode)
  //     : generateRequestParams(requestBodyCode)
  // }

  // return params
}
