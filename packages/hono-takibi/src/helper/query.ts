import path from 'node:path'
import { isOpenAPIPaths, isOperationLike, isRecord } from '../guard/index.js'
import type { OpenAPI, OpenAPIPaths } from '../openapi/index.js'
import { capitalize, escapeCommentEnd, makeOperationDocs, methodPath } from '../utils/index.js'
import {
  core,
  formatPath,
  hasNoContentResponse,
  makeOperationDeps,
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

/* ─────────────────────────────── Type Helpers ─────────────────────────────── */

/**
 * Creates a response type from parseResponse function name.
 * e.g., 'getUsers' → 'Awaited<ReturnType<typeof getUsers>>'
 */
function makeResponseType(parseResponseFuncName: string): string {
  return `Awaited<ReturnType<typeof ${parseResponseFuncName}>>`
}

/**
 * Creates an args type from parseResponse function name.
 * e.g., 'postUsers' → 'Parameters<typeof postUsers>[0]'
 */
function makeArgsType(parseResponseFuncName: string): string {
  return `Parameters<typeof ${parseResponseFuncName}>[0]`
}

/* ─────────────────────────────── Inline parseResponse Wrapper ─────────────────────────────── */

/**
 * Generates inline parseResponse wrapper function code.
 *
 * For operations with args:
 *   export async function getUsers(args: InferRequestType<typeof client.users.$get>, options?: ClientRequestOptions) {
 *     return await parseResponse(client.users.$get(args, options))
 *   }
 *
 * For operations without args:
 *   export async function getHealth(options?: ClientRequestOptions) {
 *     return await parseResponse(client.health.$get(undefined, options))
 *   }
 */
function makeParseResponseWrapperCode(
  parseResponseFuncName: string,
  method: string,
  pathStr: string,
  hasArgs: boolean,
  clientName: string,
  docs: string,
): string {
  const pathResult = formatPath(pathStr)
  const runtimeAccess = `${clientName}${pathResult.runtimePath}.$${method}`

  if (hasArgs) {
    const typeAccess = pathResult.hasBracket
      ? `typeof ${clientName}${pathResult.typeofPrefix}${pathResult.bracketSuffix}['$${method}']`
      : `typeof ${runtimeAccess}`
    return `${docs}\nexport async function ${parseResponseFuncName}(args:InferRequestType<${typeAccess}>,options?:ClientRequestOptions){return await parseResponse(${runtimeAccess}(args,options))}`
  }

  return `${docs}\nexport async function ${parseResponseFuncName}(options?:ClientRequestOptions){return await parseResponse(${runtimeAccess}(undefined,options))}`
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
 * @param argsType - TypeScript type for request args
 * @param honoPath - Hono-style path (with :param)
 * @param config - Framework configuration
 * @returns Query key getter function code
 * @see https://tanstack.com/query/latest/docs/framework/react/guides/query-keys
 * @see https://swr.vercel.app/docs/arguments
 */
function makeQueryKeyGetterCode(
  keyGetterName: string,
  hasArgs: boolean,
  argsType: string,
  honoPath: string,
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
export function ${keyGetterName}(args:MaybeRef<${argsType}>){return['${prefix}','GET','${honoPath}',unref(args)]as const}`
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
export function ${keyGetterName}(args:${argsType}){return['${prefix}','GET','${honoPath}',args]as const}`
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
 * Uses queryOptions() helper when available for proper type branding.
 * @see https://tanstack.com/query/latest/docs/framework/react/guides/query-options
 *
 * @param optionsGetterName - Function name for options getter
 * @param keyGetterName - Function name for key getter
 * @param hasArgs - Whether the operation has arguments
 * @param argsType - TypeScript type for request args
 * @param parseResponseFuncName - Name of the parseResponse function to call
 * @param honoPath - Hono-style path (with :param)
 * @param config - Framework configuration
 * @returns Query options getter function code
 */
function makeQueryOptionsGetterCode(
  optionsGetterName: string,
  keyGetterName: string,
  hasArgs: boolean,
  argsType: string,
  parseResponseFuncName: string,
  honoPath: string,
  config: { frameworkName: string; hasQueryOptionsHelper?: boolean },
): string {
  const safeCommentPath = escapeCommentEnd(honoPath.replace(/:([^/]+)/g, '{$1}'))
  const safeCommentPathNoParam = escapeCommentEnd(honoPath)
  const commentPath = hasArgs ? safeCommentPath : safeCommentPathNoParam

  const queryKeyCall = hasArgs ? `${keyGetterName}(args)` : `${keyGetterName}()`

  // Build fetcher call using parseResponse function
  const fetcherCall = hasArgs
    ? `${parseResponseFuncName}(args,{...clientOptions,init:{...clientOptions?.init,signal}})`
    : `${parseResponseFuncName}({...clientOptions,init:{...clientOptions?.init,signal}})`

  // queryOptions() wrap for type safety with TanStack Query
  const bodyContent = `queryKey:${queryKeyCall},queryFn({signal}:QueryFunctionContext){return ${fetcherCall}}`
  const returnExpr = config.hasQueryOptionsHelper
    ? `queryOptions({${bodyContent}})`
    : `{${bodyContent}}`

  if (hasArgs) {
    return `/**
 * Returns ${config.frameworkName} query options for GET ${commentPath}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function ${optionsGetterName}(args:${argsType},clientOptions?:ClientRequestOptions){return ${returnExpr}}`
  }
  return `/**
 * Returns ${config.frameworkName} query options for GET ${commentPath}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function ${optionsGetterName}(clientOptions?:ClientRequestOptions){return ${returnExpr}}`
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
  argsType: string,
  parseResponseFuncName: string,
  docs: string,
): string {
  const argsSig = hasArgs ? `args:${argsType},` : ''
  const swrConfigType = 'SWRConfiguration&{swrKey?:Key;enabled?:boolean}'
  const optionsSig = `options?:{swr?:${swrConfigType};client?:ClientRequestOptions}`

  const keyCall = hasArgs ? `${keyGetterName}(args)` : `${keyGetterName}()`
  const fetcherCall = hasArgs
    ? `${parseResponseFuncName}(args,clientOptions)`
    : `${parseResponseFuncName}(clientOptions)`

  return `${docs}
export function ${hookName}(${argsSig}${optionsSig}){const{swr:swrOptions,client:clientOptions}=options??{};const{swrKey:customKey,enabled,...restSwrOptions}=swrOptions??{};const isEnabled=enabled!==false;const swrKey=isEnabled?(customKey??${keyCall}):null;return{swrKey,...useSWR(swrKey,async()=>${fetcherCall},restSwrOptions)}}`
}

/* ─────────────────────────────── Query Hook Code ─────────────────────────────── */

function makeQueryHookCode(
  hookName: string,
  optionsGetterName: string,
  hasArgs: boolean,
  argsType: string,
  responseType: string,
  docs: string,
  config: {
    queryFn: string
    useThunk?: boolean
    useQueryOptionsType: string
  },
): string {
  const argsSig = hasArgs ? `args:${argsType},` : ''

  // Use official TanStack Query options type
  const queryOptionsType = `${config.useQueryOptionsType}<${responseType},Error>`
  const optionsType = `{query?:${queryOptionsType};client?:ClientRequestOptions}`

  // Svelte Query v5+ requires thunk pattern: createQuery(() => options)
  // Call options?.() once to avoid multiple evaluations (options could be a getter)
  if (config.useThunk) {
    const optionsGetterCall = hasArgs
      ? `${optionsGetterName}(args,opts?.client)`
      : `${optionsGetterName}(opts?.client)`
    return `${docs}
export function ${hookName}(${argsSig}options?:()=>${optionsType}){return ${config.queryFn}(()=>{const opts=options?.();return{...${optionsGetterCall},...opts?.query}})}`
  }

  // React TanStack Query / Vue Query: direct spread
  const optionsGetterCall = hasArgs
    ? `${optionsGetterName}(args,clientOptions)`
    : `${optionsGetterName}(clientOptions)`
  return `${docs}
export function ${hookName}(${argsSig}options?:${optionsType}){const{query:queryOpts,client:clientOptions}=options??{};return ${config.queryFn}({...${optionsGetterCall},...queryOpts})}`
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
 * Uses mutationOptions() helper when available (React TanStack Query) for type branding.
 *
 * @param optionsGetterName - Function name for options getter
 * @param keyGetterName - Function name for key getter
 * @param hasArgs - Whether the operation has arguments
 * @param argsType - TypeScript type for request args
 * @param parseResponseFuncName - Name of the parseResponse function to call
 * @param method - HTTP method
 * @param honoPath - Hono-style path (with :param)
 * @param config - Framework configuration
 * @returns Mutation options getter function code
 */
function makeMutationOptionsGetterCode(
  optionsGetterName: string,
  keyGetterName: string,
  hasArgs: boolean,
  argsType: string,
  parseResponseFuncName: string,
  method: string,
  honoPath: string,
  config: { frameworkName: string; hasMutationOptionsHelper?: boolean },
): string {
  const methodUpper = method.toUpperCase()
  const safeCommentPath = escapeCommentEnd(honoPath.replace(/:([^/]+)/g, '{$1}'))

  if (hasArgs) {
    const bodyContent = `mutationKey:${keyGetterName}(),async mutationFn(args:${argsType}){return ${parseResponseFuncName}(args,clientOptions)}`
    const returnExpr = config.hasMutationOptionsHelper
      ? `mutationOptions({${bodyContent}})`
      : `{${bodyContent}}`
    return `/**
 * Returns ${config.frameworkName} mutation options for ${methodUpper} ${safeCommentPath}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function ${optionsGetterName}(clientOptions?:ClientRequestOptions){return ${returnExpr}}`
  }
  const bodyContent = `mutationKey:${keyGetterName}(),async mutationFn(){return ${parseResponseFuncName}(clientOptions)}`
  const returnExpr = config.hasMutationOptionsHelper
    ? `mutationOptions({${bodyContent}})`
    : `{${bodyContent}}`
  return `/**
 * Returns ${config.frameworkName} mutation options for ${methodUpper} ${safeCommentPath}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function ${optionsGetterName}(clientOptions?:ClientRequestOptions){return ${returnExpr}}`
}

/* ─────────────────────────────── SWR Header ─────────────────────────────── */

/**
 * Generates the import header for SWR hook files.
 */
function makeSWRHeader(
  importPath: string,
  clientName: string,
  hasQuery: boolean,
  hasMutation: boolean,
  hasAnyArgs: boolean,
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
  const honoTypeImports = ['ClientRequestOptions', ...(hasAnyArgs ? ['InferRequestType'] : [])]
  lines.push(`import type{${honoTypeImports.join(',')}}from'hono/client'`)
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
  argsType: string,
  responseType: string,
  parseResponseFuncName: string,
  docs: string,
  hasNoContent: boolean,
): string {
  const variablesType = hasArgs ? argsType : 'undefined'
  const responseTypeWithUndefined = hasNoContent ? `${responseType}|undefined` : responseType
  const mutationConfigType = `SWRMutationConfiguration<${responseTypeWithUndefined},Error,Key,${variablesType}>`

  if (hasArgs) {
    const optionsSig = `options?:{mutation?:${mutationConfigType}&{swrKey?:Key};client?:ClientRequestOptions}`
    return `${docs}
export function ${hookName}(${optionsSig}){const{mutation:mutationOptions,client:clientOptions}=options??{};const{swrKey:customKey,...restMutationOptions}=mutationOptions??{};const swrKey=customKey??${keyGetterName}();return{swrKey,...useSWRMutation(swrKey,async(_:Key,{arg}:{arg:${argsType}})=>${parseResponseFuncName}(arg,clientOptions),restMutationOptions)}}`
  }

  // No args - simpler pattern
  const optionsSig = `options?:{mutation?:${mutationConfigType}&{swrKey?:Key};client?:ClientRequestOptions}`
  return `${docs}
export function ${hookName}(${optionsSig}){const{mutation:mutationOptions,client:clientOptions}=options??{};const{swrKey:customKey,...restMutationOptions}=mutationOptions??{};const swrKey=customKey??${keyGetterName}();return{swrKey,...useSWRMutation(swrKey,async()=>${parseResponseFuncName}(clientOptions),restMutationOptions)}}`
}

/* ─────────────────────────────── Mutation Hook Code ─────────────────────────────── */

function makeMutationHookCode(
  hookName: string,
  optionsGetterName: string,
  hasArgs: boolean,
  argsType: string,
  responseType: string,
  docs: string,
  config: {
    mutationFn: string
    useThunk?: boolean
    useMutationOptionsType: string
  },
  hasNoContent: boolean,
): string {
  const variablesType = hasArgs ? argsType : 'void'

  // For 204/205 responses, parseResponse returns undefined
  const dataType = hasNoContent ? `${responseType}|undefined` : responseType

  // Use official TanStack Query mutation options type
  const mutationOptionsType = `${config.useMutationOptionsType}<${dataType},Error,${variablesType}>`
  const optionsType = `{mutation?:${mutationOptionsType};client?:ClientRequestOptions}`

  // Use getMutationOptions to include mutationKey (for setMutationDefaults, isMutating, etc.)
  // Svelte Query v5+ requires thunk pattern: createMutation(() => options)
  if (config.useThunk) {
    return `${docs}
export function ${hookName}(options?:()=>${optionsType}){return ${config.mutationFn}(()=>{const opts=options?.();return{...${optionsGetterName}(opts?.client),...opts?.mutation}})}`
  }

  // React TanStack Query / Vue Query: direct spread
  return `${docs}
export function ${hookName}(options?:${optionsType}){const{mutation:mutationOpts,client:clientOptions}=options??{};return ${config.mutationFn}({...${optionsGetterName}(clientOptions),...mutationOpts})}`
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
    isVueQuery?: boolean
    isSWR?: boolean
    hasQueryOptionsHelper?: boolean
    hasMutationOptionsHelper?: boolean
  },
  clientName: string,
): { code: string; isQuery: boolean; hasArgs: boolean; parseResponseFuncName: string } | null {
  const op = item[method]
  if (!isOperationLike(op)) return null

  const hookName = makeHookName(method, pathStr, config.hookPrefix)
  const hasArgs = operationHasArgs(item, op, deps)
  const isQuery = method === 'get'

  // parseResponse function name (same naming as parseResponse/ generator)
  const parseResponseFuncName = methodPath(method, pathStr)
  const argsType = makeArgsType(parseResponseFuncName)
  const responseType = makeResponseType(parseResponseFuncName)
  // parseResponse returns undefined for 204/205 No Content responses
  const hasNoContent = hasNoContentResponse(op)

  // Convert {param} to :param for key path display
  const honoPath = pathStr.replace(/\{([^}]+)\}/g, ':$1')

  const summary = typeof op.summary === 'string' ? op.summary : ''
  const description = typeof op.description === 'string' ? op.description : ''
  const docs = makeOperationDocs(method, pathStr, summary || undefined, description || undefined)

  // Generate inline parseResponse wrapper function
  const wrapperCode = makeParseResponseWrapperCode(
    parseResponseFuncName,
    method,
    pathStr,
    hasArgs,
    clientName,
    docs,
  )

  // SWR: simpler pattern without options getter
  if (config.isSWR) {
    if (isQuery) {
      const keyGetterName = makeQueryKeyGetterName(method, pathStr, true)
      const keyGetterCode = makeQueryKeyGetterCode(
        keyGetterName,
        hasArgs,
        argsType,
        honoPath,
        config,
      )
      const hookCode = makeSWRQueryHookCode(
        hookName,
        keyGetterName,
        hasArgs,
        argsType,
        parseResponseFuncName,
        docs,
      )
      return {
        code: `${keyGetterCode}\n\n${wrapperCode}\n\n${hookCode}`,
        isQuery: true,
        hasArgs,
        parseResponseFuncName,
      }
    }
    // SWR mutation
    const keyGetterName = makeMutationKeyGetterName(method, pathStr)
    const keyGetterCode = makeMutationKeyGetterCode(keyGetterName, honoPath, method, config)
    const hookCode = makeSWRMutationHookCode(
      hookName,
      keyGetterName,
      hasArgs,
      argsType,
      responseType,
      parseResponseFuncName,
      docs,
      hasNoContent,
    )
    return {
      code: `${keyGetterCode}\n\n${wrapperCode}\n\n${hookCode}`,
      isQuery: false,
      hasArgs,
      parseResponseFuncName,
    }
  }

  // TanStack Query / Vue Query / Svelte Query
  if (isQuery) {
    const keyGetterName = makeQueryKeyGetterName(method, pathStr)
    const optionsGetterName = makeQueryOptionsGetterName(method, pathStr)
    const keyGetterCode = makeQueryKeyGetterCode(keyGetterName, hasArgs, argsType, honoPath, config)
    const optionsGetterCode = makeQueryOptionsGetterCode(
      optionsGetterName,
      keyGetterName,
      hasArgs,
      argsType,
      parseResponseFuncName,
      honoPath,
      config,
    )
    const hookCode = makeQueryHookCode(
      hookName,
      optionsGetterName,
      hasArgs,
      argsType,
      responseType,
      docs,
      config,
    )
    // Order: key → wrapper → options → hook
    return {
      code: `${keyGetterCode}\n\n${wrapperCode}\n\n${optionsGetterCode}\n\n${hookCode}`,
      isQuery: true,
      hasArgs,
      parseResponseFuncName,
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
    argsType,
    parseResponseFuncName,
    method,
    honoPath,
    config,
  )
  const hookCode = makeMutationHookCode(
    hookName,
    optionsGetterName,
    hasArgs,
    argsType,
    responseType,
    docs,
    config,
    hasNoContent,
  )
  // Order: key → wrapper → options → hook
  return {
    code: `${keyGetterCode}\n\n${wrapperCode}\n\n${optionsGetterCode}\n\n${hookCode}`,
    isQuery: false,
    hasArgs,
    parseResponseFuncName,
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
    isVueQuery?: boolean
    isSWR?: boolean
    hasQueryOptionsHelper?: boolean
    hasMutationOptionsHelper?: boolean
  },
  clientName: string,
): {
  hookName: string
  code: string
  isQuery: boolean
  hasArgs: boolean
  parseResponseFuncName: string
}[] {
  return Object.entries(paths)
    .filter((entry): entry is [string, { [k: string]: unknown }] => isRecord(entry[1]))
    .flatMap(([p, rawItem]) => {
      const pathItem = parsePathItem(rawItem)
      const methods = ['get', 'put', 'post', 'delete', 'options', 'head', 'patch', 'trace'] as const
      return methods
        .map((method) => {
          const result = makeHookCode(p, method, pathItem, deps, config, clientName)
          return result
            ? {
                hookName: makeHookName(method, p, config.hookPrefix),
                code: result.code,
                isQuery: result.isQuery,
                hasArgs: result.hasArgs,
                parseResponseFuncName: result.parseResponseFuncName,
              }
            : null
        })
        .filter(
          (
            item,
          ): item is {
            hookName: string
            code: string
            isQuery: boolean
            hasArgs: boolean
            parseResponseFuncName: string
          } => item !== null,
        )
    })
}

/* ─────────────────────────────── Header ─────────────────────────────── */

/**
 * Generates the import header for Query hook files.
 *
 * Imports include:
 * - Query/Mutation hooks from the framework package
 * - queryOptions/mutationOptions helpers when available
 * - UseQueryOptions/UseMutationOptions types for proper typing
 * - ClientRequestOptions, InferRequestType, parseResponse from Hono client
 * - client from importPath
 */
function makeHeader(
  importPath: string,
  clientName: string,
  hasQuery: boolean,
  hasMutation: boolean,
  hasAnyArgs: boolean,
  config: {
    packageName: string
    queryFn: string
    mutationFn: string
    useQueryOptionsType: string
    useMutationOptionsType: string
    isVueQuery?: boolean
    isSWR?: boolean
    hasQueryOptionsHelper?: boolean
    hasMutationOptionsHelper?: boolean
  },
  hasQueryWithArgs = false,
): string {
  // SWR has different import structure
  if (config.isSWR) {
    return makeSWRHeader(importPath, clientName, hasQuery, hasMutation, hasAnyArgs)
  }

  const queryImports = [
    ...(hasQuery ? [config.queryFn] : []),
    ...(hasMutation ? [config.mutationFn] : []),
    ...(hasQuery && config.hasQueryOptionsHelper ? ['queryOptions'] : []),
    ...(hasMutation && config.hasMutationOptionsHelper ? ['mutationOptions'] : []),
  ]

  // Type imports for options - UseQueryOptions, UseMutationOptions, QueryFunctionContext
  const typeImports = [
    ...(hasQuery ? [config.useQueryOptionsType, 'QueryFunctionContext'] : []),
    ...(hasMutation ? [config.useMutationOptionsType] : []),
  ]

  // Vue Query needs MaybeRef type and unref from 'vue' only when query has args
  // (used in makeQueryKeyGetterCode for args:MaybeRef<...> and unref(args))
  const needsVueImports = config.isVueQuery && hasQueryWithArgs

  // Hono client imports
  const honoTypeImports = ['ClientRequestOptions', ...(hasAnyArgs ? ['InferRequestType'] : [])]

  const lines = [
    ...(queryImports.length > 0
      ? [`import{${queryImports.join(',')}}from'${config.packageName}'`]
      : []),
    ...(typeImports.length > 0
      ? [`import type{${typeImports.join(',')}}from'${config.packageName}'`]
      : []),
    // Vue Query needs MaybeRef type and unref from 'vue' for queryKey generation (only when query has args)
    ...(needsVueImports ? ["import{unref}from'vue'", "import type{MaybeRef}from'vue'"] : []),
    `import type{${honoTypeImports.join(',')}}from'hono/client'`,
    `import{parseResponse}from'hono/client'`,
    `import{${clientName}}from'${importPath}'`,
  ]
  return `${lines.join('\n')}\n\n`
}

/* ─────────────────────────────── Entry ─────────────────────────────── */

/**
 * Generates Query hooks from OpenAPI specification.
 *
 * - GET operations generate query hooks
 * - POST/PUT/DELETE/PATCH operations generate mutation hooks
 *
 * @param openAPI - Parsed OpenAPI specification
 * @param output - Output file path or directory
 * @param importPath - Import path for the Hono client
 * @param config - Framework configuration
 * @param split - Whether to split into multiple files (one per hook)
 * @param clientName - Name of the client export (default: 'client')
 * @returns Promise resolving to success message or error
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
    isVueQuery?: boolean
    isSWR?: boolean
    hasQueryOptionsHelper?: boolean
    hasMutationOptionsHelper?: boolean
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

  const hookCodes = makeHookCodes(pathsMaybe, deps, config, clientName)

  const hasAnyArgs = hookCodes.some(({ hasArgs }) => hasArgs)

  // Non-split: write single file
  if (!split) {
    const body = hookCodes.map(({ code }) => code).join('\n\n')
    const hasQuery = hookCodes.some(({ isQuery }) => isQuery)
    const hasMutation = hookCodes.some(({ isQuery }) => !isQuery)
    const hasQueryWithArgs = hookCodes.some(({ isQuery, hasArgs }) => isQuery && hasArgs)
    const header = makeHeader(
      importPath,
      clientName,
      hasQuery,
      hasMutation,
      hasAnyArgs,
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
    new Set(
      hookCodes.map(({ parseResponseFuncName }) => `export * from './${parseResponseFuncName}'`),
    ),
  )
  const index = `${exportLines.join('\n')}\n`

  const allResults = await Promise.all([
    ...hookCodes.map(({ parseResponseFuncName, code, isQuery, hasArgs }) => {
      const hasQueryWithArgs = isQuery && hasArgs
      const header = makeHeader(
        importPath,
        clientName,
        isQuery,
        !isQuery,
        hasArgs,
        config,
        hasQueryWithArgs,
      )
      const fileSrc = `${header}${code}\n`
      const filePath = path.join(outDir, `${parseResponseFuncName}.ts`)
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
