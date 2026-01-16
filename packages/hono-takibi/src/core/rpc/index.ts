/**
 * RPC client wrapper generation module.
 *
 * Generates type-safe RPC client functions from OpenAPI specifications
 * for use with Hono's RPC client.
 *
 * ```mermaid
 * flowchart TD
 *   A["rpc(openAPI, output, importPath, split)"] --> B["Parse OpenAPI paths"]
 *   B --> C["Build operation codes"]
 *   C --> D{"split mode?"}
 *   D -->|No| E["Write single file"]
 *   D -->|Yes| F["Write per-operation files"]
 *   F --> G["Write index.ts barrel"]
 * ```
 *
 * @module core/rpc
 * @link https://github.com/honojs/hono/blob/main/src/client/types.ts#L46-L76
 */
import path from 'node:path'
import { core } from '../../helper/index.js'
import type { OpenAPI, OpenAPIPaths } from '../../openapi/index.js'
import { isRecord, methodPath } from '../../utils/index.js'

/* ─────────────────────────────── Guards ─────────────────────────────── */

const isOpenAPIPaths = (v: unknown): v is OpenAPIPaths => {
  if (!isRecord(v)) return false
  for (const k in v) {
    if (!isRecord(v[k])) return false
  }
  return true
}

/* ─────────────────────────────── Formatters ─────────────────────────────── */

