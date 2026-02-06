/**
 * Shared utilities for Hono RPC code generation.
 *
 * Common functions used by both RPC client and SWR hook generators.
 *
 * @module helper/hono-rpc
 * @link https://hono.dev/docs/guides/rpc
 */
import path from 'node:path'
import {
  isOperationLike,
  isParameterObject,
  isRecord,
  isRefObject,
  isSchemaProperty,
  isValidIdent,
} from '../guard/index.js'

/* ─────────────────────────────── Types ─────────────────────────────── */

// HttpMethod is exported because it's used by multiple modules
export type HttpMethod = 'get' | 'put' | 'post' | 'delete' | 'options' | 'head' | 'patch' | 'trace'

type ParameterLike = {
  name: string
  in: 'path' | 'query' | 'header' | 'cookie'
  required?: boolean
}

type OperationLike = {
  summary?: string
  description?: string
  parameters?: unknown
  requestBody?: unknown
  responses?: unknown
}

/* ─────────────────────────────── Formatters ─────────────────────────────── */

/**
 * Escape special characters for string literals.
 */
function makeEscaped(s: string) {
  return s.replace(/\\/g, '\\\\').replace(/'/g, "\\'")
}

/**
 * Format path for Hono RPC access (both type and runtime).
 */
export function formatPath(p: string):{
  runtimePath: string
  typeofPrefix: string
  bracketSuffix: string
  hasBracket: boolean
} {
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

  const runtimeParts = honoSegs.map((seg) =>
    isValidIdent(seg) ? `.${seg}` : `['${makeEscaped(seg)}']`,
  )
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
        .map((seg) => `['${makeEscaped(seg)}']`)
        .join('')
    : ''

  return { runtimePath, typeofPrefix, bracketSuffix, hasBracket }
}

/* ─────────────────────────────── Parameters ($ref) ─────────────────────────────── */

/**
 * Extract parameter name from $ref.
 */
function refParamName(refLike: unknown): string | undefined {
  const ref =
    typeof refLike === 'string' ? refLike : isRefObject(refLike) ? refLike.$ref : undefined
  const m = ref?.match(/^#\/components\/parameters\/(.+)$/)
  return m ? m[1] : undefined
}

/**
 * Create parameter resolver function.
 */
function createResolveParameter(componentsParameters: { [key: string]: unknown }) {
  return (p: unknown): ParameterLike | undefined => {
    if (isParameterObject(p)) return p
    const name = refParamName(p)
    const cand = name ? componentsParameters[name] : undefined
    return isParameterObject(cand) ? cand : undefined
  }
}

/**
 * Create function to convert parameter array to ParameterLike array.
 */
function createToParameterLikes(resolveParam: (p: unknown) => ParameterLike | undefined) {
  return (arr?: unknown): ParameterLike[] =>
    Array.isArray(arr) ? arr.map((x) => resolveParam(x)).filter((param) => param !== undefined) : []
}

/* ─────────────────────────────── Operation types ─────────────────────────────── */

const NO_CONTENT_STATUS_CODES = [204, 205]

/**
 * Check if operation has No Content response (204 or 205).
 */
export function hasNoContentResponse(op: OperationLike): boolean {
  const responses = op.responses
  if (!isRecord(responses)) return false

  return Object.keys(responses).some((status) => {
    const code = Number.parseInt(status, 10)
    return !Number.isNaN(code) && NO_CONTENT_STATUS_CODES.includes(code)
  })
}

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
 * Body info for tracking request body presence.
 */
export type BodyInfo = { contentType: string }

/**
 * All body info grouped by type.
 */
export type AllBodyInfo = { form: BodyInfo[]; json: BodyInfo[] }

/**
 * Extract requestBody name from $ref.
 */
function refRequestBodyName(refLike: unknown): string | undefined {
  const ref =
    typeof refLike === 'string' ? refLike : isRefObject(refLike) ? refLike.$ref : undefined
  const m = ref?.match(/^#\/components\/requestBodies\/(.+)$/)
  return m ? m[1] : undefined
}

/**
 * Collect all body infos from content.
 */
function pickAllBodyInfoFromContent(content: unknown): AllBodyInfo | undefined {
  if (!isRecord(content)) return undefined

  const formContentTypes = ['multipart/form-data', 'application/x-www-form-urlencoded']

  const isFormContentType = (ct: string): boolean =>
    formContentTypes.includes(ct.split(';')[0].trim())

  const validEntries = Object.entries(content).filter(
    ([_, mediaObj]) =>
      isRecord(mediaObj) && isSchemaProperty(mediaObj) && isRecord(mediaObj.schema),
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
 */
function createPickAllBodyInfo(componentsRequestBodies: { [key: string]: unknown }) {
  return (op: OperationLike): AllBodyInfo | undefined => {
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
}

/* ─────────────────────────────── Split mode ─────────────────────────────── */

/**
 * Resolve output directory for split mode.
 */
export function resolveSplitOutDir(output: string) {
  const looksLikeFile = output.endsWith('.ts')
  const outDir = looksLikeFile ? path.dirname(output) : output
  const indexPath = path.join(outDir, 'index.ts')
  return { outDir, indexPath }
}

/* ─────────────────────────────── JSDoc formatting ─────────────────────────────── */

/**
 * Format multiline text for JSDoc comments.
 */
function formatJsDocLines(text: string): string[] {
  return text
    .trimEnd()
    .split('\n')
    .map((line) => ` * ${line}`)
}

/**
 * Build JSDoc comment block for an operation.
 */
export function buildOperationDocs(
  method: string,
  pathStr: string,
  summary?: string,
  description?: string,
): string {
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
 */
export function parsePathItem(rawItem: { [key: string]: unknown }): PathItemLike {
  return {
    parameters: rawItem.parameters,
    get: isOperationLike(rawItem.get) ? rawItem.get : undefined,
    put: isOperationLike(rawItem.put) ? rawItem.put : undefined,
    post: isOperationLike(rawItem.post) ? rawItem.post : undefined,
    delete: isOperationLike(rawItem.delete) ? rawItem.delete : undefined,
    options: isOperationLike(rawItem.options) ? rawItem.options : undefined,
    head: isOperationLike(rawItem.head) ? rawItem.head : undefined,
    patch: isOperationLike(rawItem.patch) ? rawItem.patch : undefined,
    trace: isOperationLike(rawItem.trace) ? rawItem.trace : undefined,
  }
}

/* ─────────────────────────────── Type expressions ─────────────────────────────── */

/**
 * Build InferRequestType expression.
 */
export function buildInferRequestType(
  clientName: string,
  pathResult: FormatPathResult,
  method: HttpMethod,
): string {
  const { runtimePath, typeofPrefix, bracketSuffix, hasBracket } = pathResult
  return hasBracket
    ? `InferRequestType<(typeof ${clientName}${typeofPrefix})${bracketSuffix}['$${method}']>`
    : `InferRequestType<typeof ${clientName}${runtimePath}.$${method}>`
}

/**
 * Build parseResponse return type expression.
 */
export function buildParseResponseType(
  clientName: string,
  pathResult: FormatPathResult,
  method: HttpMethod,
): string {
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
 */
export function createOperationDeps(
  clientName: string,
  componentsParameters: { [key: string]: unknown },
  componentsRequestBodies: { [key: string]: unknown },
): OperationDeps {
  const resolveParameter = createResolveParameter(componentsParameters)
  const toParameterLikes = createToParameterLikes(resolveParameter)
  const pickAllBodyInfo = createPickAllBodyInfo(componentsRequestBodies)
  return { client: clientName, toParameterLikes, pickAllBodyInfo }
}

/**
 * Check if operation has arguments (parameters or body).
 */
export function operationHasArgs(
  item: PathItemLike,
  op: OperationLike,
  deps: OperationDeps,
): boolean {
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
