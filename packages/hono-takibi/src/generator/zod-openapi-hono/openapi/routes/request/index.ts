import type { Content, Parameter, RequestBody } from '../../../../../openapi/index.js'
import { isRecord, requestParamsArray, toIdentifierPascalCase } from '../../../../../utils/index.js'
import { requestBody } from '../request/body/index.js'
import { params } from '../params/index.js'

// Type guards
const isRef = (v: unknown): v is { $ref: string } =>
  isRecord(v) && typeof v.$ref === 'string'

const isMedia = (v: unknown): v is Content[string] =>
  isRecord(v) && 'schema' in v && isRecord(v.schema)

// Helper functions
const requestBodyConstName = (key: string): string =>
  toIdentifierPascalCase(
    key.endsWith('Body')
      ? `${key.slice(0, -'Body'.length)}RequestBody`
      : `${key}RequestBody`,
  )

// Builder functions
const buildRequestParams = (parameters: readonly Parameter[]): string => {
  const paramsObj = params(parameters)
  const requestParamsArr = requestParamsArray(paramsObj)
  return requestParamsArr.length ? `request:{${requestParamsArr.join(',')}},` : ''
}

const mergeRequestCode = (requestParams: string, bodyCode: string): string => {
  if (requestParams) {
    return requestParams.replace('request:{', `request:{${bodyCode}`)
  }
  return `request:{${bodyCode}},`
}

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
  // Handle $ref to requestBodies component
  if (body && isRef(body) && body.$ref.startsWith('#/components/requestBodies/')) {
    const key = body.$ref.split('/').pop()
    if (key) {
      const requestParams = parameters ? buildRequestParams(parameters) : ''
      const bodyCode = `body:${requestBodyConstName(key)},`
      return mergeRequestCode(requestParams, bodyCode)
    }
  }

  // Early return if no parameters or content
  if (!(parameters || body?.content)) return ''

  const requestParams = parameters ? buildRequestParams(parameters) : ''

  // Handle inline body content
  if (body?.content) {
    const contentEntries = Object.entries(body.content).filter(
      (entry): entry is [string, Content[string]] => isMedia(entry[1]),
    )
    if (contentEntries.length === 0) return requestParams
    return `request:{${requestBody(body)}},`
  }

  return requestParams
}
