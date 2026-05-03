import path from 'node:path'

import { emit } from '../emit/index.js'
import { isOpenAPIPaths, isOperationLike, isRecord } from '../guard/index.js'
import type { OpenAPI, OpenAPIPaths } from '../openapi/index.js'
import { capitalize, methodPath, toIdentifierPascalCase } from '../utils/index.js'
import {
  formatPath,
  hasNoContentResponse,
  makeOperationDeps,
  operationHasArgs,
  parsePathItem,
  resolveSplitOutDir,
} from './index.js'

/**
 * Convert method + path to hook name.
 *
 * @param method - HTTP method
 * @param pathStr - API path
 * @param prefix - Hook prefix ('use' or 'create')
 * @returns Hook name (e.g., "useGetUsers" or "createGetUsers")
 */
function makeHookName(method: string, pathStr: string, prefix: string) {
  const funcName = methodPath(method, pathStr)
  return `${prefix}${capitalize(funcName)}`
}

/**
 * Creates a response type from parseResponse function name.
 * e.g., 'getUsers' → 'Awaited<ReturnType<typeof getUsers>>'
 */
function makeResponseType(parseResponseFuncName: string): string {
  return `Awaited<ReturnType<typeof ${parseResponseFuncName}>>`
}

/**
 * Creates an InferRequestType string from the client path.
 * e.g., ('client', 'get', '/users') → 'InferRequestType<typeof client.users.$get>'
 * e.g., ('client', 'get', '/users/{id}') → 'InferRequestType<(typeof client.users)[':id']['$get']>'
 */
function makeArgsType(clientName: string, method: string, pathStr: string) {
  const pathResult = formatPath(pathStr)
  const runtimeAccess = `${clientName}${pathResult.runtimePath}.$${method}`
  const typeAccess = pathResult.hasBracket
    ? `typeof ${clientName}${pathResult.typeofPrefix}${pathResult.bracketSuffix}['$${method}']`
    : `typeof ${runtimeAccess}`
  return `InferRequestType<${typeAccess}>`
}

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
) {
  const pathResult = formatPath(pathStr)
  const runtimeAccess = `${clientName}${pathResult.runtimePath}.$${method}`
  if (hasArgs) {
    const argsType = makeArgsType(clientName, method, pathStr)
    return `export async function ${parseResponseFuncName}(args:${argsType},options?:ClientRequestOptions){return await parseResponse(${runtimeAccess}(args,options))}`
  }
  return `export async function ${parseResponseFuncName}(options?:ClientRequestOptions){return await parseResponse(${runtimeAccess}(undefined,options))}`
}

/**
 * Generates the query key getter function name.
 *
 * @param method - HTTP method
 * @param pathStr - API path
 * @param isSWR - Whether to use SWR naming (keeps method prefix, no "Query" suffix)
 * @returns Query key getter function name (e.g., "getUsersQueryKey" or "getGetUsersKey")
 */
function makeQueryKeyGetterName(method: string, pathStr: string, isSWR?: boolean) {
  if (isSWR) {
    return `get${capitalize(methodPath(method, pathStr))}Key`
  }
  return `get${capitalize(methodPath('', pathStr))}QueryKey`
}

/**
 * Generates the infinite query key getter function name.
 *
 * @param method - HTTP method
 * @param pathStr - API path
 * @param isSWR - Whether to use SWR naming (keeps method prefix, no "QueryKey" suffix)
 * @returns Infinite query key getter function name (e.g., "getUsersInfiniteQueryKey" or "getGetUsersInfiniteKey")
 */
function makeInfiniteQueryKeyGetterName(method: string, pathStr: string, isSWR?: boolean) {
  if (isSWR) {
    return `get${capitalize(methodPath(method, pathStr))}InfiniteKey`
  }
  return `get${capitalize(methodPath('', pathStr))}InfiniteQueryKey`
}

/**
 * Generates the query options getter function name.
 *
 * @param pathStr - API path
 * @returns Query options getter function name (e.g., "getUsersQueryOptions")
 */
function makeQueryOptionsGetterName(pathStr: string) {
  return `get${capitalize(methodPath('', pathStr))}QueryOptions`
}

/**
 * Generates query key getter function code using structured keys.
 *
 * Pattern: ['prefix', '/full/path', args?]
 * - prefix: First path segment for prefix filtering (e.g., 'pet')
 * - path: Full path for uniqueness (e.g., '/pet/findByStatus')
 * - args: Request arguments when present
 *
 * This enables consistent filtering:
 * - All pet: invalidateQueries({ queryKey: ['pet'] })
 * - Specific endpoint: invalidateQueries({ queryKey: ['pet', '/pet/findByStatus'] })
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
  config: {
    readonly frameworkName: string
    readonly isVueQuery?: boolean
    readonly isSWR?: boolean
  },
  hasHeader = false,
) {
  // Extract prefix (first path segment without leading slash)
  // e.g., '/pet/findByStatus' → 'pet', '/store/inventory' → 'store'
  const prefix = honoPath.replace(/^\//, '').split('/')[0]
  // Vue Query: uses MaybeRefOrGetter and toValue
  if (config.isVueQuery) {
    if (hasArgs) {
      return `export function ${keyGetterName}(args:MaybeRefOrGetter<${argsType}>){${hasHeader ? 'const{header:_,...keyArgs}=toValue(args);return' : 'return'}['${prefix}','${honoPath}',${hasHeader ? 'keyArgs' : 'args'}]as const}`
    }
    return `export function ${keyGetterName}(){return['${prefix}','${honoPath}']as const}`
  }
  // TanStack Query / Svelte Query / SWR: ['prefix', '/path', args?]
  if (hasArgs) {
    // Exclude 'header' from key per REST principle: headers are metadata, not resource identifiers
    const body = hasHeader
      ? `const{header:_,...keyArgs}=args;return['${prefix}','${honoPath}',keyArgs]as const`
      : `return['${prefix}','${honoPath}',args]as const`
    return `export function ${keyGetterName}(args:${argsType}){${body}}`
  }
  return `export function ${keyGetterName}(){return['${prefix}','${honoPath}']as const}`
}

/**
 * Generates infinite query key getter function code.
 *
 * Same as makeQueryKeyGetterCode but appends 'infinite' to distinguish from standard query keys.
 */
