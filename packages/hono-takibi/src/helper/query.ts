/**
 * Shared Query hook generation module.
 *
 * Provides common logic for generating type-safe Query hooks from OpenAPI specifications
 * for use with Hono's RPC client. Supports TanStack Query, Svelte Query, and Vue Query.
 *
 * - GET operations generate query hooks
 * - POST/PUT/DELETE/PATCH operations generate mutation hooks
 *
 * ```mermaid
 * flowchart TD
 *   A["makeQueryHooks(openAPI, output, config)"] --> B["Parse OpenAPI paths"]
 *   B --> C["Build hook codes"]
 *   C --> D{"split mode?"}
 *   D -->|No| E["Write single file"]
 *   D -->|Yes| F["Write per-hook files"]
 *   F --> G["Write index.ts barrel"]
 * ```
 *
 * @module helper/query
 * @link https://tanstack.com/query/latest
 * @link https://hono.dev/docs/guides/rpc
 */
import path from 'node:path'
import { isOpenAPIPaths, isOperationLike, isRecord } from '../guard/index.js'
import type { OpenAPI, OpenAPIPaths } from '../openapi/index.js'
import {
  capitalize,
  escapeCommentEnd,
  makeInferRequestType,
  makeOperationDocs,
  methodPath,
} from '../utils/index.js'
import {
  core,
  formatPath,
  hasNoContentResponse,
  makeOperationDeps,
  makeParseResponseType,
  operationHasArgs,
  parsePathItem,
  resolveSplitOutDir,
} from './index.js'

/* ─────────────────────────────── Hook Name Generation ─────────────────────────────── */

/**
 * Convert method + path to hook name.
 *
 * @param method - HTTP method
 * @param pathStr - API path
 * @param prefix - Hook prefix ('use' or 'create')
 * @returns Hook name (e.g., "useGetUsers" or "createGetUsers")
 */
function makeHookName(method: string, pathStr: string, prefix: string): string {
  const funcName = methodPath(method, pathStr)
  return `${prefix}${capitalize(funcName)}`
}

/* ─────────────────────────────── Fetcher Helper ─────────────────────────────── */

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
function makeFetcher(clientCall: string): string {
  return `parseResponse(${clientCall})`
}

/* ─────────────────────────────── Query Key Getter ─────────────────────────────── */

/**
 * Generates the query key getter function name.
 *
 * @param method - HTTP method
 * @param pathStr - API path
 * @param isSWR - Whether to use SWR naming (no "Query" suffix)
 * @returns Query key getter function name (e.g., "getGetUsersQueryKey" or "getGetUsersKey")
 */
function makeQueryKeyGetterName(method: string, pathStr: string, isSWR?: boolean): string {
  const funcName = methodPath(method, pathStr)
  return isSWR ? `get${capitalize(funcName)}Key` : `get${capitalize(funcName)}QueryKey`
}

/* ─────────────────────────────── Query Options Getter ─────────────────────────────── */

/**
 * Generates the query options getter function name.
 *
 * @param method - HTTP method
 * @param pathStr - API path
 * @returns Query options getter function name (e.g., "getGetUsersQueryOptions")
 */
function makeQueryOptionsGetterName(method: string, pathStr: string): string {
  const funcName = methodPath(method, pathStr)
  return `get${capitalize(funcName)}QueryOptions`
}

/**
 * Generates query key getter function code using structured keys.
 *
 * Pattern: ['prefix', 'GET', '/full/path', args?]
 * - prefix: First path segment for prefix filtering (e.g., 'pet')
 * - method: HTTP method for method filtering (e.g., 'GET')
 * - path: Full path for uniqueness (e.g., '/pet/findByStatus')
 * - args: Request arguments when present
 *
 * This enables consistent filtering:
 * - All pet: invalidateQueries({ queryKey: ['pet'] })
 * - GET only: invalidateQueries({ queryKey: ['pet', 'GET'] })
 * - POST only: isMutating({ mutationKey: ['pet', 'POST'] })
 *
 * @param keyGetterName - Function name for key getter
 * @param hasArgs - Whether the operation has arguments
 * @param inferRequestType - TypeScript type for request
 * @param honoPath - Hono-style path (with :param)
 * @param clientPath - Client path expression
 * @param config - Framework configuration
 * @returns Query key getter function code
 * @see https://tanstack.com/query/latest/docs/framework/react/guides/query-keys
 * @see https://swr.vercel.app/docs/arguments
 */
