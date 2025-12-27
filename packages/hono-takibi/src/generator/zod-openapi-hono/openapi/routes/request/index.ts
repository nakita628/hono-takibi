import type { Content, Parameter, RequestBody, Schema } from '../../../../../openapi/index.js'
import { requestParamsArray, sanitizeIdentifier } from '../../../../../utils/index.js'
import { zodToOpenAPI } from '../../../../zod-to-openapi/index.js'
import { requestBody } from '../request/body/index.js'
import { params } from '../params/index.js'

// Type guards
const isRecord = (v: unknown): v is Record<string, unknown> =>
  typeof v === 'object' && v !== null

const isRef = (v: unknown): v is { $ref: string } =>
  isRecord(v) && typeof v.$ref === 'string'

const isSchema = (v: unknown): v is Schema => isRecord(v)

const isMedia = (v: unknown): v is Content[string] =>
  isRecord(v) && 'schema' in v && isSchema(v.schema)

// Helper functions
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

// Builder functions
const buildRequestParams = (parameters: readonly Parameter[]): string => {
  const paramsObj = params(parameters)
  const requestParamsArr = requestParamsArray(paramsObj)
  return requestParamsArr.length ? `request:{${requestParamsArr.join(',')}},` : ''
}

const buildBodyCode = (
  resolvedBody: RequestBody,
  contentEntries: [string, Content[string]][],
): string => {
  // Deduplicate schemas
  const uniqueSchemas = new Map<string, string>()
  for (const [, media] of contentEntries) {
    const z = zodToOpenAPI(media.schema)
    uniqueSchemas.set(z, z)
  }
  const [firstSchema] = uniqueSchemas.values()
  const required = resolvedBody.required ?? false

  const contentWithExamples: Record<string, Content[string]> = {}
  for (const [contentType, media] of contentEntries) {
    contentWithExamples[contentType] = media
  }

  return requestBody(required, contentWithExamples, firstSchema, {
    description: resolvedBody.description,
  })
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

    const bodyCode = buildBodyCode(body, contentEntries)
    return mergeRequestCode(requestParams, bodyCode)
  }

  return requestParams
}