function makeInfiniteQueryKeyGetterCode(
  keyGetterName: string,
  hasArgs: boolean,
  argsType: string,
  honoPath: string,
  config: { readonly frameworkName: string; readonly isVueQuery?: boolean },
  hasHeader = false,
) {
  const prefix = honoPath.replace(/^\//, '').split('/')[0]

  // Vue Query: uses MaybeRefOrGetter and toValue
  if (config.isVueQuery) {
    if (hasArgs) {
      return `export function ${keyGetterName}(args:MaybeRefOrGetter<${argsType}>){${hasHeader ? 'const{header:_,...keyArgs}=toValue(args);return' : 'return'}['${prefix}','${honoPath}',${hasHeader ? 'keyArgs' : 'args'},'infinite']as const}`
    }
    return `export function ${keyGetterName}(){return['${prefix}','${honoPath}','infinite']as const}`
  }
  // TanStack Query / Svelte Query / SWR
  if (hasArgs) {
    const infBody = hasHeader
      ? `const{header:_,...keyArgs}=args;return['${prefix}','${honoPath}',keyArgs,'infinite']as const`
      : `return['${prefix}','${honoPath}',args,'infinite']as const`
    return `export function ${keyGetterName}(args:${argsType}){${infBody}}`
  }
  return `export function ${keyGetterName}(){return['${prefix}','${honoPath}','infinite']as const}`
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
 * @param config - Framework configuration
 * @returns Query options getter function code
 */
function makeQueryOptionsGetterCode(
  optionsGetterName: string,
  keyGetterName: string,
  hasArgs: boolean,
  argsType: string,
  parseResponseFuncName: string,
  config: {
    readonly frameworkName: string
    readonly hasQueryOptionsHelper?: boolean
    readonly isVueQuery?: boolean
  },
) {
  const queryKeyCall = hasArgs ? `${keyGetterName}(args)` : `${keyGetterName}()`
  // Vue Query: use MaybeRefOrGetter for args and toValue in queryFn
  if (config.isVueQuery && hasArgs) {
    const vueFetcherCall = `${parseResponseFuncName}(toValue(args),{...options,init:{...options?.init,signal}})`
    const bodyContent = `queryKey:${queryKeyCall},queryFn({signal}:QueryFunctionContext){return ${vueFetcherCall}}`
    const returnExpr = config.hasQueryOptionsHelper
      ? `queryOptions({${bodyContent}})`
      : `{${bodyContent}}`
    return `export function ${optionsGetterName}(args:MaybeRefOrGetter<${argsType}>,options?:ClientRequestOptions){return ${returnExpr}}`
  }
  // Build fetcher call using parseResponse function
  const fetcherCall = hasArgs
    ? `${parseResponseFuncName}(args,{...options,init:{...options?.init,signal}})`
    : `${parseResponseFuncName}({...options,init:{...options?.init,signal}})`
  // queryOptions() wrap for type safety with TanStack Query
  const bodyContent = `queryKey:${queryKeyCall},queryFn({signal}:QueryFunctionContext){return ${fetcherCall}}`
  const returnExpr = config.hasQueryOptionsHelper
    ? `queryOptions({${bodyContent}})`
    : `{${bodyContent}}`
  if (hasArgs) {
    return `export function ${optionsGetterName}(args:${argsType},options?:ClientRequestOptions){return ${returnExpr}}`
  }
  return `export function ${optionsGetterName}(options?:ClientRequestOptions){return ${returnExpr}}`
}

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
  queryFn = 'useSWR',
) {
  const argsSig = hasArgs ? `args:${argsType},` : ''
  const swrConfigType = 'SWRConfiguration&{swrKey?:Key;enabled?:boolean}'
  const optionsSig = `options?:{swr?:${swrConfigType};options?:ClientRequestOptions}`
  const keyCall = hasArgs ? `${keyGetterName}(args)` : `${keyGetterName}()`
  const fetcherCall = hasArgs
    ? `${parseResponseFuncName}(args,clientOptions)`
    : `${parseResponseFuncName}(clientOptions)`
  return `export function ${hookName}(${argsSig}${optionsSig}){const{swr:swrOptions,options:clientOptions}=options??{};const{swrKey:customKey,enabled,...restSwrOptions}=swrOptions??{};const swrKey=enabled!==false?(customKey??${keyCall}):null;return{swrKey,...${queryFn}(swrKey,async()=>${fetcherCall},restSwrOptions)}}`
}

/**
 * Generates SWR Infinite query hook code.
 *
 * SWR Infinite pattern: useSWRInfinite(getKey, fetcher, options)
 * - getKey: (index: number, previousPageData: Data | null) => Key
 * - fetcher: async function returning data
 * - options: SWRInfiniteConfiguration
 */
function makeSWRInfiniteHookCode(
  hookName: string,
  infiniteKeyGetterName: string,
  hasArgs: boolean,
  argsType: string,
  responseType: string,
  parseResponseFuncName: string,
  errorType = 'Error',
) {
  const argsSig = hasArgs ? `args:${argsType},` : ''
  // TError generic enables custom error types: useInfiniteUsers<APIError>(...)
  const tErrorGeneric = `<TError=${errorType}>`
  const swrConfigType = `SWRInfiniteConfiguration<${responseType},TError>&{swrKey?:SWRInfiniteKeyLoader}`
  const optionsSig = `options:{swr?:${swrConfigType};options?:ClientRequestOptions}`
  const keyCall = hasArgs ? `${infiniteKeyGetterName}(args)` : `${infiniteKeyGetterName}()`
  const fetcherCall = hasArgs
    ? `${parseResponseFuncName}(args,clientOptions)`
    : `${parseResponseFuncName}(clientOptions)`
  return `export function ${hookName}${tErrorGeneric}(${argsSig}${optionsSig}){const{swr:swrOptions,options:clientOptions}=options??{};const{swrKey:customKeyLoader,...restSwrOptions}=swrOptions??{};const keyLoader=customKeyLoader??((index:number)=>[...${keyCall},index]as const);return useSWRInfinite(keyLoader,async()=>${fetcherCall},restSwrOptions)}`
}

function makeQueryHookCode(
  hookName: string,
  keyGetterName: string,
  parseResponseFuncName: string,
  hasArgs: boolean,
  argsType: string,
  responseType: string,
  config: {
    readonly queryFn: string
    readonly useThunk?: boolean
    readonly isVueQuery?: boolean
    readonly useQueryOptionsType: string
    readonly errorType?: string
  },
) {
  const errorType = config.errorType ?? 'Error'
  // TData first so callers can override `select`'s output type without naming TError:
  //   useUsers<string[]>(args, { query: { select: (data) => data.map(u => u.name) } })
  const generics = `<TData=${responseType},TError=${errorType}>`
  const queryOptionsType = `${config.useQueryOptionsType}<${responseType},TError,TData>`
  const optionsType = `{query?:${queryOptionsType};options?:ClientRequestOptions}`
  // Spread user options FIRST, then set concrete queryKey/queryFn AFTER.
  // This avoids exactOptionalPropertyTypes conflicts: queryOptions() return type includes
  // all UseQueryOptions properties (select, queryFn, etc.) as optional. Spreading two
  // sources creates type unions that fail overload resolution. By inlining concrete
  // queryKey/queryFn after the user spread, they always override with non-optional types.
  const keyCall = hasArgs ? `${keyGetterName}(args)` : `${keyGetterName}()`
  // Svelte Query v5+ requires thunk pattern: createQuery(() => options)
  if (config.useThunk) {
    const argsSig = hasArgs ? `args:()=>${argsType},` : ''
    const svelteKeyCall = hasArgs ? `${keyGetterName}(args())` : `${keyGetterName}()`
    const fetcherCall = hasArgs
      ? `${parseResponseFuncName}(args(),{...clientOptions,init:{...clientOptions?.init,signal}})`
      : `${parseResponseFuncName}({...clientOptions,init:{...clientOptions?.init,signal}})`
    return `export function ${hookName}${generics}(${argsSig}options?:()=>${optionsType}){return ${config.queryFn}(()=>{const{query,options:clientOptions}=options?.()??{};return{...query,queryKey:${svelteKeyCall},queryFn({signal}:QueryFunctionContext){return ${fetcherCall}}}})}`
  }
  // Vue Query: args typed as MaybeRefOrGetter
  if (config.isVueQuery) {
    const argsSig = hasArgs ? `args:MaybeRefOrGetter<${argsType}>,` : ''
    const fetcherCall = hasArgs
      ? `${parseResponseFuncName}(toValue(args),{...clientOptions,init:{...clientOptions?.init,signal}})`
      : `${parseResponseFuncName}({...clientOptions,init:{...clientOptions?.init,signal}})`
    return `export function ${hookName}${generics}(${argsSig}options?:${optionsType}){const{query:queryOptions,options:clientOptions}=options??{};return ${config.queryFn}({...queryOptions,queryKey:${keyCall},queryFn({signal}:QueryFunctionContext){return ${fetcherCall}}})}`
  }
  // React TanStack Query: spread user options first, inline queryKey/queryFn after
  const argsSig = hasArgs ? `args:${argsType},` : ''
  const fetcherCall = hasArgs
    ? `${parseResponseFuncName}(args,{...clientOptions,init:{...clientOptions?.init,signal}})`
    : `${parseResponseFuncName}({...clientOptions,init:{...clientOptions?.init,signal}})`
  return `export function ${hookName}${generics}(${argsSig}options?:${optionsType}){const{query:queryOptions,options:clientOptions}=options??{};return ${config.queryFn}({...queryOptions,queryKey:${keyCall},queryFn({signal}:QueryFunctionContext){return ${fetcherCall}}})}`
}

function makeSuspenseQueryHookCode(
  hookName: string,
  keyGetterName: string,
  parseResponseFuncName: string,
  hasArgs: boolean,
  argsType: string,
  responseType: string,
  config: {
    readonly suspenseQueryFn: string
    readonly useSuspenseQueryOptionsType: string
    readonly useThunk?: boolean
    readonly isVueQuery?: boolean
    readonly errorType?: string
  },
) {
  const errorType = config.errorType ?? 'Error'
  // TData first so callers can override `select`'s output type without naming TError.
  const generics = `<TData=${responseType},TError=${errorType}>`
  const queryOptionsType = `${config.useSuspenseQueryOptionsType}<${responseType},TError,TData>`
  const optionsType = `{query?:${queryOptionsType};options?:ClientRequestOptions}`
  // Same spread-first pattern as makeQueryHookCode — see comment there for rationale.
  const keyCall = hasArgs ? `${keyGetterName}(args)` : `${keyGetterName}()`
  // Svelte Query v5+: thunk pattern
  if (config.useThunk) {
    const argsSig = hasArgs ? `args:()=>${argsType},` : ''
    const svelteKeyCall = hasArgs ? `${keyGetterName}(args())` : `${keyGetterName}()`
    const fetcherCall = hasArgs
      ? `${parseResponseFuncName}(args(),{...clientOptions,init:{...clientOptions?.init,signal}})`
      : `${parseResponseFuncName}({...clientOptions,init:{...clientOptions?.init,signal}})`
    return `export function ${hookName}${generics}(${argsSig}options?:()=>${optionsType}){return ${config.suspenseQueryFn}(()=>{const{query,options:clientOptions}=options?.()??{};return{...query,queryKey:${svelteKeyCall},queryFn({signal}:QueryFunctionContext){return ${fetcherCall}}}})}`
  }
  // Vue Query: args typed as MaybeRefOrGetter
  if (config.isVueQuery) {
    const argsSig = hasArgs ? `args:MaybeRefOrGetter<${argsType}>,` : ''
    const fetcherCall = hasArgs
      ? `${parseResponseFuncName}(toValue(args),{...clientOptions,init:{...clientOptions?.init,signal}})`
      : `${parseResponseFuncName}({...clientOptions,init:{...clientOptions?.init,signal}})`
    return `export function ${hookName}${generics}(${argsSig}options?:${optionsType}){const{query:queryOptions,options:clientOptions}=options??{};return ${config.suspenseQueryFn}({...queryOptions,queryKey:${keyCall},queryFn({signal}:QueryFunctionContext){return ${fetcherCall}}})}`
  }
  // React TanStack Query: spread user options first, inline queryKey/queryFn after
  const argsSig = hasArgs ? `args:${argsType},` : ''
  const fetcherCall = hasArgs
    ? `${parseResponseFuncName}(args,{...clientOptions,init:{...clientOptions?.init,signal}})`
    : `${parseResponseFuncName}({...clientOptions,init:{...clientOptions?.init,signal}})`
  return `export function ${hookName}${generics}(${argsSig}options?:${optionsType}){const{query:queryOptions,options:clientOptions}=options??{};return ${config.suspenseQueryFn}({...queryOptions,queryKey:${keyCall},queryFn({signal}:QueryFunctionContext){return ${fetcherCall}}})}`
}

/**
 * Generates the infinite query options getter function name.
 */
function makeInfiniteQueryOptionsGetterName(pathStr: string): string {
  return `get${capitalize(methodPath('', pathStr))}InfiniteQueryOptions`
}

/**
 * Generates infinite query options getter function code.
 *
 * Returns a plain `{queryKey, queryFn}` object (not wrapped with
 * `infiniteQueryOptions()`). The user supplies `getNextPageParam` /
 * `initialPageParam` at the `useInfiniteQuery` call site via the `query`
 * argument, then the spread combines them.
 *
 * Why not `infiniteQueryOptions()` wrap: that helper requires
 * `getNextPageParam` and `initialPageParam` at the type level, which the
 * generator cannot supply (they are pagination-strategy specific and not
 * derivable from the OpenAPI spec). Wrapping creates compile errors;
 * plain object defers the requirement to the user.
 */
function makeInfiniteQueryOptionsGetterCode(
  optionsGetterName: string,
  infiniteKeyGetterName: string,
  hasArgs: boolean,
  argsType: string,
  parseResponseFuncName: string,
  config: {
    readonly frameworkName: string
    readonly isVueQuery?: boolean
  },
) {
  const queryKeyCall = hasArgs ? `${infiniteKeyGetterName}(args)` : `${infiniteKeyGetterName}()`
  // Vue Query: use MaybeRefOrGetter for args and toValue in queryFn
  if (config.isVueQuery && hasArgs) {
    const vueFetcherCall = `${parseResponseFuncName}(toValue(args),{...options,init:{...options?.init,signal}})`
    const bodyContent = `queryKey:${queryKeyCall},queryFn({signal}:QueryFunctionContext){return ${vueFetcherCall}}`
    return `export function ${optionsGetterName}(args:MaybeRefOrGetter<${argsType}>,options?:ClientRequestOptions){return {${bodyContent}}}`
  }
  const fetcherCall = hasArgs
    ? `${parseResponseFuncName}(args,{...options,init:{...options?.init,signal}})`
    : `${parseResponseFuncName}({...options,init:{...options?.init,signal}})`
  const bodyContent = `queryKey:${queryKeyCall},queryFn({signal}:QueryFunctionContext){return ${fetcherCall}}`
  if (hasArgs) {
    return `export function ${optionsGetterName}(args:${argsType},options?:ClientRequestOptions){return {${bodyContent}}}`
  }
  return `export function ${optionsGetterName}(options?:ClientRequestOptions){return {${bodyContent}}}`
}

function makeInfiniteQueryHookCode(
  hookName: string,
  infiniteOptionsGetterName: string,
  infiniteKeyGetterName: string,
  hasArgs: boolean,
  argsType: string,
  responseType: string,
  config: {
    readonly infiniteQueryFn: string
    readonly useInfiniteQueryOptionsType: string
    readonly useThunk?: boolean
    readonly isVueQuery?: boolean
    readonly errorType?: string
  },
) {
  const errorType = config.errorType ?? 'Error'
  // TError generic enables custom error types: useInfiniteUsers<HTTPError>(...)
  const tErrorGeneric = `<TError=${errorType}>`
  // 4th generic (TQueryKey) must match the factory's queryKey literal type, otherwise
  // the user's `query` option signature defaults TQueryKey to `readonly unknown[]` and
  // exactOptionalPropertyTypes catches the mismatch on contravariant fields like
  // `enabled`. Vue's `MaybeRef`-wrapped option types are most sensitive to this.
  const queryKeyType = `ReturnType<typeof ${infiniteKeyGetterName}>`
  const queryOptionsType = `${config.useInfiniteQueryOptionsType}<${responseType},TError,${responseType},${queryKeyType}>`
  const optionsType = `{query:${queryOptionsType};options?:ClientRequestOptions}`
  // Infinite options getter returns plain {queryKey, queryFn}. Spread user options FIRST
  // (provides getNextPageParam, initialPageParam, etc.), then override with concrete queryKey/queryFn.
  // Svelte Query v5+: thunk pattern — createInfiniteQuery(() => options)
  if (config.useThunk) {
    const argsSig = hasArgs ? `args:()=>${argsType},` : ''
    const optionsGetterCall = hasArgs
      ? `${infiniteOptionsGetterName}(args(),clientOptions)`
      : `${infiniteOptionsGetterName}(clientOptions)`
    return `export function ${hookName}${tErrorGeneric}(${argsSig}options:()=>${optionsType}){return ${config.infiniteQueryFn}(()=>{const{query,options:clientOptions}=options();return{...query,...${optionsGetterCall}}})}`
  }
  // Vue Query: args typed as MaybeRefOrGetter
  if (config.isVueQuery) {
    const argsSig = hasArgs ? `args:MaybeRefOrGetter<${argsType}>,` : ''
    const optionsGetterCall = hasArgs
      ? `${infiniteOptionsGetterName}(args,clientOptions)`
      : `${infiniteOptionsGetterName}(clientOptions)`
    return `export function ${hookName}${tErrorGeneric}(${argsSig}options:${optionsType}){const{query:queryOptions,options:clientOptions}=options;return ${config.infiniteQueryFn}({...queryOptions,...${optionsGetterCall}})}`
  }
  // React TanStack Query: spread user options first, then getter overrides queryKey/queryFn
  const argsSig = hasArgs ? `args:${argsType},` : ''
  const optionsGetterCall = hasArgs
    ? `${infiniteOptionsGetterName}(args,clientOptions)`
    : `${infiniteOptionsGetterName}(clientOptions)`
  return `export function ${hookName}${tErrorGeneric}(${argsSig}options:${optionsType}){const{query:queryOptions,options:clientOptions}=options;return ${config.infiniteQueryFn}({...queryOptions,...${optionsGetterCall}})}`
}

function makeSuspenseInfiniteQueryHookCode(
  hookName: string,
  infiniteOptionsGetterName: string,
  infiniteKeyGetterName: string,
  hasArgs: boolean,
  argsType: string,
  responseType: string,
  config: {
    readonly suspenseInfiniteQueryFn: string
    readonly useSuspenseInfiniteQueryOptionsType: string
    readonly useThunk?: boolean
    readonly isVueQuery?: boolean
    readonly errorType?: string
  },
) {
  const errorType = config.errorType ?? 'Error'
  // TError generic enables custom error types
  const tErrorGeneric = `<TError=${errorType}>`
  // See makeInfiniteQueryHookCode — 4th generic must match the factory's queryKey literal.
  const queryKeyType = `ReturnType<typeof ${infiniteKeyGetterName}>`
  const queryOptionsType = `${config.useSuspenseInfiniteQueryOptionsType}<${responseType},TError,${responseType},${queryKeyType}>`
  const optionsType = `{query:${queryOptionsType};options?:ClientRequestOptions}`
  // Same spread-first pattern as makeInfiniteQueryHookCode.
  // Svelte Query v5+: thunk pattern
  if (config.useThunk) {
    const argsSig = hasArgs ? `args:()=>${argsType},` : ''
    const optionsGetterCall = hasArgs
      ? `${infiniteOptionsGetterName}(args(),clientOptions)`
      : `${infiniteOptionsGetterName}(clientOptions)`
    return `export function ${hookName}${tErrorGeneric}(${argsSig}options:()=>${optionsType}){return ${config.suspenseInfiniteQueryFn}(()=>{const{query,options:clientOptions}=options();return{...query,...${optionsGetterCall}}})}`
  }
  // Vue Query: args typed as MaybeRefOrGetter
  if (config.isVueQuery) {
    const argsSig = hasArgs ? `args:MaybeRefOrGetter<${argsType}>,` : ''
    const optionsGetterCall = hasArgs
      ? `${infiniteOptionsGetterName}(args,clientOptions)`
      : `${infiniteOptionsGetterName}(clientOptions)`
    return `export function ${hookName}${tErrorGeneric}(${argsSig}options:${optionsType}){const{query:queryOptions,options:clientOptions}=options;return ${config.suspenseInfiniteQueryFn}({...queryOptions,...${optionsGetterCall}})}`
  }
  // React TanStack Query: spread user options first, then getter overrides queryKey/queryFn
  const argsSig = hasArgs ? `args:${argsType},` : ''
  const optionsGetterCall = hasArgs
    ? `${infiniteOptionsGetterName}(args,clientOptions)`
    : `${infiniteOptionsGetterName}(clientOptions)`
  return `export function ${hookName}${tErrorGeneric}(${argsSig}options:${optionsType}){const{query:queryOptions,options:clientOptions}=options;return ${config.suspenseInfiniteQueryFn}({...queryOptions,...${optionsGetterCall}})}`
}

/**
 * Generates prefix key getter function code.
 *
 * Pattern: ['prefix'] for broad cache invalidation across all methods and paths.
 *
 * This enables:
 * - Invalidate all queries/mutations for a resource: invalidateQueries({ queryKey: getTodosKey() })
 *
 * @see https://tkdodo.eu/blog/effective-react-query-keys
 */
function makePrefixKeyCode(prefix: string) {
  const funcName = `get${toIdentifierPascalCase(prefix)}Key`
  return `export function ${funcName}(){return['${prefix}']as const}`
}

/**
 * Extracts unique prefixes from OpenAPI paths and generates prefix key functions.
 */
function makePrefixKeyCodes(paths: OpenAPIPaths): readonly string[] {
  const prefixes = new Set<string>()
  for (const p of Object.keys(paths)) {
    const prefix = p.replace(/^\//, '').split('/')[0]
    if (prefix) prefixes.add(prefix)
  }
  return [...prefixes].toSorted().map((prefix) => makePrefixKeyCode(prefix))
}

/**
 * Generates the mutation options getter function name.
 *
 * @param method - HTTP method
 * @param pathStr - API path
 * @returns Mutation options getter function name (e.g., "getPutPetMutationOptions")
 */
function makeMutationOptionsGetterName(method: string, pathStr: string) {
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
  hasArgs: boolean,
  argsType: string,
  parseResponseFuncName: string,
  method: string,
  honoPath: string,
  responseType: string,
  hasNoContent: boolean,
  config: {
    readonly frameworkName: string
    readonly hasMutationOptionsHelper?: boolean
    readonly errorType?: string
  },
) {
  const methodUpper = method.toUpperCase()
  const prefix = honoPath.replace(/^\//, '').split('/')[0]
  const inlineKey = `['${prefix}','${honoPath}','${methodUpper}']as const`
  const errorType = config.errorType ?? 'Error'
  // TError generic must be on the factory too — the hook spreads the factory's
  // return into useMutation, so factory's TError must match hook's TError.
  // Without this, the factory's hardcoded `Error` would conflict with the hook's
  // generic `TError` during spread, producing variance errors.
  const tErrorGeneric = `<TError=${errorType}>`
  const dataType = hasNoContent ? `${responseType}|undefined` : responseType
  const variablesType = hasArgs ? argsType : 'void'
  // Pass explicit type args to mutationOptions<TData, TError, TVariables>
  const typeArgs = `<${dataType},TError,${variablesType}>`
  if (hasArgs) {
    const bodyContent = `mutationKey:${inlineKey},async mutationFn(args:${argsType}){return ${parseResponseFuncName}(args,options)}`
    const returnExpr = config.hasMutationOptionsHelper
      ? `mutationOptions${typeArgs}({${bodyContent}})`
      : `{${bodyContent}}`
    return `export function ${optionsGetterName}${tErrorGeneric}(options?:ClientRequestOptions){return ${returnExpr}}`
  }
  const bodyContent = `mutationKey:${inlineKey},async mutationFn(){return ${parseResponseFuncName}(options)}`
  const returnExpr = config.hasMutationOptionsHelper
    ? `mutationOptions${typeArgs}({${bodyContent}})`
    : `{${bodyContent}}`
  return `export function ${optionsGetterName}${tErrorGeneric}(options?:ClientRequestOptions){return ${returnExpr}}`
}

/**
 * Generates the import header for SWR hook files.
 */
function makeSWRHeader(
  importPath: string,
  clientName: string,
  hasQuery: boolean,
  hasMutation: boolean,
  hasAnyArgs: boolean,
  hasInfiniteQuery = false,
) {
  const lines: string[] = []
  // SWR imports - Key is needed for both query and mutation
  if (hasQuery) {
    lines.push("import useSWR from'swr'")
    lines.push("import useSWRImmutable from'swr/immutable'")
    lines.push("import type{Key,SWRConfiguration}from'swr'")
    if (hasInfiniteQuery) {
      lines.push("import useSWRInfinite from'swr/infinite'")
      lines.push("import type{SWRInfiniteConfiguration,SWRInfiniteKeyLoader}from'swr/infinite'")
    }
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
  inlineKey: string,
  hasArgs: boolean,
  argsType: string,
  responseType: string,
  parseResponseFuncName: string,
  hasNoContent: boolean,
  errorType = 'Error',
) {
  const variablesType = hasArgs ? argsType : 'undefined'
  const responseTypeWithUndefined = hasNoContent ? `${responseType}|undefined` : responseType
  // TError generic enables custom error types: usePostUsers<APIError>(...)
  const tErrorGeneric = `<TError=${errorType}>`
  const mutationConfigType = `SWRMutationConfiguration<${responseTypeWithUndefined},TError,Key,${variablesType}>`
  if (hasArgs) {
    const optionsSig = `options?:{mutation?:${mutationConfigType}&{swrKey?:Key};options?:ClientRequestOptions}`
    return `export function ${hookName}${tErrorGeneric}(${optionsSig}){const{mutation:mutationOptions,options:clientOptions}=options??{};const{swrKey:customKey,...restMutationOptions}=mutationOptions??{};const swrKey=customKey??${inlineKey};return{swrKey,...useSWRMutation(swrKey,async(_:Key,{arg}:{arg:${argsType}})=>${parseResponseFuncName}(arg,clientOptions),restMutationOptions)}}`
  }
  // No args - simpler pattern
  const optionsSig = `options?:{mutation?:${mutationConfigType}&{swrKey?:Key};options?:ClientRequestOptions}`
  return `export function ${hookName}${tErrorGeneric}(${optionsSig}){const{mutation:mutationOptions,options:clientOptions}=options??{};const{swrKey:customKey,...restMutationOptions}=mutationOptions??{};const swrKey=customKey??${inlineKey};return{swrKey,...useSWRMutation(swrKey,async()=>${parseResponseFuncName}(clientOptions),restMutationOptions)}}`
}

function makeMutationHookCode(
  hookName: string,
  optionsGetterName: string,
  hasArgs: boolean,
  argsType: string,
  responseType: string,
  config: {
    readonly mutationFn: string
    readonly useThunk?: boolean
    readonly useMutationOptionsType: string
    readonly errorType?: string
  },
  hasNoContent: boolean,
) {
  const variablesType = hasArgs ? argsType : 'void'
  const errorType = config.errorType ?? 'Error'
  // TError generic enables custom error types: usePostUsers<APIError>(...)
  const tErrorGeneric = `<TError=${errorType}>`
  // For 204/205 responses, parseResponse returns undefined
  const dataType = hasNoContent ? `${responseType}|undefined` : responseType
  // Use official TanStack Query mutation options type
  const mutationOptionsType = `${config.useMutationOptionsType}<${dataType},TError,${variablesType}>`
  const optionsType = `{mutation?:${mutationOptionsType};options?:ClientRequestOptions}`
  // Use getMutationOptions to include mutationKey (for setMutationDefaults, isMutating, etc.)
  // Propagate TError to factory call so spread types unify (factory now generic on TError).
  // Svelte Query v5+ requires thunk pattern: createMutation(() => options)
  if (config.useThunk) {
    return `export function ${hookName}${tErrorGeneric}(options?:()=>${optionsType}){return ${config.mutationFn}(()=>{const{mutation,options:clientOptions}=options?.()??{};return{...${optionsGetterName}<TError>(clientOptions),...mutation}})}`
  }
  // React TanStack Query / Vue Query: direct spread
  return `export function ${hookName}${tErrorGeneric}(options?:${optionsType}){const{mutation:mutationOptions,options:clientOptions}=options??{};return ${config.mutationFn}({...${optionsGetterName}<TError>(clientOptions),...mutationOptions})}`
}

function makeHookCode(
  pathStr: string,
  method: 'get' | 'put' | 'post' | 'delete' | 'options' | 'head' | 'patch' | 'trace',
  item: ReturnType<typeof parsePathItem>,
  deps: ReturnType<typeof makeOperationDeps>,
  config: {
    readonly hookPrefix: string
    readonly frameworkName: string
    readonly queryFn: string
    readonly mutationFn: string
    readonly useThunk?: boolean
    readonly useQueryOptionsType: string
    readonly useMutationOptionsType: string
    readonly isVueQuery?: boolean
    readonly isSWR?: boolean
    readonly hasQueryOptionsHelper?: boolean
    readonly hasMutationOptionsHelper?: boolean
    readonly hasInfiniteQueryOptionsHelper?: boolean
    readonly suspenseQueryFn?: string
    readonly infiniteQueryFn?: string
    readonly suspenseInfiniteQueryFn?: string
    readonly useSuspenseQueryOptionsType?: string
    readonly useInfiniteQueryOptionsType?: string
    readonly useSuspenseInfiniteQueryOptionsType?: string
    readonly errorType?: string
    readonly immutableQueryFn?: string
  },
  clientName: string,
) {
  const op = item[method]
  if (!isOperationLike(op)) return null
  const hookName = makeHookName(method, pathStr, config.hookPrefix)
  const hasArgs = operationHasArgs(item, op, deps)
  const isQuery = method === 'get'
  // Detect header parameters for key exclusion (REST: headers are metadata, not resource identifiers)
  const pathLevelParams = deps.toParameterLikes(item.parameters)
  const opParams = deps.toParameterLikes(op.parameters)
  const hasHeaderArgs = [...pathLevelParams, ...opParams].some((p) => p.in === 'header')
  // parseResponse function name (same naming as parseResponse/ generator)
  const parseResponseFuncName = methodPath(method, pathStr)
  const argsType = makeArgsType(clientName, method, pathStr)
  const responseType = makeResponseType(parseResponseFuncName)
  // parseResponse returns undefined for 204/205 No Content responses
  const hasNoContent = hasNoContentResponse(op)
  // Convert {param} to :param for key path display
  const honoPath = pathStr.replace(/\{([^}]+)\}/g, ':$1')
  // Generate inline parseResponse wrapper function
  const wrapperCode = makeParseResponseWrapperCode(
    parseResponseFuncName,
    method,
    pathStr,
    hasArgs,
    clientName,
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
        hasHeaderArgs,
      )
      const hookCode = makeSWRQueryHookCode(
        hookName,
        keyGetterName,
        hasArgs,
        argsType,
        parseResponseFuncName,
        config.queryFn,
      )
      // Immutable hook (useSWRImmutable) - generated by default as best practice
      const immutableHookName = `${config.hookPrefix}Immutable${capitalize(parseResponseFuncName)}`
      const immutableHookCode = config.immutableQueryFn
        ? makeSWRQueryHookCode(
            immutableHookName,
            keyGetterName,
            hasArgs,
            argsType,
            parseResponseFuncName,
            config.immutableQueryFn,
          )
        : null
      // Infinite query support (all GET endpoints)
      const infiniteKeyGetterName = makeInfiniteQueryKeyGetterName(method, pathStr, true)
      const infiniteKeyGetterCode = makeInfiniteQueryKeyGetterCode(
        infiniteKeyGetterName,
        hasArgs,
        argsType,
        honoPath,
        config,
        hasHeaderArgs,
      )
      const infiniteHookName = `${config.hookPrefix}Infinite${capitalize(parseResponseFuncName)}`
      const infiniteHookCode = makeSWRInfiniteHookCode(
        infiniteHookName,
        infiniteKeyGetterName,
        hasArgs,
        argsType,
        responseType,
        parseResponseFuncName,
        config.errorType,
      )
      // Order: key → wrapper → hook → immutableHook → infiniteKey → infiniteHook
      const parts = [
        keyGetterCode,
        wrapperCode,
        hookCode,
        immutableHookCode,
        infiniteKeyGetterCode,
        infiniteHookCode,
      ].filter(Boolean)
      return {
        code: parts.join('\n\n'),
        isQuery: true,
        hasArgs,
        hasInfinite: true,
        parseResponseFuncName,
      } as const
    }
    // SWR mutation
    const prefix = honoPath.replace(/^\//, '').split('/')[0]
    const methodUpper = method.toUpperCase()
    const inlineKey = `['${prefix}','${honoPath}','${methodUpper}']as const`
    const hookCode = makeSWRMutationHookCode(
      hookName,
      inlineKey,
      hasArgs,
      argsType,
      responseType,
      parseResponseFuncName,
      hasNoContent,
      config.errorType,
    )
    return {
      code: `${wrapperCode}\n\n${hookCode}`,
      isQuery: false,
      hasArgs,
      hasInfinite: false,
      parseResponseFuncName,
    } as const
  }
  // TanStack Query / Vue Query / Svelte Query
  if (isQuery) {
    // For queries, use path-only naming (no HTTP method prefix)
    const queryHookName = makeHookName('', pathStr, config.hookPrefix)
    const pathFuncName = methodPath('', pathStr)
    const keyGetterName = makeQueryKeyGetterName(method, pathStr)
    const optionsGetterName = makeQueryOptionsGetterName(pathStr)
    const keyGetterCode = makeQueryKeyGetterCode(
      keyGetterName,
      hasArgs,
      argsType,
      honoPath,
      config,
      hasHeaderArgs,
    )
    const optionsGetterCode = makeQueryOptionsGetterCode(
      optionsGetterName,
      keyGetterName,
      hasArgs,
      argsType,
      parseResponseFuncName,
      config,
    )
    const hookCode = makeQueryHookCode(
      queryHookName,
      keyGetterName,
      parseResponseFuncName,
      hasArgs,
      argsType,
      responseType,
      config,
    )
    // Generate infinite query key getter (only when infinite query hooks are enabled AND endpoint has pagination params)
    const infiniteKeyGetterName = makeInfiniteQueryKeyGetterName(method, pathStr)
    const infiniteOptionsGetterName = makeInfiniteQueryOptionsGetterName(pathStr)
    const { infiniteQueryFn, useInfiniteQueryOptionsType } = config
    const hasInfinite = !!(infiniteQueryFn && useInfiniteQueryOptionsType)
    const infiniteKeyGetterCode = hasInfinite
      ? makeInfiniteQueryKeyGetterCode(
          infiniteKeyGetterName,
          hasArgs,
          argsType,
          honoPath,
          config,
          hasHeaderArgs,
        )
      : null
    // Generate infinite query options getter
    const infiniteOptionsGetterCode = hasInfinite
      ? makeInfiniteQueryOptionsGetterCode(
          infiniteOptionsGetterName,
          infiniteKeyGetterName,
          hasArgs,
          argsType,
          parseResponseFuncName,
          config,
        )
      : null
    // Generate suspense query hook
    const suspenseHookName = `${config.hookPrefix}Suspense${capitalize(pathFuncName)}`
    const suspenseHookCode =
      config.suspenseQueryFn && config.useSuspenseQueryOptionsType
        ? makeSuspenseQueryHookCode(
            suspenseHookName,
            keyGetterName,
            parseResponseFuncName,
            hasArgs,
            argsType,
            responseType,
            {
              suspenseQueryFn: config.suspenseQueryFn,
              useSuspenseQueryOptionsType: config.useSuspenseQueryOptionsType,
              ...(config.useThunk ? { useThunk: true } : {}),
              ...(config.isVueQuery ? { isVueQuery: true } : {}),
              ...(config.errorType ? { errorType: config.errorType } : {}),
            },
          )
        : null
    // Generate infinite query hook
    const infiniteHookName = `${config.hookPrefix}Infinite${capitalize(pathFuncName)}`
    const infiniteHookCode = hasInfinite
      ? makeInfiniteQueryHookCode(
          infiniteHookName,
          infiniteOptionsGetterName,
          infiniteKeyGetterName,
          hasArgs,
          argsType,
          responseType,
          {
            infiniteQueryFn,
            useInfiniteQueryOptionsType,
            ...(config.useThunk ? { useThunk: true } : {}),
            ...(config.isVueQuery ? { isVueQuery: true } : {}),
            ...(config.errorType ? { errorType: config.errorType } : {}),
          },
        )
      : null
    // Generate suspense infinite query hook (only when infinite query is enabled for this endpoint)
    const suspenseInfiniteHookName = `${config.hookPrefix}SuspenseInfinite${capitalize(pathFuncName)}`
    const suspenseInfiniteHookCode =
      hasInfinite && config.suspenseInfiniteQueryFn && config.useSuspenseInfiniteQueryOptionsType
        ? makeSuspenseInfiniteQueryHookCode(
            suspenseInfiniteHookName,
            infiniteOptionsGetterName,
            infiniteKeyGetterName,
            hasArgs,
            argsType,
            responseType,
            {
              suspenseInfiniteQueryFn: config.suspenseInfiniteQueryFn,
              useSuspenseInfiniteQueryOptionsType: config.useSuspenseInfiniteQueryOptionsType,
              ...(config.useThunk ? { useThunk: true } : {}),
              ...(config.isVueQuery ? { isVueQuery: true } : {}),
              ...(config.errorType ? { errorType: config.errorType } : {}),
            },
          )
        : null
    // Order: key → wrapper → options → hook → suspenseHook → infiniteKey → infiniteOptions → infiniteHook → suspenseInfiniteHook
    const parts = [
      keyGetterCode,
      wrapperCode,
      optionsGetterCode,
      hookCode,
      suspenseHookCode,
      infiniteKeyGetterCode,
      infiniteOptionsGetterCode,
      infiniteHookCode,
      suspenseInfiniteHookCode,
    ].filter(Boolean)
    return {
      code: parts.join('\n\n'),
      isQuery: true,
      hasArgs,
      hasInfinite,
      parseResponseFuncName,
    } as const
  }
  // Generate mutation options getter (mutation key is inlined)
  const optionsGetterName = makeMutationOptionsGetterName(method, pathStr)
  const optionsGetterCode = makeMutationOptionsGetterCode(
    optionsGetterName,
    hasArgs,
    argsType,
    parseResponseFuncName,
    method,
    honoPath,
    responseType,
    hasNoContent,
    config,
  )
  const hookCode = makeMutationHookCode(
    hookName,
    optionsGetterName,
    hasArgs,
    argsType,
    responseType,
    config,
    hasNoContent,
  )
  // Order: wrapper → options → hook
  return {
    code: `${wrapperCode}\n\n${optionsGetterCode}\n\n${hookCode}`,
    isQuery: false,
    hasArgs,
    hasInfinite: false,
    parseResponseFuncName,
  }
}

function makeHookCodes(
  paths: OpenAPIPaths,
  deps: ReturnType<typeof makeOperationDeps>,
  config: {
    readonly hookPrefix: string
    readonly frameworkName: string
    readonly queryFn: string
    readonly mutationFn: string
    readonly useThunk?: boolean
    readonly useQueryOptionsType: string
    readonly useMutationOptionsType: string
    readonly isVueQuery?: boolean
    readonly isSWR?: boolean
    readonly hasQueryOptionsHelper?: boolean
    readonly hasMutationOptionsHelper?: boolean
    readonly hasInfiniteQueryOptionsHelper?: boolean
    readonly suspenseQueryFn?: string
    readonly infiniteQueryFn?: string
    readonly suspenseInfiniteQueryFn?: string
    readonly useSuspenseQueryOptionsType?: string
    readonly useInfiniteQueryOptionsType?: string
    readonly useSuspenseInfiniteQueryOptionsType?: string
    readonly errorType?: string
    readonly immutableQueryFn?: string
  },
  clientName: string,
): readonly {
  readonly hookName: string
  readonly code: string
  readonly isQuery: boolean
  readonly hasArgs: boolean
  readonly hasInfinite: boolean
  readonly parseResponseFuncName: string
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
                hasInfinite: result.hasInfinite,
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
            hasInfinite: boolean
            parseResponseFuncName: string
          } => item !== null,
        )
    })
}

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
    readonly packageName: string
    readonly queryFn: string
    readonly mutationFn: string
    readonly useQueryOptionsType: string
    readonly useMutationOptionsType: string
    readonly isVueQuery?: boolean
    readonly isSWR?: boolean
    readonly hasQueryOptionsHelper?: boolean
    readonly hasMutationOptionsHelper?: boolean
    readonly hasInfiniteQueryOptionsHelper?: boolean
    readonly suspenseQueryFn?: string
    readonly infiniteQueryFn?: string
    readonly suspenseInfiniteQueryFn?: string
    readonly useSuspenseQueryOptionsType?: string
    readonly useInfiniteQueryOptionsType?: string
    readonly useSuspenseInfiniteQueryOptionsType?: string
    readonly immutableQueryFn?: string
  },
  hasQueryWithArgs = false,
  hasInfiniteQuery = false,
): string {
  // SWR has different import structure
  if (config.isSWR) {
    return makeSWRHeader(
      importPath,
      clientName,
      hasQuery,
      hasMutation,
      hasAnyArgs,
      hasInfiniteQuery,
    )
  }
  const queryImports = [
    ...(hasQuery ? [config.queryFn] : []),
    ...(hasQuery && config.suspenseQueryFn ? [config.suspenseQueryFn] : []),
    ...(hasInfiniteQuery && config.infiniteQueryFn ? [config.infiniteQueryFn] : []),
    ...(hasInfiniteQuery && config.suspenseInfiniteQueryFn ? [config.suspenseInfiniteQueryFn] : []),
    ...(hasMutation ? [config.mutationFn] : []),
    ...(hasQuery && config.hasQueryOptionsHelper ? ['queryOptions'] : []),
    // infiniteQueryOptions intentionally not imported: the helper requires
    // `getNextPageParam`/`initialPageParam` at the type level, which the
    // generator cannot supply. Factory returns plain `{queryKey, queryFn}`
    // and user supplies pagination params at the hook call site.
    ...(hasMutation && config.hasMutationOptionsHelper ? ['mutationOptions'] : []),
  ]
  // Type imports for options - UseQueryOptions, UseMutationOptions, QueryFunctionContext
  const typeImports = [
    ...(hasQuery ? [config.useQueryOptionsType, 'QueryFunctionContext'] : []),
    ...(hasQuery && config.useSuspenseQueryOptionsType ? [config.useSuspenseQueryOptionsType] : []),
    ...(hasInfiniteQuery && config.useInfiniteQueryOptionsType
      ? [config.useInfiniteQueryOptionsType]
      : []),
    ...(hasInfiniteQuery && config.useSuspenseInfiniteQueryOptionsType
      ? [config.useSuspenseInfiniteQueryOptionsType]
      : []),
    ...(hasMutation ? [config.useMutationOptionsType] : []),
  ]
  // Vue Query needs MaybeRefOrGetter type and toValue from 'vue' only when query has args
  // (used in makeQueryKeyGetterCode for args:MaybeRefOrGetter<...> and toValue(args))
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
    // Vue Query needs MaybeRefOrGetter type and toValue from 'vue' for queryKey generation (only when query has args)
    ...(needsVueImports
      ? ["import{toValue}from'vue'", "import type{MaybeRefOrGetter}from'vue'"]
      : []),
    `import type{${honoTypeImports.join(',')}}from'hono/client'`,
    `import{parseResponse}from'hono/client'`,
    `import{${clientName}}from'${importPath}'`,
  ]
  return `${lines.join('\n')}\n\n`
}

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
  output: string,
  importPath: string,
  config: {
    readonly packageName: string
    readonly frameworkName: string
    readonly hookPrefix: string
    readonly queryFn: string
    readonly mutationFn: string
    readonly useThunk?: boolean
    readonly useQueryOptionsType: string
    readonly useMutationOptionsType: string
    readonly isVueQuery?: boolean
    readonly isSWR?: boolean
    readonly hasQueryOptionsHelper?: boolean
    readonly hasMutationOptionsHelper?: boolean
    readonly hasInfiniteQueryOptionsHelper?: boolean
    readonly suspenseQueryFn?: string
    readonly infiniteQueryFn?: string
    readonly suspenseInfiniteQueryFn?: string
    readonly useSuspenseQueryOptionsType?: string
    readonly useInfiniteQueryOptionsType?: string
    readonly useSuspenseInfiniteQueryOptionsType?: string
    readonly errorType?: string
    readonly immutableQueryFn?: string
  },
  split?: boolean,
  clientName = 'client',
) {
  const pathsMaybe = openAPI.paths
  if (!isOpenAPIPaths(pathsMaybe)) {
    return { ok: false, error: 'Invalid OpenAPI paths' } as const
  }
  const componentsParameters = openAPI.components?.parameters ?? {}
  const componentsRequestBodies = openAPI.components?.requestBodies ?? {}
  const deps = makeOperationDeps(clientName, componentsParameters, componentsRequestBodies)
  const hookCodes = makeHookCodes(pathsMaybe, deps, config, clientName)
  const prefixKeyCodes = makePrefixKeyCodes(pathsMaybe)
  const hasAnyArgs = hookCodes.some(({ hasArgs }) => hasArgs)
  if (!split) {
    const prefixBody = prefixKeyCodes.join('\n\n')
    const hookBody = hookCodes.map(({ code }) => code).join('\n\n')
    const body = prefixBody + (prefixBody && hookBody ? '\n\n' : '') + hookBody
    const hasQuery = hookCodes.some(({ isQuery }) => isQuery)
    const hasMutation = hookCodes.some(({ isQuery }) => !isQuery)
    const hasQueryWithArgs = hookCodes.some(({ isQuery, hasArgs }) => isQuery && hasArgs)
    const hasInfiniteQuery = hookCodes.some(({ hasInfinite }) => hasInfinite)
    const header = makeHeader(
      importPath,
      clientName,
      hasQuery,
      hasMutation,
      hasAnyArgs,
      config,
      hasQueryWithArgs,
      hasInfiniteQuery,
    )
    const code = `${header}${body}${hookCodes.length ? '\n' : ''}`
    const emitResult = await emit(code, path.dirname(output), output)
    if (!emitResult.ok) return { ok: false, error: emitResult.error } as const
    return {
      ok: true,
      value: `Generated ${config.frameworkName.toLowerCase().replace(/ /g, '-')} hooks written to ${output}`,
    } as const
  }
  const { outDir, indexPath } = resolveSplitOutDir(output)
  const prefixKeyFileName = '_keys'
  const exportLines = Array.from(
    new Set([
      ...(prefixKeyCodes.length > 0 ? [`export * from './${prefixKeyFileName}'`] : []),
      ...hookCodes.map(({ parseResponseFuncName }) => `export * from './${parseResponseFuncName}'`),
    ]),
  )
  const index = `${exportLines.join('\n')}\n`
  const results = await Promise.all([
    ...(prefixKeyCodes.length > 0
      ? [
          emit(
            `${prefixKeyCodes.join('\n\n')}\n`,
            path.dirname(path.join(outDir, `${prefixKeyFileName}.ts`)),
            path.join(outDir, `${prefixKeyFileName}.ts`),
          ),
        ]
      : []),
    ...hookCodes.map(({ parseResponseFuncName, code, isQuery, hasArgs, hasInfinite }) => {
      const hasQueryWithArgs = isQuery && hasArgs
      const header = makeHeader(
        importPath,
        clientName,
        isQuery,
        !isQuery,
        hasArgs,
        config,
        hasQueryWithArgs,
        hasInfinite,
      )
      const fileSrc = `${header}${code}\n`
      const filePath = path.join(outDir, `${parseResponseFuncName}.ts`)
      return emit(fileSrc, path.dirname(filePath), filePath)
    }),
    emit(index, path.dirname(indexPath), indexPath),
  ])
  const firstError = results.find((result) => !result.ok)
  if (firstError && !firstError.ok) return { ok: false, error: firstError.error } as const
  return {
    ok: true,
    value: `Generated ${config.frameworkName.toLowerCase().replace(/ /g, '-')} hooks written to ${outDir}/*.ts (index.ts included)`,
  } as const
}