function makeQueryKeyGetterCode(
  keyGetterName: string,
  hasArgs: boolean,
  inferRequestType: string,
  honoPath: string,
  _clientPath: string,
  config: { frameworkName: string; isVueQuery?: boolean; isSWR?: boolean },
): string {
  const safeCommentPath = escapeCommentEnd(honoPath.replace(/:([^/]+)/g, '{$1}'))
  const safeCommentPathNoParam = escapeCommentEnd(honoPath)

  // Extract prefix (first path segment without leading slash)
  // e.g., '/pet/findByStatus' → 'pet', '/store/inventory' → 'store'
  const prefix = honoPath.replace(/^\//, '').split('/')[0]

  // Vue Query: uses MaybeRef and unref
  if (config.isVueQuery) {
    if (hasArgs) {
      return `/**
 * Generates ${config.frameworkName} cache key for GET ${safeCommentPath}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function ${keyGetterName}(args:MaybeRef<${inferRequestType}>){return['${prefix}','GET','${honoPath}',unref(args)]as const}`
    }
    return `/**
 * Generates ${config.frameworkName} cache key for GET ${safeCommentPathNoParam}
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function ${keyGetterName}(){return['${prefix}','GET','${honoPath}']as const}`
  }

  // TanStack Query / Svelte Query: ['prefix', 'GET', '/path', args?]
  if (hasArgs) {
    return `/**
 * Generates ${config.frameworkName} cache key for GET ${safeCommentPath}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function ${keyGetterName}(args:${inferRequestType}){return['${prefix}','GET','${honoPath}',args]as const}`
  }
  return `/**
 * Generates ${config.frameworkName} cache key for GET ${safeCommentPathNoParam}
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function ${keyGetterName}(){return['${prefix}','GET','${honoPath}']as const}`
}

/**
 * Generates query options getter function code.
 *
 * This function returns an object compatible with TanStack Query's queryOptions pattern,
 * enabling prefetching, ensureQueryData, and other advanced patterns.
 *
 * Returns a plain object (not using queryOptions() helper) to avoid type conflicts
 * when spreading with user-provided options. TypeScript infers the exact return type.
 * @see https://tanstack.com/query/latest/docs/framework/react/guides/query-options
 *
 * @param optionsGetterName - Function name for options getter
 * @param keyGetterName - Function name for key getter
 * @param hasArgs - Whether the operation has arguments
 * @param inferRequestType - TypeScript type for request
 * @param clientPath - Client path expression
 * @param method - HTTP method
 * @param honoPath - Hono-style path (with :param)
 * @param config - Framework configuration
 * @returns Query options getter function code
 */
function makeQueryOptionsGetterCode(
  optionsGetterName: string,
  keyGetterName: string,
  hasArgs: boolean,
  inferRequestType: string,
  clientPath: string,
  method: string,
  honoPath: string,
  config: { frameworkName: string },
): string {
  const safeCommentPath = escapeCommentEnd(honoPath.replace(/:([^/]+)/g, '{$1}'))
  const safeCommentPathNoParam = escapeCommentEnd(honoPath)
  const commentPath = hasArgs ? safeCommentPath : safeCommentPathNoParam

  // Build client call WITH signal for query cancellation
  // @see https://tanstack.com/query/latest/docs/framework/react/guides/query-cancellation
  const clientCallWithSignal = hasArgs
    ? `${clientPath}.$${method}(args,{...clientOptions,init:{...clientOptions?.init,signal}})`
    : `${clientPath}.$${method}(undefined,{...clientOptions,init:{...clientOptions?.init,signal}})`
  const fetcherBody = makeFetcher(clientCallWithSignal)
  const queryKeyCall = hasArgs ? `${keyGetterName}(args)` : `${keyGetterName}()`

  // Return plain object - TypeScript infers the exact type
  // This avoids DataTag branding conflicts when spreading with UseQueryOptions
  if (hasArgs) {
    return `/**
 * Returns ${config.frameworkName} query options for GET ${commentPath}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function ${optionsGetterName}(args:${inferRequestType},clientOptions?:ClientRequestOptions){return{queryKey:${queryKeyCall},queryFn({signal}:QueryFunctionContext){return ${fetcherBody}}}}`
  }
  return `/**
 * Returns ${config.frameworkName} query options for GET ${commentPath}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function ${optionsGetterName}(clientOptions?:ClientRequestOptions){return{queryKey:${queryKeyCall},queryFn({signal}:QueryFunctionContext){return ${fetcherBody}}}}`
}

/* ─────────────────────────────── SWR Query Hook Code ─────────────────────────────── */

/**
 * Generates SWR query hook code.
 *
 * SWR pattern: useSWR(key, fetcher, options)
 * - key: null to disable, otherwise the cache key
 * - fetcher: async function returning data
 * - options: SWRConfiguration
 */
function makeSWRQueryHookCode(
  hookName: string,
  keyGetterName: string,
  hasArgs: boolean,
  inferRequestType: string,
  clientPath: string,
  method: string,
  docs: string,
): string {
  const argsSig = hasArgs ? `args:${inferRequestType},` : ''
  const swrConfigType = 'SWRConfiguration&{swrKey?:Key;enabled?:boolean}'
  const optionsSig = `options?:{swr?:${swrConfigType};client?:ClientRequestOptions}`

  const keyCall = hasArgs ? `${keyGetterName}(args)` : `${keyGetterName}()`
  const clientCall = hasArgs
    ? `${clientPath}.$${method}(args,clientOptions)`
    : `${clientPath}.$${method}(undefined,clientOptions)`
  const fetcherBody = makeFetcher(clientCall)

  return `${docs}
export function ${hookName}(${argsSig}${optionsSig}){const{swr:swrOptions,client:clientOptions}=options??{};const{swrKey:customKey,enabled,...restSwrOptions}=swrOptions??{};const isEnabled=enabled!==false;const swrKey=isEnabled?(customKey??${keyCall}):null;return{swrKey,...useSWR(swrKey,async()=>${fetcherBody},restSwrOptions)}}`
}

/* ─────────────────────────────── Query Hook Code ─────────────────────────────── */

function makeQueryHookCode(
  hookName: string,
  optionsGetterName: string,
  hasArgs: boolean,
  inferRequestType: string,
  parseResponseType: string,
  docs: string,
  config: {
    queryFn: string
    useThunk?: boolean
    useQueryOptionsType: string
    usePartialOmit?: boolean
  },
): string {
  const argsSig = hasArgs ? `args:${inferRequestType},` : ''

  // Use official TanStack Query options type
  // Vue Query needs Partial<Omit<...>> due to QueryKey type conflicts with MaybeRefOrGetter
  // React/Svelte use runtime protection instead of type-level Omit
  // @see https://tanstack.com/query/latest/docs/framework/react/guides/query-options
  const queryOptionsType = config.usePartialOmit
    ? `Partial<Omit<${config.useQueryOptionsType}<${parseResponseType},Error>,'queryKey'|'queryFn'>>`
    : `${config.useQueryOptionsType}<${parseResponseType},Error>`
  const optionsType = `{query?:${queryOptionsType};client?:ClientRequestOptions}`

  // All frameworks use runtime protection - destructure queryKey/queryFn and spread them last
  // This ensures queryKey/queryFn cannot be overridden while allowing staleTime, gcTime, etc. override
  // Vue Query additionally has type-level protection with Omit (usePartialOmit: true)

  // Svelte Query v5+ requires thunk pattern: createQuery(() => options)
  // Call options?.() once to avoid multiple evaluations (options could be a getter)
  if (config.useThunk) {
    const optionsGetterCall = hasArgs
      ? `${optionsGetterName}(args,opts?.client)`
      : `${optionsGetterName}(opts?.client)`
    return `${docs}
export function ${hookName}(${argsSig}options?:()=>${optionsType}){return ${config.queryFn}(()=>{const opts=options?.();const{queryKey,queryFn,...baseOptions}=${optionsGetterCall};return{...baseOptions,...opts?.query,queryKey,queryFn}})}`
  }

  // React TanStack Query / Vue Query: runtime protection
  const optionsGetterCall = hasArgs
    ? `${optionsGetterName}(args,clientOptions)`
    : `${optionsGetterName}(clientOptions)`
  return `${docs}
export function ${hookName}(${argsSig}options?:${optionsType}){const{query:queryOptions,client:clientOptions}=options??{};const{queryKey,queryFn,...baseOptions}=${optionsGetterCall};return ${config.queryFn}({...baseOptions,...queryOptions,queryKey,queryFn})}`
}

/* ─────────────────────────────── Mutation Key Getter ─────────────────────────────── */

/**
 * Generates the mutation key getter function name.
 *
 * @param method - HTTP method
 * @param pathStr - API path
 * @returns Mutation key getter function name (e.g., "getPutPetMutationKey")
 */
function makeMutationKeyGetterName(method: string, pathStr: string): string {
  const funcName = methodPath(method, pathStr)
  return `get${capitalize(funcName)}MutationKey`
}

/**
 * Generates mutation key getter function code.
 *
 * Pattern: ['prefix', 'METHOD', '/path'] to match Query key structure.
 * - prefix: First path segment for prefix-based filtering (e.g., 'pet')
 * - method: HTTP method to avoid collisions (e.g., 'PUT', 'POST')
 * - path: Full path template (e.g., '/pet/:petId')
 *
 * This enables:
 * - Prefix filtering: isMutating({ mutationKey: ['pet'] }) → all pet mutations
 * - No collisions: PUT /pet and POST /pet have different keys
 *
 * @param keyGetterName - Function name for key getter
 * @param honoPath - Hono-style path (with :param)
 * @param method - HTTP method
 * @param config - Framework configuration
 * @returns Mutation key getter function code
 */
function makeMutationKeyGetterCode(
  keyGetterName: string,
  honoPath: string,
  method: string,
  config: { frameworkName: string },
): string {
  const methodUpper = method.toUpperCase()
  const safeCommentPath = escapeCommentEnd(honoPath.replace(/:([^/]+)/g, '{$1}'))
  // Extract prefix (first path segment without leading slash)
  const prefix = honoPath.replace(/^\//, '').split('/')[0]
  return `/**
 * Generates ${config.frameworkName} mutation key for ${methodUpper} ${safeCommentPath}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function ${keyGetterName}(){return['${prefix}','${methodUpper}','${honoPath}']as const}`
}

/* ─────────────────────────────── Mutation Options Getter ─────────────────────────────── */

/**
 * Generates the mutation options getter function name.
 *
 * @param method - HTTP method
 * @param pathStr - API path
 * @returns Mutation options getter function name (e.g., "getPutPetMutationOptions")
 */
function makeMutationOptionsGetterName(method: string, pathStr: string): string {
  const funcName = methodPath(method, pathStr)
  return `get${capitalize(funcName)}MutationOptions`
}

/**
 * Generates mutation options getter function code.
 *
 * This function returns an object with mutationKey and mutationFn,
 * enabling reusability with useMutation, setMutationDefaults, etc.
 *
 * @param optionsGetterName - Function name for options getter
 * @param keyGetterName - Function name for key getter
 * @param hasArgs - Whether the operation has arguments
 * @param inferRequestType - TypeScript type for request
 * @param clientPath - Client path expression
 * @param method - HTTP method
 * @param honoPath - Hono-style path (with :param)
 * @param config - Framework configuration
 * @returns Mutation options getter function code
 */
function makeMutationOptionsGetterCode(
  optionsGetterName: string,
  keyGetterName: string,
  hasArgs: boolean,
  inferRequestType: string,
  clientPath: string,
  method: string,
  honoPath: string,
  config: { frameworkName: string },
): string {
  const methodUpper = method.toUpperCase()
  const safeCommentPath = escapeCommentEnd(honoPath.replace(/:([^/]+)/g, '{$1}'))

  const clientCall = hasArgs
    ? `${clientPath}.$${method}(args,clientOptions)`
    : `${clientPath}.$${method}(undefined,clientOptions)`
  const fetcherBody = makeFetcher(clientCall)

  if (hasArgs) {
    return `/**
 * Returns ${config.frameworkName} mutation options for ${methodUpper} ${safeCommentPath}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function ${optionsGetterName}(clientOptions?:ClientRequestOptions){return{mutationKey:${keyGetterName}(),async mutationFn(args:${inferRequestType}){return ${fetcherBody}}}}`
  }
  return `/**
 * Returns ${config.frameworkName} mutation options for ${methodUpper} ${safeCommentPath}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function ${optionsGetterName}(clientOptions?:ClientRequestOptions){return{mutationKey:${keyGetterName}(),async mutationFn(){return ${fetcherBody}}}}`
}

/* ─────────────────────────────── SWR Header ─────────────────────────────── */

/**
 * Generates the import header for SWR hook files.
 */
function makeSWRHeader(
  importPath: string,
  hasQuery: boolean,
  hasMutation: boolean,
  needsInferRequestType: boolean,
  clientName: string,
): string {
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
  const typeImportParts: string[] = []
  if (needsInferRequestType) typeImportParts.push('InferRequestType')
  typeImportParts.push('ClientRequestOptions')
  lines.push(`import type{${typeImportParts.join(',')}}from'hono/client'`)
  lines.push("import{parseResponse}from'hono/client'")
  lines.push(`import{${clientName}}from'${importPath}'`)

  return `${lines.join('\n')}\n\n`
}

/* ─────────────────────────────── SWR Mutation Hook Code ─────────────────────────────── */

/**
 * Generates SWR mutation hook code.
 *
 * SWR pattern: useSWRMutation(key, fetcher, options)
 * - key: mutation key for state tracking
 * - fetcher: (_: Key, { arg }) => Promise<Data>
 * - options: SWRMutationConfiguration
 */
function makeSWRMutationHookCode(
  hookName: string,
  keyGetterName: string,
  hasArgs: boolean,
  inferRequestType: string,
  parseResponseType: string,
  clientPath: string,
  method: string,
  docs: string,
  hasNoContent: boolean,
): string {
  const variablesType = hasArgs ? inferRequestType : 'undefined'
  const responseTypeWithUndefined = hasNoContent
    ? `${parseResponseType}|undefined`
    : parseResponseType
  const mutationConfigType = `SWRMutationConfiguration<${responseTypeWithUndefined},Error,Key,${variablesType}>`

  if (hasArgs) {
    const clientCall = `${clientPath}.$${method}(arg,clientOptions)`
    const fetcherBody = makeFetcher(clientCall)
    const optionsSig = `options?:{mutation?:${mutationConfigType}&{swrKey?:Key};client?:ClientRequestOptions}`
    return `${docs}
export function ${hookName}(${optionsSig}){const{mutation:mutationOptions,client:clientOptions}=options??{};const{swrKey:customKey,...restMutationOptions}=mutationOptions??{};const swrKey=customKey??${keyGetterName}();return{swrKey,...useSWRMutation(swrKey,async(_:Key,{arg}:{arg:${inferRequestType}})=>${fetcherBody},restMutationOptions)}}`
  }

  // No args - simpler pattern
  const clientCall = `${clientPath}.$${method}(undefined,clientOptions)`
  const fetcherBody = makeFetcher(clientCall)
  const optionsSig = `options?:{mutation?:${mutationConfigType}&{swrKey?:Key};client?:ClientRequestOptions}`
  return `${docs}
export function ${hookName}(${optionsSig}){const{mutation:mutationOptions,client:clientOptions}=options??{};const{swrKey:customKey,...restMutationOptions}=mutationOptions??{};const swrKey=customKey??${keyGetterName}();return{swrKey,...useSWRMutation(swrKey,async()=>${fetcherBody},restMutationOptions)}}`
}

/* ─────────────────────────────── Mutation Hook Code ─────────────────────────────── */

function makeMutationHookCode(
  hookName: string,
  optionsGetterName: string,
  hasArgs: boolean,
  inferRequestType: string,
  inferResponseType: string,
  docs: string,
  config: {
    mutationFn: string
    useThunk?: boolean
    useMutationOptionsType: string
    usePartialOmit?: boolean
  },
  hasNoContent: boolean,
): string {
  const variablesType = hasArgs ? inferRequestType : 'void'

  // For 204/205 responses, parseResponse returns undefined
  const dataType = hasNoContent ? `${inferResponseType}|undefined` : inferResponseType

  // Use official TanStack Query mutation options type
  // Vue Query needs Partial<Omit<...>> due to type conflicts with MaybeRefOrGetter
  const mutationOptionsType = config.usePartialOmit
    ? `Partial<Omit<${config.useMutationOptionsType}<${dataType},Error,${variablesType}>,'mutationFn'|'mutationKey'>>`
    : `${config.useMutationOptionsType}<${dataType},Error,${variablesType}>`
  const optionsType = `{mutation?:${mutationOptionsType};client?:ClientRequestOptions}`

  // Use getMutationOptions to include mutationKey (for setMutationDefaults, isMutating, etc.)
  // Svelte Query v5+ requires thunk pattern: createMutation(() => options)
  if (config.useThunk) {
    return `${docs}
export function ${hookName}(options?:()=>${optionsType}){return ${config.mutationFn}(()=>{const opts=options?.();const{mutationKey,mutationFn,...baseOptions}=${optionsGetterName}(opts?.client);return{...baseOptions,...opts?.mutation,mutationKey,mutationFn}})}`
  }

  // React TanStack Query / Vue Query: use getMutationOptions
  return `${docs}
export function ${hookName}(options?:${optionsType}){const{mutation:mutationOptions,client:clientOptions}=options??{};const{mutationKey,mutationFn,...baseOptions}=${optionsGetterName}(clientOptions);return ${config.mutationFn}({...baseOptions,...mutationOptions,mutationKey,mutationFn})}`
}

/* ─────────────────────────────── Single-hook generator ─────────────────────────────── */

function makeHookCode(
  pathStr: string,
  method: 'get' | 'put' | 'post' | 'delete' | 'options' | 'head' | 'patch' | 'trace',
  item: ReturnType<typeof parsePathItem>,
  deps: ReturnType<typeof makeOperationDeps>,
  config: {
    hookPrefix: string
    frameworkName: string
    queryFn: string
    mutationFn: string
    useThunk?: boolean
    useQueryOptionsType: string
    useMutationOptionsType: string
    usePartialOmit?: boolean
    isVueQuery?: boolean
    isSWR?: boolean
  },
): { code: string; isQuery: boolean; hasArgs: boolean } | null {
  const op = item[method]
  if (!isOperationLike(op)) return null

  const hookName = makeHookName(method, pathStr, config.hookPrefix)
  const pathResult = formatPath(pathStr)
  const hasArgs = operationHasArgs(item, op, deps)
  const isQuery = method === 'get'

  const inferRequestType = makeInferRequestType(deps.client, pathResult, method)
  // Use parseResponse return type for accurate type inference
  const parseResponseType = makeParseResponseType(deps.client, pathResult, method)
  // parseResponse returns undefined for 204/205 No Content responses
  const hasNoContent = hasNoContentResponse(op)

  // Convert {param} to :param for key path display
  const honoPath = pathStr.replace(/\{([^}]+)\}/g, ':$1')
  const clientPath = `${deps.client}${pathResult.runtimePath}`

  const summary = typeof op.summary === 'string' ? op.summary : ''
  const description = typeof op.description === 'string' ? op.description : ''
  const docs = makeOperationDocs(method, pathStr, summary || undefined, description || undefined)

  // SWR: simpler pattern without options getter
  if (config.isSWR) {
    if (isQuery) {
      const keyGetterName = makeQueryKeyGetterName(method, pathStr, true)
      const keyGetterCode = makeQueryKeyGetterCode(
        keyGetterName,
        hasArgs,
        inferRequestType,
        honoPath,
        clientPath,
        config,
      )
      const hookCode = makeSWRQueryHookCode(
        hookName,
        keyGetterName,
        hasArgs,
        inferRequestType,
        clientPath,
        method,
        docs,
      )
      return {
        code: `${keyGetterCode}\n\n${hookCode}`,
        isQuery: true,
        hasArgs,
      }
    }
    // SWR mutation
    const keyGetterName = makeMutationKeyGetterName(method, pathStr)
    const keyGetterCode = makeMutationKeyGetterCode(keyGetterName, honoPath, method, config)
    const hookCode = makeSWRMutationHookCode(
      hookName,
      keyGetterName,
      hasArgs,
      inferRequestType,
      parseResponseType,
      clientPath,
      method,
      docs,
      hasNoContent,
    )
    return {
      code: `${keyGetterCode}\n\n${hookCode}`,
      isQuery: false,
      hasArgs,
    }
  }

  // TanStack Query / Vue Query / Svelte Query
  if (isQuery) {
    const keyGetterName = makeQueryKeyGetterName(method, pathStr)
    const optionsGetterName = makeQueryOptionsGetterName(method, pathStr)
    const keyGetterCode = makeQueryKeyGetterCode(
      keyGetterName,
      hasArgs,
      inferRequestType,
      honoPath,
      clientPath,
      config,
    )
    const optionsGetterCode = makeQueryOptionsGetterCode(
      optionsGetterName,
      keyGetterName,
      hasArgs,
      inferRequestType,
      clientPath,
      method,
      honoPath,
      config,
    )
    const hookCode = makeQueryHookCode(
      hookName,
      optionsGetterName,
      hasArgs,
      inferRequestType,
      parseResponseType,
      docs,
      config,
    )
    // Combine in Orval order: key getter → options getter → hook
    return {
      code: `${keyGetterCode}\n\n${optionsGetterCode}\n\n${hookCode}`,
      isQuery: true,
      hasArgs,
    }
  }

  // Generate mutation key and options getters
  const keyGetterName = makeMutationKeyGetterName(method, pathStr)
  const optionsGetterName = makeMutationOptionsGetterName(method, pathStr)
  const keyGetterCode = makeMutationKeyGetterCode(keyGetterName, honoPath, method, config)
  const optionsGetterCode = makeMutationOptionsGetterCode(
    optionsGetterName,
    keyGetterName,
    hasArgs,
    inferRequestType,
    clientPath,
    method,
    honoPath,
    config,
  )
  const hookCode = makeMutationHookCode(
    hookName,
    optionsGetterName,
    hasArgs,
    inferRequestType,
    parseResponseType,
    docs,
    config,
    hasNoContent,
  )
  // Combine in Orval order: key getter → options getter → hook
  return {
    code: `${keyGetterCode}\n\n${optionsGetterCode}\n\n${hookCode}`,
    isQuery: false,
    hasArgs,
  }
}

/**
 * Builds hook codes from OpenAPI paths.
 */
function makeHookCodes(
  paths: OpenAPIPaths,
  deps: ReturnType<typeof makeOperationDeps>,
  config: {
    hookPrefix: string
    frameworkName: string
    queryFn: string
    mutationFn: string
    useThunk?: boolean
    useQueryOptionsType: string
    useMutationOptionsType: string
    usePartialOmit?: boolean
    isVueQuery?: boolean
    isSWR?: boolean
  },
): { hookName: string; code: string; isQuery: boolean; hasArgs: boolean }[] {
  return Object.entries(paths)
    .filter((entry): entry is [string, Record<string, unknown>] => isRecord(entry[1]))
    .flatMap(([p, rawItem]) => {
      const pathItem = parsePathItem(rawItem)
      const methods = ['get', 'put', 'post', 'delete', 'options', 'head', 'patch', 'trace'] as const
      return methods
        .map((method) => {
          const result = makeHookCode(p, method, pathItem, deps, config)
          return result
            ? {
                hookName: makeHookName(method, p, config.hookPrefix),
                code: result.code,
                isQuery: result.isQuery,
                hasArgs: result.hasArgs,
              }
            : null
        })
        .filter(
          (item): item is { hookName: string; code: string; isQuery: boolean; hasArgs: boolean } =>
            item !== null,
        )
    })
}

/* ─────────────────────────────── Header ─────────────────────────────── */

/**
 * Generates the import header for Query hook files.
 *
 * Imports include:
 * - Query/Mutation hooks from the framework package
 * - UseQueryOptions/UseMutationOptions types for proper typing
 * - Hono client types (InferRequestType, InferResponseType, ClientRequestOptions)
 * - parseResponse for type-safe response handling
 */
function makeHeader(
  importPath: string,
  hasQuery: boolean,
  hasMutation: boolean,
  needsInferRequestType: boolean,
  clientName: string,
  config: {
    packageName: string
    queryFn: string
    mutationFn: string
    useQueryOptionsType: string
    useMutationOptionsType: string
    isVueQuery?: boolean
    isSWR?: boolean
  },
  hasQueryWithArgs = false,
): string {
  // SWR has different import structure
  if (config.isSWR) {
    return makeSWRHeader(importPath, hasQuery, hasMutation, needsInferRequestType, clientName)
  }

  const queryImports = [
    ...(hasQuery ? [config.queryFn] : []),
    ...(hasMutation ? [config.mutationFn] : []),
  ]

  // Type imports for options - UseQueryOptions, UseMutationOptions, QueryFunctionContext
  const typeImports = [
    ...(hasQuery ? [config.useQueryOptionsType, 'QueryFunctionContext'] : []),
    ...(hasMutation ? [config.useMutationOptionsType] : []),
  ]

  // Hono client type imports
  // InferRequestType: needed when operation has args
  // InferResponseType: no longer needed - using parseResponse return type instead
  const honoTypeImportParts = [
    ...(needsInferRequestType ? ['InferRequestType'] : []),
    'ClientRequestOptions',
  ]

  // Vue Query needs MaybeRef type and unref from 'vue' only when query has args
  // (used in makeQueryKeyGetterCode for args:MaybeRef<...> and unref(args))
  const needsVueImports = config.isVueQuery && hasQueryWithArgs

  const lines = [
    ...(queryImports.length > 0
      ? [`import{${queryImports.join(',')}}from'${config.packageName}'`]
      : []),
    ...(typeImports.length > 0
      ? [`import type{${typeImports.join(',')}}from'${config.packageName}'`]
      : []),
    // Vue Query needs MaybeRef type and unref from 'vue' for queryKey generation (only when query has args)
    ...(needsVueImports ? ["import{unref}from'vue'", "import type{MaybeRef}from'vue'"] : []),
    `import type{${honoTypeImportParts.join(',')}}from'hono/client'`,
    "import{parseResponse}from'hono/client'",
    `import{${clientName}}from'${importPath}'`,
  ]
  return `${lines.join('\n')}\n\n`
}

/* ─────────────────────────────── Entry ─────────────────────────────── */

/**
 * Generates Query hooks from OpenAPI specification.
 *
 * Creates type-safe Query hooks that wrap Hono RPC client calls,
 * with proper TypeScript types derived from OpenAPI schemas.
 *
 * - GET operations generate query hooks
 * - POST/PUT/DELETE/PATCH operations generate mutation hooks
 *
 * ```mermaid
 * flowchart LR
 *   subgraph "Generated Code"
 *     A["export function useGetUsers(...) { return useQuery(...) }"]
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
 * @param config - Framework configuration
 * @param split - Whether to split into multiple files (one per hook)
 * @param clientName - Name of the client export (default: 'client')
 * @returns Promise resolving to success message or error
 *
 * @example
 * ```ts
 * // Single file output
 * await makeQueryHooks(openAPI, 'src/hooks.ts', './client', TANSTACK_QUERY_CONFIG)
 * // Generates: src/hooks.ts with all Query hooks
 *
 * // Split mode output
 * await makeQueryHooks(openAPI, 'src/hooks', './client', TANSTACK_QUERY_CONFIG, true)
 * // Generates: src/hooks/useGetUsers.ts, src/hooks/usePostUsers.ts, src/hooks/index.ts
 * ```
 */
export async function makeQueryHooks(
  openAPI: OpenAPI,
  output: string | `${string}.ts`,
  importPath: string,
  config: {
    packageName: string
    frameworkName: string
    hookPrefix: string
    queryFn: string
    mutationFn: string
    useThunk?: boolean
    useQueryOptionsType: string
    useMutationOptionsType: string
    usePartialOmit?: boolean
    isVueQuery?: boolean
    isSWR?: boolean
  },
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
  const deps = makeOperationDeps(clientName, componentsParameters, componentsRequestBodies)

  const hookCodes = makeHookCodes(pathsMaybe, deps, config)

  // Non-split: write single file
  if (!split) {
    const body = hookCodes.map(({ code }) => code).join('\n\n')
    const hasQuery = hookCodes.some(({ isQuery }) => isQuery)
    const hasMutation = hookCodes.some(({ isQuery }) => !isQuery)
    const needsInferRequestType = hookCodes.some(({ hasArgs }) => hasArgs)
    const hasQueryWithArgs = hookCodes.some(({ isQuery, hasArgs }) => isQuery && hasArgs)
    const header = makeHeader(
      importPath,
      hasQuery,
      hasMutation,
      needsInferRequestType,
      clientName,
      config,
      hasQueryWithArgs,
    )
    const code = `${header}${body}${hookCodes.length ? '\n' : ''}`
    const coreResult = await core(code, path.dirname(output), output)
    if (!coreResult.ok) return { ok: false, error: coreResult.error }
    return {
      ok: true,
      value: `Generated ${config.frameworkName.toLowerCase().replace(/ /g, '-')} hooks written to ${output}`,
    }
  }

  // Split: write each file + index.ts (barrel) in parallel
  const { outDir, indexPath } = resolveSplitOutDir(output)

  const exportLines = Array.from(
    new Set(hookCodes.map(({ hookName }) => `export * from './${hookName}'`)),
  )
  const index = `${exportLines.join('\n')}\n`

  const allResults = await Promise.all([
    ...hookCodes.map(({ hookName, code, isQuery, hasArgs }) => {
      const hasQueryWithArgs = isQuery && hasArgs
      const header = makeHeader(
        importPath,
        isQuery,
        !isQuery,
        hasArgs,
        clientName,
        config,
        hasQueryWithArgs,
      )
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
    value: `Generated ${config.frameworkName.toLowerCase().replace(/ /g, '-')} hooks written to ${outDir}/*.ts (index.ts included)`,
  }
}
