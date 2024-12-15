import { generateFormatRequestObject } from '../object/generate-format-request-object'
import { generateParamsObject } from './generate-params-object'
import { generateRequestBody } from '../body/generate-request-body'
import { generateRequestParamsArray } from './generate-request-params-array'
import { generateInsertRequestBody } from '../body/generate-insert-request-body'
import { generateRequestParams } from './generate-request-params'
import { PathParameters, RequestBody } from '../../../types'
import { getRefName } from '../../../core/schema/references/get-ref-name'
import { generateZodSchema } from '../../zod/generate-zod-schema'

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
  parameters: PathParameters[] | undefined,
  requestBody: RequestBody | undefined,
): string {
  if (!parameters && !requestBody?.content?.['application/json']) {
    return ''
  }

  const params = parameters
    ? (() => {
        const paramsObj = generateParamsObject(parameters)
        const requestParamsArr = generateRequestParamsArray(paramsObj)
        return requestParamsArr.length ? generateFormatRequestObject(requestParamsArr) : ''
      })()
    : ''

  if (requestBody?.content?.['application/json']) {
    const schema = requestBody.content['application/json'].schema
    const zodSchema = (() => {
      if (schema.$ref) {
        return getRefName(schema.$ref) || 'z.any()'
      }
      if (schema.type === 'array') {
        if (!schema.items) return 'z.array(z.any())'
        if ('$ref' in schema.items && schema.items.$ref) {
          const refName = getRefName(schema.items.$ref)
          return `z.array(${refName || 'z.any()'})`
        }
        return `z.array(${generateZodSchema(schema.items)})`
      }
      return generateZodSchema(schema)
    })()

    const request_body_required = requestBody.required ?? false

    const requestBodyCode = generateRequestBody(request_body_required, zodSchema)
    return params ? generateInsertRequestBody(params, requestBodyCode) : generateRequestParams(requestBodyCode)
  }

  return params
}
