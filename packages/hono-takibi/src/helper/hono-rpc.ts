/**
 * Shared utilities for Hono RPC code generation.
 *
 * Common functions used by both RPC client and SWR hook generators.
 *
 * @module helper/hono-rpc
 * @link https://hono.dev/docs/guides/rpc
 */
import path from 'node:path'
import type { OpenAPIPaths } from '../openapi/index.js'
import { isRecord } from '../utils/index.js'

/* ─────────────────────────────── Guards ─────────────────────────────── */

/**
 * Type guard for OpenAPI paths object.
 *
 * @param v - Value to check
 * @returns True if value is a valid OpenAPI paths object
 *
 * @example
 * ```ts
 * if (isOpenAPIPaths(openAPI.paths)) {
 *   // paths is OpenAPIPaths
 * }
 * ```
 */
export const isOpenAPIPaths = (v: unknown): v is OpenAPIPaths => {
  if (!isRecord(v)) return false
  for (const k in v) {
    if (!isRecord(v[k])) return false
  }
  return true
}

/* ─────────────────────────────── Formatters ─────────────────────────────── */

/**
 * Escape special characters for string literals.
 *
 * @param s - String to escape
 * @returns Escaped string safe for use in string literals
 */
export const esc = (s: string) => s.replace(/\\/g, '\\\\').replace(/'/g, "\\'")

/**
 * Check if a string is a valid JavaScript identifier.
 *
 * @param s - String to check
 * @returns True if string is a valid JS identifier
 *
 * @example
 * ```ts
 * isValidIdent('users')     // true
 * isValidIdent(':id')       // false
 * isValidIdent('my-path')   // false
 * ```
 */
export const isValidIdent = (s: string): boolean => /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(s)

/**
 * Format result containing paths for both runtime and type expressions.
 */
export type FormatPathResult = {
  /** Path for runtime calls (mixed notation is fine) */
  runtimePath: string
  /** Dot-only prefix for typeof expression (e.g., '.users') */
  typeofPrefix: string
  /** Bracket-only suffix for type expression (e.g., "[':id']['avatar']") */
  bracketSuffix: string
  /** Whether any segment requires bracket notation */
  hasBracket: boolean
}

/**
 * Format path for Hono RPC access (both type and runtime).
 *
 * Hono hc client uses PathToChain which splits paths by '/'.
 *
 * Rules:
 * - '/' -> '.index'
 * - Valid identifiers use dot notation: '/users' -> '.users'
 * - Invalid identifiers use bracket notation: '/:id' -> "[':id']"
 * - Path params converted: '/files/{fileId}' -> ".files[':fileId']"
 *
 * For InferRequestType, when bracket notation exists in the path,
 * we need to wrap `typeof client.<prefix>` in parentheses and use
 * all bracket notation after:
 * - `/users/{id}` -> type: `(typeof client.users)[':id']['$get']`
 * - `/users/{id}/avatar` -> type: `(typeof client.users)[':id']['avatar']['$post']`
 *
 * @param p - OpenAPI path string
 * @returns Formatted path result with runtime and type expressions
 *
 * @example
 * ```ts
 * formatPath('/users')
 * // { runtimePath: '.users', typeofPrefix: '.users', bracketSuffix: '', hasBracket: false }
 *
 * formatPath('/users/{id}')
 * // { runtimePath: ".users[':id']", typeofPrefix: '.users', bracketSuffix: "[':id']", hasBracket: true }
 * ```
 */
export const formatPath = (p: string): FormatPathResult => {
  if (p === '/') {
    return {
      runtimePath: '.index',
      typeofPrefix: '.index',
      bracketSuffix: '',
      hasBracket: false,
    }
  }

  const segs = p.replace(/^\/+/, '').split('/').filter(Boolean)
  const honoSegs = segs.map((seg) => seg.replace(/\{([^}]+)\}/g, ':$1'))

  const firstBracketIdx = honoSegs.findIndex((seg) => !isValidIdent(seg))
  const hasBracket = firstBracketIdx !== -1

  const runtimeParts = honoSegs.map((seg) => (isValidIdent(seg) ? `.${seg}` : `['${esc(seg)}']`))
  const runtimePath = runtimeParts.join('')

  const typeofPrefix = hasBracket
    ? honoSegs
        .slice(0, firstBracketIdx)
        .map((seg) => `.${seg}`)
        .join('')
    : runtimePath

  const bracketSuffix = hasBracket
    ? honoSegs
        .slice(firstBracketIdx)
        .map((seg) => `['${esc(seg)}']`)
        .join('')
    : ''

  return { runtimePath, typeofPrefix, bracketSuffix, hasBracket }
}