const esc = (s: string) => s.replace(/\\/g, '\\\\').replace(/'/g, "\\'")

/** Check if a string is a valid JavaScript identifier */
const isValidIdent = (s: string): boolean => /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(s)

/**
 * Format result containing paths for both runtime and type expressions.
 */
type FormatPathResult = {
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
 */
const formatPath = (p: string): FormatPathResult => {
  if (p === '/') {
    return {
      runtimePath: '.index',
      typeofPrefix: '.index',
      bracketSuffix: '',
      hasBracket: false,
    }
  }

  const segs = p.replace(/^\/+/, '').split('/').filter(Boolean)

  // Convert {param} to :param (handles both full segments like {id} and partial like {Sid}.json)
  const honoSegs = segs.map((seg) => seg.replace(/\{([^}]+)\}/g, ':$1'))

  // Find the first segment that needs bracket notation
  const firstBracketIdx = honoSegs.findIndex((seg) => !isValidIdent(seg))
  const hasBracket = firstBracketIdx !== -1

  // Runtime path: mixed notation (current behavior)
  const runtimeParts = honoSegs.map((seg) => (isValidIdent(seg) ? `.${seg}` : `['${esc(seg)}']`))
  const runtimePath = runtimeParts.join('')

  // For type expression: split at first bracket
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

type RefObject = { $ref: string }
const isRefObject = (v: unknown): v is RefObject => isRecord(v) && typeof v.$ref === 'string'

type ParameterLike = {
  name: string
  in: 'path' | 'query' | 'header' | 'cookie'
  required?: boolean
}
const isParameterObject = (v: unknown): v is ParameterLike => {
  if (!isRecord(v)) return false
  if (typeof v.name !== 'string') return false
  const pos = v.in
  return pos === 'path' || pos === 'query' || pos === 'header' || pos === 'cookie'
}

const refParamName = (refLike: unknown): string | undefined => {
  const ref =
    typeof refLike === 'string' ? refLike : isRefObject(refLike) ? refLike.$ref : undefined
  const m = ref?.match(/^#\/components\/parameters\/(.+)$/)
  return m ? m[1] : undefined
}

const createResolveParameter =
  (componentsParameters: Record<string, unknown>) =>
  (p: unknown): ParameterLike | undefined => {
    if (isParameterObject(p)) return p
    const name = refParamName(p)
    const cand = name ? componentsParameters[name] : undefined
    return isParameterObject(cand) ? cand : undefined
  }

const createToParameterLikes =
  (resolveParam: (p: unknown) => ParameterLike | undefined) =>
  (arr?: unknown): ParameterLike[] =>
    Array.isArray(arr) ? arr.map((x) => resolveParam(x)).filter((param) => param !== undefined) : []

/* ─────────────────────────────── RequestBody schema pick ─────────────────────────────── */

type OperationLike = {
  summary?: string
  description?: string
  parameters?: unknown
  requestBody?: unknown
  responses?: unknown
}
const isOperationLike = (v: unknown): v is OperationLike => isRecord(v) && 'responses' in v

type PathItemLike = {
  parameters?: unknown
} & { [M in HttpMethod]?: OperationLike | undefined }

type HttpMethod = 'get' | 'put' | 'post' | 'delete' | 'options' | 'head' | 'patch' | 'trace'
const HTTP_METHODS: readonly HttpMethod[] = [
  'get',
  'put',
  'post',
  'delete',
  'options',
  'head',
  'patch',
  'trace',
]

type OperationCode = {
  readonly funcName: string
  readonly code: string
  readonly hasArgs: boolean
}

const hasSchemaProp = (v: unknown): v is { schema?: unknown } => isRecord(v) && 'schema' in v

/** Body info for tracking request body presence */
type BodyInfo = { contentType: string }

/** Extract requestBody name from $ref like "#/components/requestBodies/CreateProduct" */
const refRequestBodyName = (refLike: unknown): string | undefined => {
  const ref =
    typeof refLike === 'string' ? refLike : isRefObject(refLike) ? refLike.$ref : undefined
  const m = ref?.match(/^#\/components\/requestBodies\/(.+)$/)
  return m ? m[1] : undefined
}

type AllBodyInfo = { form: BodyInfo[]; json: BodyInfo[] }

/**
 * Collect all body infos from content to handle multiple content-types.
 * Groups by body key ('form' or 'json') with union types.
 */
const pickAllBodyInfoFromContent = (content: unknown): AllBodyInfo | undefined => {
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

const createPickAllBodyInfo =
  (componentsRequestBodies: Record<string, unknown>) =>
  (op: OperationLike): AllBodyInfo | undefined => {
    const rb = op.requestBody
    if (!isRecord(rb)) return undefined

    // Handle $ref to components/requestBodies
    const refName = refRequestBodyName(rb)
    if (refName) {
      const resolved = componentsRequestBodies[refName]
      if (isRecord(resolved) && isRecord(resolved.content)) {
        return pickAllBodyInfoFromContent(resolved.content)
      }
      // If $ref exists but can't resolve content, still consider it has a body
      if (resolved !== undefined) return { form: [], json: [{ contentType: 'application/json' }] }
      return undefined
    }

    // Direct inline requestBody
    return pickAllBodyInfoFromContent(rb.content)
  }

/* ─────────────────────────────── Single-operation generator ─────────────────────────────── */

type GeneratedOperation = { code: string; hasArgs: boolean } | null

const generateOperationCode = (
  pathStr: string,
  method: HttpMethod,
  item: PathItemLike,
  deps: {
    client: string
    toParameterLikes: (arr?: unknown) => ParameterLike[]
    pickAllBodyInfo: (op: OperationLike) => AllBodyInfo | undefined
  },
): GeneratedOperation => {
  const op = item[method]
  if (!isOperationLike(op)) return null

  const funcName = methodPath(method, pathStr)
  const { runtimePath, typeofPrefix, bracketSuffix, hasBracket } = formatPath(pathStr)

  const pathLevelParams = deps.toParameterLikes(item.parameters)
  const opParams = deps.toParameterLikes(op.parameters)

  const allParams = [...pathLevelParams, ...opParams]
  const pathParams = allParams.filter((p) => p.in === 'path')
  const queryParams = allParams.filter((p) => p.in === 'query')
  const headerParams = allParams.filter((p) => p.in === 'header')
  const cookieParams = allParams.filter((p) => p.in === 'cookie')

  const allBodyInfo = deps.pickAllBodyInfo(op)
  const hasBody =
    allBodyInfo !== undefined && (allBodyInfo.form.length > 0 || allBodyInfo.json.length > 0)
  const hasArgs =
    pathParams.length > 0 ||
    queryParams.length > 0 ||
    headerParams.length > 0 ||
    cookieParams.length > 0 ||
    hasBody

  // For runtime calls, always use dot notation for method access
  const methodAccess = `.$${method}`

  // For InferRequestType, handle bracket notation properly:
  // - No bracket: `typeof client.users.$get`
  // - With bracket: `(typeof client.users)[':id']['avatar']['$post']`
  const inferType = hasBracket
    ? `InferRequestType<(typeof ${deps.client}${typeofPrefix})${bracketSuffix}['$${method}']>`
    : `InferRequestType<typeof ${deps.client}${runtimePath}.$${method}>`

  const argSig = hasArgs
    ? `args:${inferType},options?:ClientRequestOptions`
    : 'options?:ClientRequestOptions'
  const call = hasArgs
    ? `${deps.client}${runtimePath}${methodAccess}(args,options)`
    : `${deps.client}${runtimePath}${methodAccess}(undefined,options)`

  const summary = typeof op.summary === 'string' ? op.summary : ''
  const description = typeof op.description === 'string' ? op.description : ''
  // Format multiline description with JSDoc prefix on each line
  const formatJsDocLines = (text: string): string[] =>
    text
      .trimEnd()
      .split('\n')
      .map((line) => ` * ${line}`)
  // Escape /* in path to avoid oxfmt regex parsing issue (/* looks like /regex/)
  const safePathStr = pathStr.replace(/\/\*/g, '/[*]')
  const docs = [
    '/**',
    ` * ${method.toUpperCase()} ${safePathStr}`,
    ...(summary ? [' *', ...formatJsDocLines(summary)] : []),
    ...(description ? [' *', ...formatJsDocLines(description)] : []),
    ' */',
  ].join('\n')

  const func = `export async function ${funcName}(${argSig}){return await ${call}}`

  return { code: `${docs}\n${func}`, hasArgs }
}

/**
 * Builds operation codes from OpenAPI paths.
 *
 * Iterates through all HTTP methods for each path and generates
 * typed RPC client wrapper functions.
 *
 * @param paths - OpenAPI paths object
 * @param deps - Dependencies including client name and parameter utilities
 * @returns Array of operation codes with function names and generated code
 */
const makeOperationCodes = (
  paths: OpenAPIPaths,
  deps: {
    client: string
    toParameterLikes: (arr?: unknown) => ParameterLike[]
    pickAllBodyInfo: (op: OperationLike) => AllBodyInfo | undefined
  },
): OperationCode[] =>
  Object.entries(paths)
    .filter((entry): entry is [string, Record<string, unknown>] => isRecord(entry[1]))
    .flatMap(([p, rawItem]) => {
      const pathItem: PathItemLike = {
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

      return HTTP_METHODS.map((method) => {
        const result = generateOperationCode(p, method, pathItem, deps)
        return result
          ? { funcName: methodPath(method, p), code: result.code, hasArgs: result.hasArgs }
          : null
      }).filter((item): item is OperationCode => item !== null)
    })

/* ─────────────────────────────── Split ─────────────────────────────── */

const resolveSplitOutDir = (output: string) => {
  const looksLikeFile = output.endsWith('.ts')
  const outDir = looksLikeFile ? path.dirname(output) : output
  const indexPath = path.join(outDir, 'index.ts')
  return { outDir, indexPath }
}

/* ─────────────────────────────── Entry ─────────────────────────────── */

/**
 * Generates RPC client wrapper functions from OpenAPI specification.
 *
 * Creates type-safe client functions that wrap Hono RPC client calls,
 * with proper TypeScript types derived from OpenAPI schemas.
 *
 * ```mermaid
 * flowchart LR
 *   subgraph "Generated Code"
 *     A["export async function getUsers(params) { return await client.users.$get(params) }"]
 *   end
 *   subgraph "Usage"
 *     B["const users = await getUsers({ query: { limit: 10 } })"]
 *   end
 *   A --> B
 * ```
 *
 * @param openAPI - Parsed OpenAPI specification
 * @param output - Output file path or directory
 * @param importPath - Import path for the Hono client
 * @param split - Whether to split into multiple files (one per operation)
 * @returns Promise resolving to success message or error
 *
 * @example
 * ```ts
 * // Single file output
 * await rpc(openAPI, 'src/rpc.ts', './client')
 * // Generates: src/rpc.ts with all RPC functions
 *
 * // Split mode output
 * await rpc(openAPI, 'src/rpc', './client', true)
 * // Generates: src/rpc/getUsers.ts, src/rpc/postUsers.ts, src/rpc/index.ts
 * ```
 */
/**
 * Generates the import header for RPC client files.
 *
 * @param importPath - The import path for the Hono client
 * @param needsInferRequestType - Whether InferRequestType import is needed
 * @returns Import header string
 */
const makeHeader = (importPath: string, needsInferRequestType: boolean): string => {
  const typeImports = needsInferRequestType
    ? 'InferRequestType,ClientRequestOptions'
    : 'ClientRequestOptions'
  return `import type{${typeImports}}from'hono/client'\nimport{client}from'${importPath}'\n\n`
}

export async function rpc(
  openAPI: OpenAPI,
  output: string | `${string}.ts`,
  importPath: string,
  split?: boolean,
): Promise<
  { readonly ok: true; readonly value: string } | { readonly ok: false; readonly error: string }
> {
  const client = 'client'

  const pathsMaybe = openAPI.paths
  if (!isOpenAPIPaths(pathsMaybe)) {
    return { ok: false, error: 'Invalid OpenAPI paths' }
  }

  const componentsParameters = openAPI.components?.parameters ?? {}
  const componentsRequestBodies = openAPI.components?.requestBodies ?? {}
  const resolveParameter = createResolveParameter(componentsParameters)
  const toParameterLikes = createToParameterLikes(resolveParameter)
  const pickAllBodyInfo = createPickAllBodyInfo(componentsRequestBodies)

  const deps = {
    client,
    toParameterLikes,
    pickAllBodyInfo,
  }

  const operationCodes = makeOperationCodes(pathsMaybe, deps)

  // Non-split: write single file
  if (!split) {
    const body = operationCodes.map(({ code }) => code).join('\n\n')
    const needsInferRequestType = operationCodes.some(({ hasArgs }) => hasArgs)
    const header = makeHeader(importPath, needsInferRequestType)
    const code = `${header}${body}${operationCodes.length ? '\n' : ''}`
    const coreResult = await core(code, path.dirname(output), output)
    if (!coreResult.ok) return { ok: false, error: coreResult.error }
    return { ok: true, value: `Generated rpc code written to ${output}` }
  }

  // Split: write each file + index.ts (barrel) in parallel
  const { outDir, indexPath } = resolveSplitOutDir(output)

  const exportLines = Array.from(
    new Set(operationCodes.map(({ funcName }) => `export * from './${funcName}'`)),
  )
  const index = `${exportLines.join('\n')}\n`

  const allResults = await Promise.all([
    ...operationCodes.map(({ funcName, code, hasArgs }) => {
      const header = makeHeader(importPath, hasArgs)
      const fileSrc = `${header}${code}\n`
      const filePath = path.join(outDir, `${funcName}.ts`)
      return core(fileSrc, path.dirname(filePath), filePath)
    }),
    core(index, path.dirname(indexPath), indexPath),
  ])

  const firstError = allResults.find((r) => !r.ok)
  if (firstError) return firstError
  return {
    ok: true,
    value: `Generated rpc code written to ${outDir}/*.ts (index.ts included)`,
  }
}
