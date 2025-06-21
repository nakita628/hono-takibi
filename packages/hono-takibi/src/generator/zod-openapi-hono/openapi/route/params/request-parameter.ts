import type { Parameters, RequestBody } from '../../../../../openapi/index.js'
import { paramsObject, requestParams, requestParamsArray } from './index.js'
import { propertySchema } from '../../../../zod/property/property-schema.js'
import { generateFormatRequestObject } from '../request/object/generate-format-request-object.js'
import { generateRequestBody } from '../request/body/generate-request-body.js'
import { generateInsertRequestBody } from '../request/body/generate-insert-request-body.js'

/**
 * Generates TypeScript code for request validation based on OpenAPI specification
 * @param { Parameters[] | undefined } parameters - Array of path parameters from OpenAPI specification
 * @param { RequestBody | undefined } requestBody - Request body definition from OpenAPI specification
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
  requestBody: RequestBody | undefined,
): string {
  // Early return if no parameters or content
  if (!(parameters || requestBody?.content)) {
    return ''
  }

  const requestBodyContentTypes = Object.keys(requestBody?.content || {})

  const params = parameters
    ? (() => {
        const paramsObj = paramsObject(parameters)
        const requestParamsArr = requestParamsArray(paramsObj)
        return requestParamsArr.length ? generateFormatRequestObject(requestParamsArr) : ''
      })()
    : ''

  if (requestBodyContentTypes.length > 0 && requestBody?.content) {
    // Eliminate schema duplication
    const uniqueSchemas = new Map<string, string>()

    for (const contentType of requestBodyContentTypes) {
      const { schema } = requestBody.content[contentType]
      const zodSchema = propertySchema(schema)

      uniqueSchemas.set(zodSchema, zodSchema)
    }

    const request_body_required = requestBody.required ?? false
    const [firstSchema] = uniqueSchemas.values()

    const requestBodyCode = generateRequestBody(
      request_body_required,
      requestBody.content,
      firstSchema,
    )

    return params
      ? generateInsertRequestBody(params, requestBodyCode)
      : requestParams(requestBodyCode)
  }

  return params
}
