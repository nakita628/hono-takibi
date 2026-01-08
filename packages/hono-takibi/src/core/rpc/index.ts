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
 */
import path from 'node:path'
import { core } from '../../helper/index.js'
import type { OpenAPI, OpenAPIPaths, Schema } from '../../openapi/index.js'
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
 * Format path for Hono RPC access (both type and runtime).
 * Hono hc client uses PathToChain which splits paths by '/'.
 *
 * Rules:
 * - '/' -> '.index'
 * - Single segment with valid identifier -> dot notation: '/pet' -> '.pet'
 * - All other cases -> each segment becomes bracket access: '/files/upload' -> "['files']['upload']"
 * - Path params converted: '/files/{fileId}' -> "['files'][':fileId']"
 */
const formatPath = (p: string): string => {
  if (p === '/') return '.index'

  const segs = p.replace(/^\/+/, '').split('/').filter(Boolean)

  // Convert {param} to :param
  const honoSegs = segs.map((seg) =>
    seg.startsWith('{') && seg.endsWith('}') ? `:${seg.slice(1, -1)}` : seg,
  )

  // Single segment with valid identifier: use dot notation
  if (honoSegs.length === 1 && isValidIdent(honoSegs[0])) {
    return `.${honoSegs[0]}`
  }

  // All other cases: each segment becomes separate bracket access
  return honoSegs.map((seg) => `['${esc(seg)}']`).join('')
}

/* ─────────────────────────────── Parameters ($ref) ─────────────────────────────── */

type RefObject = { $ref: string }
const isRefObject = (v: unknown): v is RefObject => isRecord(v) && typeof v.$ref === 'string'

type ParameterLike = {
  name: string
  in: 'path' | 'query' | 'header' | 'cookie'
  required?: boolean
  schema?: Schema
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
}

const hasSchemaProp = (v: unknown): v is { schema?: unknown } => isRecord(v) && 'schema' in v

/** Extract requestBody name from $ref like "#/components/requestBodies/CreateProduct" */
const refRequestBodyName = (refLike: unknown): string | undefined => {
  const ref =
    typeof refLike === 'string' ? refLike : isRefObject(refLike) ? refLike.$ref : undefined
  const m = ref?.match(/^#\/components\/requestBodies\/(.+)$/)
  return m ? m[1] : undefined
}

const pickBodySchemaFromContent = (content: unknown): Schema | undefined => {
  if (!isRecord(content)) return undefined
  const order = [
    'application/json',
    'application/*+json',
    'application/xml',
    'application/x-www-form-urlencoded',
    'multipart/form-data',
    'application/octet-stream',
  ]
  for (const k of order) {
    const media = isRecord(content[k]) ? content[k] : undefined
    if (hasSchemaProp(media) && isRecord(media.schema)) return media.schema
  }
  return undefined
}

const createPickBodySchema =
  (componentsRequestBodies: Record<string, unknown>) =>
  (op: OperationLike): Schema | undefined => {
    const rb = op.requestBody
    if (!isRecord(rb)) return undefined

    // Handle $ref to components/requestBodies
    const refName = refRequestBodyName(rb)
    if (refName) {
      const resolved = componentsRequestBodies[refName]
      if (isRecord(resolved) && isRecord(resolved.content)) {
        return pickBodySchemaFromContent(resolved.content)
      }
      // If $ref exists but can't resolve content, still consider it has a body
      if (resolved !== undefined) return {} // Empty schema indicates body exists
      return undefined
    }

    // Direct inline requestBody
    return pickBodySchemaFromContent(rb.content)
  }

/* ─────────────────────────────── Single-operation generator ─────────────────────────────── */

const generateOperationCode = (
  pathStr: string,
  method: HttpMethod,
  item: PathItemLike,
  deps: {
    client: string
    toParameterLikes: (arr?: unknown) => ParameterLike[]
    pickBodySchema: (op: OperationLike) => Schema | undefined
  },
): string => {
  const op = item[method]
  if (!isOperationLike(op)) return ''

  const funcName = methodPath(method, pathStr)
  const pathAccess = formatPath(pathStr)

  const pathLevelParams = deps.toParameterLikes(item.parameters)
  const opParams = deps.toParameterLikes(op.parameters)

  const allParams = [...pathLevelParams, ...opParams]
  const pathParams = allParams.filter((p) => p.in === 'path')
  const queryParams = allParams.filter((p) => p.in === 'query')

  const bodySchema = deps.pickBodySchema(op)
  const hasBody = bodySchema !== undefined
  const hasArgs = pathParams.length > 0 || queryParams.length > 0 || hasBody

  // Use unified path format for both type and runtime
  const hasBracket = pathAccess.includes('[')
  const methodAccess = hasBracket ? `['$${method}']` : `.$${method}`

  // For type inference, use (typeof client) with brackets when path has brackets
  const inferType = hasBracket
    ? `InferRequestType<(typeof ${deps.client})${pathAccess}${methodAccess}>`
    : `InferRequestType<typeof ${deps.client}${pathAccess}${methodAccess}>`
  const argSig = hasArgs ? `arg:${inferType}` : ''
  const call = hasArgs
    ? `${deps.client}${pathAccess}${methodAccess}(arg)`
    : `${deps.client}${pathAccess}${methodAccess}()`

  const summary = typeof op.summary === 'string' ? op.summary : ''
  const description = typeof op.description === 'string' ? op.description : ''
  const docs = [
    '/**',
    ` * ${method.toUpperCase()} ${pathStr}`,
    ...(summary ? [' *', ` * ${summary.trimEnd()}`] : []),
    ...(description ? [' *', ` * ${description.trimEnd()}`] : []),
    ' */',
  ].join('\n')

  const func = `export async function ${funcName}(${argSig}){return await ${call}}`

  return `${docs}\n${func}`
}

const buildOperationCodes = (
  paths: OpenAPIPaths,
  deps: {
    client: string
    toParameterLikes: (arr?: unknown) => ParameterLike[]
    pickBodySchema: (op: OperationLike) => Schema | undefined
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
        const code = generateOperationCode(p, method, pathItem, deps)
        return code ? { funcName: methodPath(method, p), code } : null
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
const buildHeader = (importPath: string, usesInferRequestType: boolean): string => {
  const inferImport = usesInferRequestType ? `import type{InferRequestType}from'hono/client'\n` : ''
  return `${inferImport}import{client}from'${importPath}'\n\n`
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
  const pickBodySchema = createPickBodySchema(componentsRequestBodies)

  const deps = {
    client,
    toParameterLikes,
    pickBodySchema,
  }

  const operationCodes = buildOperationCodes(pathsMaybe, deps)

  // Non-split: write single file
  if (!split) {
    const body = operationCodes.map(({ code }) => code).join('\n\n')
    const usesInferRequestType = body.includes('InferRequestType')
    const header = buildHeader(importPath, usesInferRequestType)
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
    ...operationCodes.map(({ funcName, code }) => {
      const usesInferRequestType = code.includes('InferRequestType')
      const header = buildHeader(importPath, usesInferRequestType)
      const fileSrc = `${header}${code}\n`
      const filePath = path.join(outDir, `${funcName}.ts`)
      return core(fileSrc, path.dirname(filePath), filePath)
    }),
    core(index, path.dirname(indexPath), indexPath),
  ])

  const firstError = allResults.find((r) => !r.ok)
  if (firstError && !firstError.ok) return { ok: false, error: firstError.error }
  return {
    ok: true,
    value: `Generated rpc code written to ${outDir}/*.ts (index.ts included)`,
  }
}
