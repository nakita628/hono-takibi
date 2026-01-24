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
import type { HttpMethod, OperationDeps, OperationLike, PathItemLike } from '../../helper/index.js'
import {
  buildInferRequestType,
  buildInferResponseType,
  buildOperationDocs,
  core,
  createOperationDeps,
  formatPath,
  HTTP_METHODS,
  isOpenAPIPaths,
  isOperationLike,
  operationHasArgs,
  parsePathItem,
  resolveSplitOutDir,
} from '../../helper/index.js'
import type { OpenAPI, OpenAPIPaths } from '../../openapi/index.js'
import { isRecord, methodPath } from '../../utils/index.js'

/* ─────────────────────────────── Types ─────────────────────────────── */

type HookCode = {
  readonly hookName: string
  readonly code: string
  readonly isQuery: boolean
  readonly hasArgs: boolean
}

type GeneratedHook = { code: string; isQuery: boolean; hasArgs: boolean } | null

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

/**
 * Builds fetcher expression using parseResponse.
 *
 * parseResponse automatically throws DetailedError for non-OK responses,
 * so no explicit error handling is needed.
 *
 * @see https://github.com/honojs/hono/pull/4314
 * @param clientCall - Client method call expression
 * @returns Fetcher function body
 */
const buildFetcher = (clientCall: string): string => `parseResponse(${clientCall})`

const makeHookCode = (
  pathStr: string,
  method: HttpMethod,
  item: PathItemLike,
  deps: OperationDeps,
): GeneratedHook => {
  const op = item[method]
  if (!isOperationLike(op)) return null

  const hookName = toHookName(method, pathStr)
  const keyGetterName = toKeyGetterName(method, pathStr)
  const pathResult = formatPath(pathStr)
  const hasArgs = operationHasArgs(item, op, deps)
  const isQuery = method === 'get'

  const inferRequestType = buildInferRequestType(deps.client, pathResult, method)

  // Convert {param} to :param for key path display
  const honoPath = pathStr.replace(/\{([^}]+)\}/g, ':$1')

  const summary = typeof op.summary === 'string' ? op.summary : ''
  const description = typeof op.description === 'string' ? op.description : ''
  const docs = buildOperationDocs(method, pathStr, summary || undefined, description || undefined)

  const keyDocs = [
    '/**',
    ` * Generates SWR cache key for ${method.toUpperCase()} ${pathStr.replace(/\/\*/g, '/[*]')}`,
    ' */',
  ].join('\n')

  let hookCode: string
  let keyGetterCode: string

  if (isQuery) {
    // useSWR hook for GET (Orval-style pattern)
    const argsSig = hasArgs ? `args:${inferRequestType},` : ''
    const swrConfigType = 'SWRConfiguration&{swrKey?:Key;enabled?:boolean}'
    const optionsSig = `options?:{swr?:${swrConfigType};client?:ClientRequestOptions}`

    const keyGetterCall = hasArgs ? `${keyGetterName}(args)` : `${keyGetterName}()`
    const clientCall = hasArgs
      ? `${deps.client}${pathResult.runtimePath}.$${method}(args,clientOptions)`
      : `${deps.client}${pathResult.runtimePath}.$${method}(undefined,clientOptions)`
    const fetcherBody = buildFetcher(clientCall)

    hookCode = `${docs}
export function ${hookName}(${argsSig}${optionsSig}){const{swr:swrOptions,client:clientOptions}=options??{};const isEnabled=swrOptions?.enabled!==false;const swrKey=swrOptions?.swrKey??(isEnabled?${keyGetterCall}:null);return{swrKey,...useSWR(swrKey,async()=>${fetcherBody},swrOptions)}}`

    // Key getter for GET (orval style: optional args with conditional spread)
    if (hasArgs) {
      keyGetterCode = `${keyDocs}
export function ${keyGetterName}(args?:${inferRequestType}){return['${honoPath}',...(args?[args]:[])]as const}`
    } else {
      keyGetterCode = `${keyDocs}
export function ${keyGetterName}(){return['${honoPath}']as const}`
    }
  } else {
    // useSWRMutation hook for POST/PUT/DELETE/PATCH
    const methodUpper = method.toUpperCase()
    const mutationKey = `'${methodUpper} ${honoPath}'`

    if (hasArgs) {
      const clientCall = `${deps.client}${pathResult.runtimePath}.$${method}(arg,options?.client)`
      const fetcherBody = buildFetcher(clientCall)
      const optionsSig = `options?:{client?:ClientRequestOptions}`
      hookCode = `${docs}
export function ${hookName}(${optionsSig}){return useSWRMutation(${mutationKey},async(_:string,{arg}:{arg:${inferRequestType}})=>${fetcherBody})}`
    } else {
      const clientCall = `${deps.client}${pathResult.runtimePath}.$${method}(undefined,options?.client)`
      const fetcherBody = buildFetcher(clientCall)
      const optionsSig = `options?:{client?:ClientRequestOptions}`
      hookCode = `${docs}
export function ${hookName}(${optionsSig}){return useSWRMutation(${mutationKey},async()=>${fetcherBody})}`
    }

    // No key getter for mutations
    keyGetterCode = ''
  }

  const code = keyGetterCode ? `${hookCode}\n\n${keyGetterCode}` : hookCode
  return { code, isQuery, hasArgs }
}