/* ─────────────────────────────── Parameters ($ref) ─────────────────────────────── */

/**
 * Reference object with $ref property.
 */
export type RefObject = { $ref: string }

/**
 * Type guard for $ref objects.
 *
 * @param v - Value to check
 * @returns True if value is a reference object
 */
export const isRefObject = (v: unknown): v is RefObject => isRecord(v) && typeof v.$ref === 'string'

/**
 * OpenAPI parameter-like object.
 */
export type ParameterLike = {
  name: string
  in: 'path' | 'query' | 'header' | 'cookie'
  required?: boolean
}

/**
 * Type guard for parameter objects.
 *
 * @param v - Value to check
 * @returns True if value is a parameter-like object
 */
export const isParameterObject = (v: unknown): v is ParameterLike => {
  if (!isRecord(v)) return false
  if (typeof v.name !== 'string') return false
  const pos = v.in
  return pos === 'path' || pos === 'query' || pos === 'header' || pos === 'cookie'
}

/**
 * Extract parameter name from $ref.
 *
 * @param refLike - Reference object or string
 * @returns Parameter name or undefined
 *
 * @example
 * ```ts
 * refParamName({ $ref: '#/components/parameters/UserId' })
 * // 'UserId'
 * ```
 */
export const refParamName = (refLike: unknown): string | undefined => {
  const ref =
    typeof refLike === 'string' ? refLike : isRefObject(refLike) ? refLike.$ref : undefined
  const m = ref?.match(/^#\/components\/parameters\/(.+)$/)
  return m ? m[1] : undefined
}

/**
 * Create parameter resolver function.
 *
 * @param componentsParameters - Components/parameters from OpenAPI spec
 * @returns Function to resolve parameter references
 */
export const createResolveParameter =
  (componentsParameters: Record<string, unknown>) =>
  (p: unknown): ParameterLike | undefined => {
    if (isParameterObject(p)) return p
    const name = refParamName(p)
    const cand = name ? componentsParameters[name] : undefined
    return isParameterObject(cand) ? cand : undefined
  }

/**
 * Create function to convert parameter array to ParameterLike array.
 *
 * @param resolveParam - Parameter resolver function
 * @returns Function to convert arrays
 */
export const createToParameterLikes =
  (resolveParam: (p: unknown) => ParameterLike | undefined) =>
  (arr?: unknown): ParameterLike[] =>
    Array.isArray(arr) ? arr.map((x) => resolveParam(x)).filter((param) => param !== undefined) : []

/* ─────────────────────────────── Operation types ─────────────────────────────── */

/**
 * OpenAPI operation-like object.
 */
export type OperationLike = {
  summary?: string
  description?: string
  parameters?: unknown
  requestBody?: unknown
  responses?: unknown
}

/**
 * Type guard for operation objects.
 *
 * @param v - Value to check
 * @returns True if value is an operation-like object
 */
export const isOperationLike = (v: unknown): v is OperationLike => isRecord(v) && 'responses' in v

/**
 * Extract success status codes (2xx) from operation responses.
 *
 * Returns the first 2xx status code found, with preference for:
 * 1. 200 (OK)
 * 2. 201 (Created)
 * 3. 204 (No Content)
 * 4. Other 2xx codes in order
 *
 * @param op - Operation object
 * @returns First success status code or undefined if none found
 *
 * @example
 * ```ts
 * const op = { responses: { '200': {...}, '404': {...} } }
 * getSuccessStatusCode(op)
 * // => 200
 *
 * const createOp = { responses: { '201': {...}, '400': {...} } }
 * getSuccessStatusCode(createOp)
 * // => 201
 * ```
 */
export const getSuccessStatusCode = (op: OperationLike): number | undefined => {
  const responses = op.responses
  if (!isRecord(responses)) return undefined

  const statusCodes = Object.keys(responses)
    .map((s) => Number.parseInt(s, 10))
    .filter((code) => !Number.isNaN(code) && code >= 200 && code < 300)
    .sort((a, b) => {
      // Prioritize common success codes
      const priority = [200, 201, 204]
      const aIndex = priority.indexOf(a)
      const bIndex = priority.indexOf(b)
      if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex
      if (aIndex !== -1) return -1
      if (bIndex !== -1) return 1
      return a - b
    })

  return statusCodes[0]
}

/**
 * HTTP status codes that indicate No Content (no response body).
 *
 * When these status codes are defined in OpenAPI responses,
 * `parseResponse` may return `undefined`.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/204
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/205
 * @see https://github.com/honojs/hono/issues/4264
 */
const NO_CONTENT_STATUS_CODES = [204, 205] as const

/**
 * Check if operation has No Content response (204 or 205).
 *
 * When an operation has 204 or 205 response defined,
 * `parseResponse()` may return `undefined` instead of parsed data.
 * This function helps determine if `| undefined` should be added to the response type.
 *
 * @param op - Operation object
 * @returns True if operation has 204 or 205 response defined
 *
 * @example
 * ```ts
 * const deleteOp = { responses: { '204': { description: 'Deleted' } } }
 * hasNoContentResponse(deleteOp)
 * // => true
 *
 * const getOp = { responses: { '200': { description: 'OK' } } }
 * hasNoContentResponse(getOp)
 * // => false
 * ```
 *
 * @see https://hono.dev/docs/guides/rpc#parsing-a-response-with-type-safety-helper
 */
export const hasNoContentResponse = (op: OperationLike): boolean => {
  const responses = op.responses
  if (!isRecord(responses)) return false

  return Object.keys(responses).some((status) => {
    const code = Number.parseInt(status, 10)
    return !Number.isNaN(code) && NO_CONTENT_STATUS_CODES.includes(code as 204 | 205)
  })
}

/**
 * HTTP methods supported by OpenAPI.
 */
export type HttpMethod = 'get' | 'put' | 'post' | 'delete' | 'options' | 'head' | 'patch' | 'trace'

/**
 * All HTTP methods as readonly array.
 */
export const HTTP_METHODS: readonly HttpMethod[] = [
  'get',
  'put',
  'post',
  'delete',
  'options',
  'head',
  'patch',
  'trace',
]

/**
 * OpenAPI path item with operations.
 */
export type PathItemLike = {
  parameters?: unknown
} & { [M in HttpMethod]?: OperationLike | undefined }

/* ─────────────────────────────── RequestBody ─────────────────────────────── */

/**
 * Type guard for objects with schema property.
 */
export const hasSchemaProp = (v: unknown): v is { schema?: unknown } => isRecord(v) && 'schema' in v

/**
 * Body info for tracking request body presence.
 */
export type BodyInfo = { contentType: string }

/**
 * All body info grouped by type.
 */
export type AllBodyInfo = { form: BodyInfo[]; json: BodyInfo[] }

/**
 * Extract requestBody name from $ref.
 *
 * @param refLike - Reference object or string
 * @returns RequestBody name or undefined
 *
 * @example
 * ```ts
 * refRequestBodyName({ $ref: '#/components/requestBodies/CreateUser' })
 * // 'CreateUser'
 * ```
 */
export const refRequestBodyName = (refLike: unknown): string | undefined => {
  const ref =
    typeof refLike === 'string' ? refLike : isRefObject(refLike) ? refLike.$ref : undefined
  const m = ref?.match(/^#\/components\/requestBodies\/(.+)$/)
  return m ? m[1] : undefined
}

/**
 * Collect all body infos from content.
 *
 * Groups by body key ('form' or 'json') with union types.
 *
 * @param content - Content object from requestBody
 * @returns AllBodyInfo or undefined
 */
export const pickAllBodyInfoFromContent = (content: unknown): AllBodyInfo | undefined => {
  if (!isRecord(content)) return undefined

  const formContentTypes = ['multipart/form-data', 'application/x-www-form-urlencoded']

  const isFormContentType = (ct: string): boolean =>
    formContentTypes.includes(ct.split(';')[0].trim())

  const validEntries = Object.entries(content).filter(
    ([_, mediaObj]) => isRecord(mediaObj) && hasSchemaProp(mediaObj) && isRecord(mediaObj.schema),
  )

  const formInfos = validEntries
    .filter(([ct]) => isFormContentType(ct))
    .map(([ct]): BodyInfo => ({ contentType: ct }))

  const jsonInfos = validEntries
    .filter(([ct]) => !isFormContentType(ct))
    .map(([ct]): BodyInfo => ({ contentType: ct }))

  if (formInfos.length === 0 && jsonInfos.length === 0) return undefined

  return { form: formInfos, json: jsonInfos }
}

/**
 * Create function to pick body info from operation.
 *
 * @param componentsRequestBodies - Components/requestBodies from OpenAPI spec
 * @returns Function to extract body info from operations
 */
export const createPickAllBodyInfo =
  (componentsRequestBodies: Record<string, unknown>) =>
  (op: OperationLike): AllBodyInfo | undefined => {
    const rb = op.requestBody
    if (!isRecord(rb)) return undefined

    const refName = refRequestBodyName(rb)
    if (refName) {
      const resolved = componentsRequestBodies[refName]
      if (isRecord(resolved) && isRecord(resolved.content)) {
        return pickAllBodyInfoFromContent(resolved.content)
      }
      if (resolved !== undefined) return { form: [], json: [{ contentType: 'application/json' }] }
      return undefined
    }

    return pickAllBodyInfoFromContent(rb.content)
  }

/* ─────────────────────────────── Split mode ─────────────────────────────── */

/**
 * Resolve output directory for split mode.
 *
 * @param output - Output path (file or directory)
 * @returns Object with outDir and indexPath
 *
 * @example
 * ```ts
 * resolveSplitOutDir('src/rpc.ts')
 * // { outDir: 'src', indexPath: 'src/index.ts' }
 *
 * resolveSplitOutDir('src/rpc')
 * // { outDir: 'src/rpc', indexPath: 'src/rpc/index.ts' }
 * ```
 */
export const resolveSplitOutDir = (output: string) => {
  const looksLikeFile = output.endsWith('.ts')
  const outDir = looksLikeFile ? path.dirname(output) : output
  const indexPath = path.join(outDir, 'index.ts')
  return { outDir, indexPath }
}

/* ─────────────────────────────── JSDoc formatting ─────────────────────────────── */

/**
 * Format multiline text for JSDoc comments.
 *
 * @param text - Text to format
 * @returns Array of JSDoc lines with ' * ' prefix
 *
 * @example
 * ```ts
 * formatJsDocLines('Line 1\nLine 2')
 * // [' * Line 1', ' * Line 2']
 * ```
 */
export const formatJsDocLines = (text: string): string[] =>
  text
    .trimEnd()
    .split('\n')
    .map((line) => ` * ${line}`)

/**
 * Build JSDoc comment block for an operation.
 *
 * @param method - HTTP method
 * @param pathStr - OpenAPI path
 * @param summary - Operation summary
 * @param description - Operation description
 * @returns JSDoc comment string
 */
export const buildOperationDocs = (
  method: string,
  pathStr: string,
  summary?: string,
  description?: string,
): string => {
  const safePathStr = pathStr.replace(/\/\*/g, '/[*]')
  return [
    '/**',
    ` * ${method.toUpperCase()} ${safePathStr}`,
    ...(summary ? [' *', ...formatJsDocLines(summary)] : []),
    ...(description ? [' *', ...formatJsDocLines(description)] : []),
    ' */',
  ].join('\n')
}

/* ─────────────────────────────── Path item parsing ─────────────────────────────── */

/**
 * Parse raw path item to PathItemLike.
 *
 * @param rawItem - Raw path item object
 * @returns Parsed PathItemLike
 */
export const parsePathItem = (rawItem: Record<string, unknown>): PathItemLike => ({
  parameters: rawItem.parameters,
  get: isOperationLike(rawItem.get) ? rawItem.get : undefined,
  put: isOperationLike(rawItem.put) ? rawItem.put : undefined,
  post: isOperationLike(rawItem.post) ? rawItem.post : undefined,
  delete: isOperationLike(rawItem.delete) ? rawItem.delete : undefined,
  options: isOperationLike(rawItem.options) ? rawItem.options : undefined,
  head: isOperationLike(rawItem.head) ? rawItem.head : undefined,
  patch: isOperationLike(rawItem.patch) ? rawItem.patch : undefined,
  trace: isOperationLike(rawItem.trace) ? rawItem.trace : undefined,
})

/* ─────────────────────────────── Type expressions ─────────────────────────────── */

/**
 * Build InferRequestType expression.
 *
 * @param clientName - Client variable name
 * @param pathResult - Formatted path result
 * @param method - HTTP method
 * @returns TypeScript type expression string
 */
export const buildInferRequestType = (
  clientName: string,
  pathResult: FormatPathResult,
  method: HttpMethod,
): string => {
  const { runtimePath, typeofPrefix, bracketSuffix, hasBracket } = pathResult
  return hasBracket
    ? `InferRequestType<(typeof ${clientName}${typeofPrefix})${bracketSuffix}['$${method}']>`
    : `InferRequestType<typeof ${clientName}${runtimePath}.$${method}>`
}

/**
 * Build InferResponseType expression.
 *
 * @param clientName - Client variable name
 * @param pathResult - Formatted path result
 * @param method - HTTP method
 * @param statusCode - Optional status code to filter response type (e.g., 200, 201)
 * @returns TypeScript type expression string
 *
 * @example
 * ```ts
 * // Without status code (all responses)
 * buildInferResponseType('client', pathResult, 'get')
 * // => 'InferResponseType<typeof client.users.$get>'
 *
 * // With status code (only 200 response)
 * buildInferResponseType('client', pathResult, 'get', 200)
 * // => 'InferResponseType<typeof client.users.$get, 200>'
 * ```
 */
export const buildInferResponseType = (
  clientName: string,
  pathResult: FormatPathResult,
  method: HttpMethod,
  statusCode?: number,
): string => {
  const { runtimePath, typeofPrefix, bracketSuffix, hasBracket } = pathResult
  const statusSuffix = statusCode !== undefined ? `,${statusCode}` : ''
  return hasBracket
    ? `InferResponseType<(typeof ${clientName}${typeofPrefix})${bracketSuffix}['$${method}']${statusSuffix}>`
    : `InferResponseType<typeof ${clientName}${runtimePath}.$${method}${statusSuffix}>`
}

/**
 * Build parseResponse return type expression.
 *
 * Uses `Awaited<ReturnType<typeof parseResponse<...>>>` to correctly infer
 * the actual return type of parseResponse, which handles:
 * - JSON responses (returns parsed object)
 * - Text responses (returns string)
 * - No content responses (returns undefined)
 *
 * This is more accurate than InferResponseType when the route has multiple
 * output formats (e.g., both 'json' and 'text' outputFormat in the type union).
 *
 * @param clientName - Client variable name
 * @param pathResult - Formatted path result
 * @param method - HTTP method
 * @returns TypeScript type expression string
 *
 * @example
 * ```ts
 * buildParseResponseType('client', pathResult, 'post')
 * // => 'Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$post>>>>>'
 * ```
 *
 * @see https://hono.dev/docs/guides/rpc#parsing-a-response-with-type-safety-helper
 */
export const buildParseResponseType = (
  clientName: string,
  pathResult: FormatPathResult,
  method: HttpMethod,
): string => {
  const { runtimePath, typeofPrefix, bracketSuffix, hasBracket } = pathResult
  const clientMethodType = hasBracket
    ? `(typeof ${clientName}${typeofPrefix})${bracketSuffix}['$${method}']`
    : `typeof ${clientName}${runtimePath}.$${method}`
  return `Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<${clientMethodType}>>>>>`
}

/* ─────────────────────────────── Parameter analysis ─────────────────────────────── */

/**
 * Dependencies for operation analysis.
 */
export type OperationDeps = {
  client: string
  toParameterLikes: (arr?: unknown) => ParameterLike[]
  pickAllBodyInfo: (op: OperationLike) => AllBodyInfo | undefined
}

/**
 * Create operation dependencies from OpenAPI components.
 *
 * @param clientName - Client variable name
 * @param componentsParameters - Components/parameters
 * @param componentsRequestBodies - Components/requestBodies
 * @returns OperationDeps
 */
export const createOperationDeps = (
  clientName: string,
  componentsParameters: Record<string, unknown>,
  componentsRequestBodies: Record<string, unknown>,
): OperationDeps => {
  const resolveParameter = createResolveParameter(componentsParameters)
  const toParameterLikes = createToParameterLikes(resolveParameter)
  const pickAllBodyInfo = createPickAllBodyInfo(componentsRequestBodies)
  return { client: clientName, toParameterLikes, pickAllBodyInfo }
}

/**
 * Check if operation has arguments (parameters or body).
 *
 * @param item - Path item
 * @param op - Operation
 * @param deps - Operation dependencies
 * @returns True if operation has arguments
 */
export const operationHasArgs = (
  item: PathItemLike,
  op: OperationLike,
  deps: OperationDeps,
): boolean => {
  const pathLevelParams = deps.toParameterLikes(item.parameters)
  const opParams = deps.toParameterLikes(op.parameters)
  const allParams = [...pathLevelParams, ...opParams]

  const hasParams =
    allParams.filter((p) => p.in === 'path').length > 0 ||
    allParams.filter((p) => p.in === 'query').length > 0 ||
    allParams.filter((p) => p.in === 'header').length > 0 ||
    allParams.filter((p) => p.in === 'cookie').length > 0

  const allBodyInfo = deps.pickAllBodyInfo(op)
  const hasBody =
    allBodyInfo !== undefined && (allBodyInfo.form.length > 0 || allBodyInfo.json.length > 0)

  return hasParams || hasBody
}
