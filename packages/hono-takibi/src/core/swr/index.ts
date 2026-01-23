/**
 * SWR hook generation module.
 *
 * Generates type-safe SWR hooks from OpenAPI specifications
 * for use with Hono's RPC client.
 *
 * - GET operations generate `useSWR` hooks
 * - POST/PUT/DELETE/PATCH operations generate `useSWRMutation` hooks
 *
 * ```mermaid
 * flowchart TD
 *   A["swr(openAPI, output, importPath, split)"] --> B["Parse OpenAPI paths"]
 *   B --> C["Build hook codes"]
 *   C --> D{"split mode?"}
 *   D -->|No| E["Write single file"]
 *   D -->|Yes| F["Write per-hook files"]
 *   F --> G["Write index.ts barrel"]
 * ```
 *
 * @module core/swr
 * @link https://swr.vercel.app/
 * @link https://hono.dev/docs/guides/rpc
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

type HookCode = {
  readonly hookName: string
  readonly code: string
  readonly isQuery: boolean
  readonly hasArgs: boolean
}

const hasSchemaProp = (v: unknown): v is { schema?: unknown } => isRecord(v) && 'schema' in v

type BodyInfo = { contentType: string }

const refRequestBodyName = (refLike: unknown): string | undefined => {
  const ref =
    typeof refLike === 'string' ? refLike : isRefObject(refLike) ? refLike.$ref : undefined
  const m = ref?.match(/^#\/components\/requestBodies\/(.+)$/)
  return m ? m[1] : undefined
}

type AllBodyInfo = { form: BodyInfo[]; json: BodyInfo[] }

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

/* ─────────────────────────────── Hook Name Generation ─────────────────────────────── */

/**
 * Convert method + path to hook name (e.g., "get" + "/users" -> "useGetUsers")
 */
const toHookName = (method: string, pathStr: string): string => {
  const funcName = methodPath(method, pathStr)
  return `use${funcName.charAt(0).toUpperCase()}${funcName.slice(1)}`
}

/**
 * Convert method + path to key getter name (e.g., "get" + "/users" -> "getGetUsersKey")
 */
const toKeyGetterName = (method: string, pathStr: string): string => {
  const funcName = methodPath(method, pathStr)
  return `get${funcName.charAt(0).toUpperCase()}${funcName.slice(1)}Key`
}

/* ─────────────────────────────── Single-hook generator ─────────────────────────────── */

type GeneratedHook = { code: string; isQuery: boolean; hasArgs: boolean } | null

