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
import type { HttpMethod, OperationDeps, PathItemLike } from '../../helper/index.js'
import {
  buildInferRequestType,
  buildOperationDocs,
  buildParseResponseType,
  core,
  createOperationDeps,
  formatPath,
  HTTP_METHODS,
  hasNoContentResponse,
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

/**
 * Convert method + path to mutation key getter name (e.g., "put" + "/pet" -> "getPutPetMutationKey")
 */
const toMutationKeyGetterName = (method: string, pathStr: string): string => {
  const funcName = methodPath(method, pathStr)
  return `get${funcName.charAt(0).toUpperCase()}${funcName.slice(1)}MutationKey`
}

/**
 * Generates SWR key getter function code using Orval-style structured keys.
 *
 * Pattern follows Orval's conventions:
 * - [resolvedPath] for path params only
 * - [resolvedPath, query] for path + query params
 * - ['/path', query] for query params only
 *
 * This enables filter-based invalidation: mutate((key) => key[0].startsWith('/items'), ...)
 *
 * @see https://swr.vercel.app/docs/arguments
 */
const makeKeyGetterCode = (
  keyGetterName: string,
  hasArgs: boolean,
  inferRequestType: string,
  honoPath: string,
  _clientPath: string,
): string => {
  // Add space between * and / to prevent early comment termination (* / instead of */)
  const safeCommentPath = honoPath.replace(/:([^/]+)/g, '{$1}').replace(/\*\//g, '* /')
  const safeCommentPathNoParam = honoPath.replace(/\*\//g, '* /')

  // Check if path has params (e.g., /pet/:petId)
  const hasPathParams = /:([^/]+)/.test(honoPath)

  // Build resolved path template literal: /pet/:petId -> `/pet/${args.param.petId}`
  const resolvedPathTemplate = honoPath.replace(/:([^/]+)/g, '${args.param.$1}')

  // Use structured key: [resolvedPath, args]
  if (hasArgs) {
    const pathExpr = hasPathParams ? `\`${resolvedPathTemplate}\`` : `'${honoPath}'`
    return `/**
 * Generates SWR cache key for GET ${safeCommentPath}
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function ${keyGetterName}(args:${inferRequestType}){return[${pathExpr},args]as const}`
  }
  return `/**
 * Generates SWR cache key for GET ${safeCommentPathNoParam}
 * Returns structured key [path] for filter-based invalidation
 */
export function ${keyGetterName}(){return['${honoPath}']as const}`
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
  const pathResult = formatPath(pathStr)
  const hasArgs = operationHasArgs(item, op, deps)
  const isQuery = method === 'get'

  const inferRequestType = buildInferRequestType(deps.client, pathResult, method)
  // Use parseResponse return type for accurate type inference
  const parseResponseType = buildParseResponseType(deps.client, pathResult, method)
  const hasNoContent = hasNoContentResponse(op)

  // Convert {param} to :param for key path display
  const honoPath = pathStr.replace(/\{([^}]+)\}/g, ':$1')

  const summary = typeof op.summary === 'string' ? op.summary : ''
  const description = typeof op.description === 'string' ? op.description : ''
  const docs = buildOperationDocs(method, pathStr, summary || undefined, description || undefined)

  let hookCode: string

  const clientPath = `${deps.client}${pathResult.runtimePath}`

  if (isQuery) {
    // useSWR hook for GET - use key getter function with structured key
    const keyGetterName = toKeyGetterName(method, pathStr)
    const keyGetterCode = makeKeyGetterCode(keyGetterName, hasArgs, inferRequestType, honoPath, clientPath)

    const argsSig = hasArgs ? `args:${inferRequestType},` : ''
    const swrConfigType = 'SWRConfiguration&{swrKey?:Key;enabled?:boolean}'
    const optionsSig = `options?:{swr?:${swrConfigType};client?:ClientRequestOptions}`

    const keyCall = hasArgs ? `${keyGetterName}(args)` : `${keyGetterName}()`
    const clientCall = hasArgs
      ? `${clientPath}.$${method}(args,clientOptions)`
      : `${clientPath}.$${method}(undefined,clientOptions)`
    const fetcherBody = buildFetcher(clientCall)

    // Orval order: key getter → hook
    hookCode = `${keyGetterCode}

${docs}
export function ${hookName}(${argsSig}${optionsSig}){const{swr:swrOptions,client:clientOptions}=options??{};const{swrKey:customKey,enabled,...restSwrOptions}=swrOptions??{};const isEnabled=enabled!==false;const swrKey=customKey??(isEnabled?${keyCall}:null);return{swrKey,...useSWR(swrKey,async()=>${fetcherBody},restSwrOptions)}}`
  } else {
    // useSWRMutation hook for POST/PUT/DELETE/PATCH
    // Option A: Simple template key pattern
    // - Key is always fixed template (e.g., "DELETE /pet/:petId")
    // - Hook does NOT accept args as first argument
    // - All args are passed via trigger's { arg } object
    // This ensures consistency and avoids the "trap" of mixed patterns
    const methodUpper = method.toUpperCase()
    const variablesType = hasArgs ? inferRequestType : 'undefined'

    // Only add | undefined when there are 204/205 No Content responses
    const responseTypeWithUndefined = hasNoContent
      ? `${parseResponseType}|undefined`
      : parseResponseType
    const mutationConfigType = `SWRMutationConfiguration<${responseTypeWithUndefined},Error,Key,${variablesType}>`

    // Generate helper function name
    const mutationKeyGetterName = toMutationKeyGetterName(method, pathStr)

    // Safe comment path for JSDoc
    const safeCommentPath = honoPath.replace(/:([^/]+)/g, '{$1}').replace(/\*\//g, '* /')

    // SWR mutation key: [method, templatePath] to avoid collisions
    // e.g., PUT /pet and POST /pet get different keys: ['PUT', '/pet'] vs ['POST', '/pet']
    // Path params are NOT resolved since args are passed via trigger's { arg }
    const mutationKeyGetterCode = `/**
 * Generates SWR mutation key for ${methodUpper} ${safeCommentPath}
 * Returns key [method, path] to avoid collisions between different methods on same path
 */
export function ${mutationKeyGetterName}(){return['${methodUpper}','${honoPath}']as const}`

    if (hasArgs) {
      const clientCall = `${clientPath}.$${method}(arg,clientOptions)`
      const fetcherBody = buildFetcher(clientCall)

      const optionsSig = `options?:{mutation?:${mutationConfigType}&{swrKey?:Key};client?:ClientRequestOptions}`
      // Orval order: key getter → hook
      hookCode = `${mutationKeyGetterCode}

${docs}
export function ${hookName}(${optionsSig}){const{mutation:mutationOptions,client:clientOptions}=options??{};const{swrKey:customKey,...restMutationOptions}=mutationOptions??{};const swrKey=customKey??${mutationKeyGetterName}();return{swrKey,...useSWRMutation(swrKey,async(_:Key,{arg}:{arg:${inferRequestType}})=>${fetcherBody},restMutationOptions)}}`
    } else {
      // No args - key is fixed
      const clientCall = `${clientPath}.$${method}(undefined,clientOptions)`
      const fetcherBody = buildFetcher(clientCall)

      const optionsSig = `options?:{mutation?:${mutationConfigType}&{swrKey?:Key};client?:ClientRequestOptions}`
      // Orval order: key getter → hook
      hookCode = `${mutationKeyGetterCode}

${docs}
export function ${hookName}(${optionsSig}){const{mutation:mutationOptions,client:clientOptions}=options??{};const{swrKey:customKey,...restMutationOptions}=mutationOptions??{};const swrKey=customKey??${mutationKeyGetterName}();return{swrKey,...useSWRMutation(swrKey,async()=>${fetcherBody},restMutationOptions)}}`
    }
  }

  return { code: hookCode, isQuery, hasArgs }
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
 *
 * Imports include:
 * - useSWR and types from 'swr' for query hooks
 * - useSWRMutation and SWRMutationConfiguration from 'swr/mutation' for mutation hooks
 * - Hono client types (InferRequestType, InferResponseType, ClientRequestOptions)
 * - parseResponse for type-safe response handling
 */
const makeHeader = (
  importPath: string,
  hasQuery: boolean,
  hasMutation: boolean,
  hasArgs: boolean,
  clientName: string,
): string => {
  const lines: string[] = []

  // SWR imports - Key is needed for both query and mutation
  if (hasQuery) {
    lines.push("import useSWR from'swr'")
    lines.push("import type{Key,SWRConfiguration}from'swr'")
  } else if (hasMutation) {
    // Mutation needs Key type from 'swr'
    lines.push("import type{Key}from'swr'")
  }
  if (hasMutation) {
    lines.push("import useSWRMutation from'swr/mutation'")
    lines.push("import type{SWRMutationConfiguration}from'swr/mutation'")
  }

  // Hono client imports
  // InferRequestType: needed when operation has args
  // InferResponseType: no longer needed - using parseResponse return type instead
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