/**
 * Builds hook codes from OpenAPI paths.
 */
const makeHookCodes = (paths: OpenAPIPaths, deps: OperationDeps): HookCode[] =>
  Object.entries(paths)
    .filter((entry): entry is [string, Record<string, unknown>] => isRecord(entry[1]))
    .flatMap(([p, rawItem]) => {
      const pathItem = parsePathItem(rawItem)
      return HTTP_METHODS.map((method) => {
        const result = makeHookCode(p, method, pathItem, deps)
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

/* ─────────────────────────────── Header ─────────────────────────────── */

/**
 * Generates the import header for SWR hook files.
 */
const makeHeader = (
  importPath: string,
  hasQuery: boolean,
  hasMutation: boolean,
  hasArgs: boolean,
  clientName: string,
): string => {
  const lines: string[] = []

  // SWR imports
  if (hasQuery) {
    lines.push("import useSWR from'swr'")
    lines.push("import type{Key,SWRConfiguration}from'swr'")
  }
  if (hasMutation) {
    lines.push("import useSWRMutation from'swr/mutation'")
  }

  // Hono client imports - InferRequestType only needed when any hook has args
  const typeImportParts: string[] = []
  if (hasArgs) typeImportParts.push('InferRequestType')
  typeImportParts.push('ClientRequestOptions')
  lines.push(`import type{${typeImportParts.join(',')}}from'hono/client'`)
  lines.push("import{parseResponse}from'hono/client'")
  lines.push(`import{${clientName}}from'${importPath}'`)

  return `${lines.join('\n')}\n\n`
}

/* ─────────────────────────────── Entry ─────────────────────────────── */

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
  const pathsMaybe = openAPI.paths
  if (!isOpenAPIPaths(pathsMaybe)) {
    return { ok: false, error: 'Invalid OpenAPI paths' }
  }

  const componentsParameters = openAPI.components?.parameters ?? {}
  const componentsRequestBodies = openAPI.components?.requestBodies ?? {}
  const deps = createOperationDeps(clientName, componentsParameters, componentsRequestBodies)

  const hookCodes = makeHookCodes(pathsMaybe, deps)

  // Non-split: write single file
  if (!split) {
    const body = hookCodes.map(({ code }) => code).join('\n\n')
    const hasQuery = hookCodes.some(({ isQuery }) => isQuery)
    const hasMutation = hookCodes.some(({ isQuery }) => !isQuery)
    const hasArgs = hookCodes.some((h) => h.hasArgs)
    const header = makeHeader(importPath, hasQuery, hasMutation, hasArgs, clientName)
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
      const header = makeHeader(importPath, hasQueryFile, hasMutationFile, hasArgs, clientName)
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