const generateHookCode = (
  pathStr: string,
  method: HttpMethod,
  item: PathItemLike,
  deps: {
    client: string
    toParameterLikes: (arr?: unknown) => ParameterLike[]
    pickAllBodyInfo: (op: OperationLike) => AllBodyInfo | undefined
  },
): GeneratedHook => {
  const op = item[method]
  if (!isOperationLike(op)) return null

  const hookName = toHookName(method, pathStr)
  const keyGetterName = toKeyGetterName(method, pathStr)
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

  // Determine if this is a query (GET) or mutation (POST/PUT/DELETE/PATCH)
  const isQuery = method === 'get'

  // Build type expressions
  const inferRequestType = hasBracket
    ? `InferRequestType<(typeof ${deps.client}${typeofPrefix})${bracketSuffix}['$${method}']>`
    : `InferRequestType<typeof ${deps.client}${runtimePath}.$${method}>`

  const inferResponseType = hasBracket
    ? `InferResponseType<(typeof ${deps.client}${typeofPrefix})${bracketSuffix}['$${method}']>`
    : `InferResponseType<typeof ${deps.client}${runtimePath}.$${method}>`

  // Convert {param} to :param for key path display
  const honoPath = pathStr.replace(/\{([^}]+)\}/g, ':$1')
  // Escape /* in path to avoid oxfmt regex parsing issue
  const safePathStr = pathStr.replace(/\/\*/g, '/[*]')

  const summary = typeof op.summary === 'string' ? op.summary : ''
  const description = typeof op.description === 'string' ? op.description : ''
  const formatJsDocLines = (text: string): string[] =>
    text
      .trimEnd()
      .split('\n')
      .map((line) => ` * ${line}`)

  const docs = [
    '/**',
    ` * ${method.toUpperCase()} ${safePathStr}`,
    ...(summary ? [' *', ...formatJsDocLines(summary)] : []),
    ...(description ? [' *', ...formatJsDocLines(description)] : []),
    ' */',
  ].join('\n')

  const keyDocs = [
    '/**',
    ` * Generates SWR cache key for ${method.toUpperCase()} ${safePathStr}`,
    ' */',
  ].join('\n')

  let hookCode: string
  let keyGetterCode: string

  if (isQuery) {
    // useSWR hook for GET
    const argsSig = hasArgs ? `args:${inferRequestType},` : ''
    const optionsSig = `options?:{swr?:SWRConfiguration<${inferResponseType},Error>;client?:ClientRequestOptions;enabled?:boolean}`
    const keyExpr = hasArgs
      ? `options?.enabled!==false?['GET','${honoPath}',args]as const:null`
      : `options?.enabled!==false?['GET','${honoPath}']as const:null`
    const clientCall = hasArgs
      ? `${deps.client}${runtimePath}.$${method}(args,options?.client)`
      : `${deps.client}${runtimePath}.$${method}(undefined,options?.client)`

    hookCode = `${docs}
export function ${hookName}(${argsSig}${optionsSig}){const key=${keyExpr};return useSWR<${inferResponseType},Error>(key,async()=>parseResponse(${clientCall}),options?.swr)}`

    // Key getter for GET
    if (hasArgs) {
      keyGetterCode = `${keyDocs}
export function ${keyGetterName}(args:${inferRequestType}){return['GET','${honoPath}',args]as const}`
    } else {
      keyGetterCode = `${keyDocs}
export function ${keyGetterName}(){return['GET','${honoPath}']as const}`
    }
  } else {
    // useSWRMutation hook for POST/PUT/DELETE/PATCH
    const methodUpper = method.toUpperCase()
    const mutationKey = `'${methodUpper} ${honoPath}'`

    if (hasArgs) {
      const optionsSig = `options?:{swr?:SWRMutationConfiguration<${inferResponseType},Error,string,${inferRequestType}>;client?:ClientRequestOptions}`
      hookCode = `${docs}
export function ${hookName}(${optionsSig}){return useSWRMutation<${inferResponseType},Error,string,${inferRequestType}>(${mutationKey},async(_,{arg})=>parseResponse(${deps.client}${runtimePath}.$${method}(arg,options?.client)),options?.swr)}`
    } else {
      const optionsSig = `options?:{swr?:SWRMutationConfiguration<${inferResponseType},Error,string,void>;client?:ClientRequestOptions}`
      hookCode = `${docs}
export function ${hookName}(${optionsSig}){return useSWRMutation<${inferResponseType},Error,string,void>(${mutationKey},async()=>parseResponse(${deps.client}${runtimePath}.$${method}(undefined,options?.client)),options?.swr)}`
    }

    // No key getter for mutations - use GET key getters for cache revalidation
    keyGetterCode = ''
  }

  const code = keyGetterCode ? `${hookCode}\n\n${keyGetterCode}` : hookCode
  return { code, isQuery, hasArgs }
}

/**
 * Builds hook codes from OpenAPI paths.
 */
const makeHookCodes = (
  paths: OpenAPIPaths,
  deps: {
    client: string
    toParameterLikes: (arr?: unknown) => ParameterLike[]
    pickAllBodyInfo: (op: OperationLike) => AllBodyInfo | undefined
  },
): HookCode[] =>
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
        const result = generateHookCode(p, method, pathItem, deps)
        return result
          ? {
              hookName: toHookName(method, p),
              code: result.code,
              isQuery: result.isQuery,
              hasArgs: result.hasArgs,
            }
          : null
      }).filter((item): item is HookCode => item !== null)
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
 * Generates the import header for SWR hook files.
 *
 * @param importPath - The import path for the Hono client
 * @param hasQuery - Whether any query (useSWR) hooks exist
 * @param hasMutation - Whether any mutation (useSWRMutation) hooks exist
 * @param needsInferRequestType - Whether InferRequestType import is needed
 * @param clientName - The name of the client to import (default: 'client')
 * @returns Import header string
 */
