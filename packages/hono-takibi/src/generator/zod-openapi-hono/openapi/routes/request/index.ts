import type { Components, Content, Parameter, RequestBody, Schema } from '../../../../../openapi/index.js'
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

const isExampleValue = (
  v: unknown,
): v is NonNullable<Content[string]['examples']>[string] => {
  if (!isRecord(v)) return false
  if (isRef(v)) return true
  const summaryOk = v.summary === undefined || typeof v.summary === 'string'
  const descriptionOk = v.description === undefined || typeof v.description === 'string'
  const externalValueOk = v.externalValue === undefined || typeof v.externalValue === 'string'
  return summaryOk && descriptionOk && externalValueOk
}

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

const resolveBodyRef = (
  body: RequestBody,
  components: Components | undefined,
): { key: string; constName: string } | undefined => {
  if (!isRef(body)) return undefined
  if (!body.$ref.startsWith('#/components/requestBodies/')) return undefined
  const key = body.$ref.split('/').pop()
  if (!key) return undefined
  const resolved = components?.requestBodies?.[key]
  if (!resolved) return undefined
  return { key, constName: requestBodyConstName(key) }
}

const resolveBody = (
  body: RequestBody,
  components: Components | undefined,
): RequestBody => {
  if (!isRef(body)) return body
  if (!body.$ref.startsWith('#/components/requestBodies/')) return body
  const key = body.$ref.split('/').pop()
  const resolved = key ? components?.requestBodies?.[key] : undefined
  return resolved ?? body
}

const resolveExamples = (
  examples: NonNullable<Content[string]['examples']>,
  componentsExamples: Components['examples'],
): Record<string, NonNullable<Content[string]['examples']>[string]> => {
  const resolved: Record<string, NonNullable<Content[string]['examples']>[string]> = {}
  for (const [exampleKey, example] of Object.entries(examples)) {
    if (isRef(example) && example.$ref.startsWith('#/components/examples/')) {
      const name = example.$ref.split('/').pop()
      const resolvedExample = name ? componentsExamples?.[name] : undefined
      if (isExampleValue(resolvedExample)) {
        resolved[exampleKey] = resolvedExample
        continue
      }
    }
    if (isExampleValue(example)) {
      resolved[exampleKey] = example
    }
  }
  return resolved
}

const buildContentWithResolvedExamples = (
  contentEntries: [string, Content[string]][],
  componentsExamples: Components['examples'],
): Record<string, Content[string]> => {
  const result: Record<string, Content[string]> = {}
  for (const [contentType, media] of contentEntries) {
    const examples = media.examples
    if (!componentsExamples || !examples || Object.keys(examples).length === 0) {
      result[contentType] = media
      continue
    }
    result[contentType] = {
      ...media,
      examples: resolveExamples(examples, componentsExamples),
    }
  }
  return result
}

const buildBodyCode = (
  resolvedBody: RequestBody,
  contentEntries: [string, Content[string]][],
  componentsExamples: Components['examples'],
): string => {
  const contentWithResolvedExamples = buildContentWithResolvedExamples(
    contentEntries,
    componentsExamples,
  )

  // Deduplicate schemas
  const uniqueSchemas = new Map<string, string>()
  for (const [, media] of contentEntries) {
    const z = zodToOpenAPI(media.schema)
    uniqueSchemas.set(z, z)
  }
  const [firstSchema] = uniqueSchemas.values()
  const required = resolvedBody.required ?? false

  return requestBody(required, contentWithResolvedExamples, firstSchema, {
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
 * @param components - OpenAPI components for resolving references.
 * @returns A formatted `request:{ ... }` string or empty string if neither is defined.
 */
export function request(
  parameters: readonly Parameter[] | undefined,
  body: RequestBody | undefined,
  components?: Components,
): string {
  const resolvedBodyRef = body ? resolveBodyRef(body, components) : undefined
  const resolvedBody = body ? resolveBody(body, components) : undefined

  // Early return if no parameters or content
  if (!(parameters || resolvedBodyRef || resolvedBody?.content)) return ''

  const requestParams = parameters ? buildRequestParams(parameters) : ''

  // Use component const name when the component exists
  if (resolvedBodyRef) {
    const bodyCode = `body:${resolvedBodyRef.constName},`
    return mergeRequestCode(requestParams, bodyCode)
  }

  // Handle inline body content
  if (resolvedBody?.content) {
    const contentEntries = Object.entries(resolvedBody.content).filter(
      (entry): entry is [string, Content[string]] => isMedia(entry[1]),
    )
    if (contentEntries.length === 0) return requestParams

    const bodyCode = buildBodyCode(resolvedBody, contentEntries, components?.examples)
    return mergeRequestCode(requestParams, bodyCode)
  }

  return requestParams
}
