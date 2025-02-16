import type { Parameters, RequestBody } from '../../../../../types'
import type { Config } from '../../../../../config'
import { generateParamsObject } from './generate-params-object'
import { generateRequestParamsArray } from './generate-request-params-array'
import { generateRequestParams } from './generate-request-params'
import { generatePropertySchema } from '../../../../zod/generate-zod-property-schema'
import { generateFormatRequestObject } from '../request/object/generate-format-request-object'
import { generateRequestBody } from '../request/body/generate-request-body'
import { generateInsertRequestBody } from '../request/body/generate-insert-request-body'

/**
 * Generates TypeScript code for request validation based on OpenAPI specification
 *
 * @function generateRequestParameter
 *
 * @param parameters - Array of path parameters from OpenAPI specification
 * @param requestBody - Request body definition from OpenAPI specification
 * @returns Generated TypeScript code string for request validation
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
  config: Config,
  // namingCase: 'camelCase' | 'PascalCase' = 'camelCase',
): string {
  // Early return if no parameters or content
  if (!(parameters || requestBody?.content)) {
    return ''
  }

  const requestBodyContentTypes = Object.keys(requestBody?.content || {})

  const params = parameters
    ? (() => {
        const paramsObj = generateParamsObject(parameters, config)
        const requestParamsArr = generateRequestParamsArray(paramsObj)
        return requestParamsArr.length ? generateFormatRequestObject(requestParamsArr) : ''
      })()
    : ''

  if (requestBodyContentTypes.length > 0 && requestBody?.content) {
    // Eliminate schema duplication
    const uniqueSchemas = new Map<string, string>()

    for (const contentType of requestBodyContentTypes) {
      const { schema } = requestBody.content[contentType]
      const zodSchema = generatePropertySchema(schema, config)

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
      : generateRequestParams(requestBodyCode)
  }

  return params
}