const makeHeader = (
  importPath: string,
  hasQuery: boolean,
  hasMutation: boolean,
  needsInferRequestType: boolean,
  clientName: string,
): string => {
  const lines: string[] = []

  // SWR imports
  if (hasQuery) {
    lines.push("import useSWR from'swr'")
    lines.push("import type{SWRConfiguration}from'swr'")
  }
  if (hasMutation) {
    lines.push("import useSWRMutation from'swr/mutation'")
    lines.push("import type{SWRMutationConfiguration}from'swr/mutation'")
  }

  // Hono client imports
  const typeImports = needsInferRequestType
    ? 'InferRequestType,InferResponseType,ClientRequestOptions'
    : 'InferResponseType,ClientRequestOptions'
  lines.push(`import type{${typeImports}}from'hono/client'`)
  lines.push("import{parseResponse}from'hono/client'")
  lines.push(`import{${clientName}}from'${importPath}'`)

  return `${lines.join('\n')}\n\n`
}

/**
 * Generates SWR hooks from OpenAPI specification.
 *
 * Creates type-safe SWR hooks that wrap Hono RPC client calls,
 * with proper TypeScript types derived from OpenAPI schemas.
 *
 * - GET operations generate `useSWR` hooks
 * - POST/PUT/DELETE/PATCH operations generate `useSWRMutation` hooks
 *
 * ```mermaid
 * flowchart LR
 *   subgraph "Generated Code"
 *     A["export function useGetUsers(...) { return useSWR(...) }"]
 *   end
 *   subgraph "Usage"
 *     B["const { data, error } = useGetUsers({ query: { limit: 10 } })"]
 *   end
 *   A --> B
 * ```
 *
 * @param openAPI - Parsed OpenAPI specification
 * @param output - Output file path or directory
 * @param importPath - Import path for the Hono client
 * @param split - Whether to split into multiple files (one per hook)
 * @param clientName - Name of the client export (default: 'client')
 * @returns Promise resolving to success message or error
 *
 * @example
 * ```ts
 * // Single file output
 * await swr(openAPI, 'src/hooks.ts', './client')
 * // Generates: src/hooks.ts with all SWR hooks
 *
 * // Split mode output
 * await swr(openAPI, 'src/hooks', './client', true)
 * // Generates: src/hooks/useGetUsers.ts, src/hooks/usePostUsers.ts, src/hooks/index.ts
 * ```
 */
export async function swr(
  openAPI: OpenAPI,
  output: string | `${string}.ts`,
  importPath: string,
  split?: boolean,
  clientName = 'client',
): Promise<
  { readonly ok: true; readonly value: string } | { readonly ok: false; readonly error: string }
> {
  const client = clientName

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

  const hookCodes = makeHookCodes(pathsMaybe, deps)

  // Non-split: write single file
  if (!split) {
    const body = hookCodes.map(({ code }) => code).join('\n\n')
    const hasQuery = hookCodes.some(({ isQuery }) => isQuery)
    const hasMutation = hookCodes.some(({ isQuery }) => !isQuery)
    const needsInferRequestType = hookCodes.some(({ hasArgs }) => hasArgs)
    const header = makeHeader(importPath, hasQuery, hasMutation, needsInferRequestType, client)
    const code = `${header}${body}${hookCodes.length ? '\n' : ''}`
    const coreResult = await core(code, path.dirname(output), output)
    if (!coreResult.ok) return { ok: false, error: coreResult.error }
    return { ok: true, value: `Generated swr hooks written to ${output}` }
  }

  // Split: write each file + index.ts (barrel) in parallel
  const { outDir, indexPath } = resolveSplitOutDir(output)

  const exportLines = Array.from(
    new Set(hookCodes.map(({ hookName }) => `export * from './${hookName}'`)),
  )
  const index = `${exportLines.join('\n')}\n`

  const allResults = await Promise.all([
    ...hookCodes.map(({ hookName, code, isQuery, hasArgs }) => {
      const hasQueryFile = isQuery
      const hasMutationFile = !isQuery
      const header = makeHeader(importPath, hasQueryFile, hasMutationFile, hasArgs, client)
      const fileSrc = `${header}${code}\n`
      const filePath = path.join(outDir, `${hookName}.ts`)
      return core(fileSrc, path.dirname(filePath), filePath)
    }),
    core(index, path.dirname(indexPath), indexPath),
  ])

  const firstError = allResults.find((r) => !r.ok)
  if (firstError) return firstError
  return {
    ok: true,
    value: `Generated swr hooks written to ${outDir}/*.ts (index.ts included)`,
  }
}
