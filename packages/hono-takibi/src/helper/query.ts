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

function makeHookName(method: string, pathStr: string, prefix: string) {
  const funcName = methodPath(method, pathStr)
  return `${prefix}${capitalize(funcName)}`
}

// e.g. ('client','get','/users/{id}') → "client.users[':id'].$get"
function makeRuntimeAccess(clientName: string, method: string, pathStr: string) {
  const pathResult = formatPath(pathStr)
  return `${clientName}${pathResult.runtimePath}.$${method}`
}

// Chains Awaited/ReturnType/typeof parseResponse to derive parsed JSON shape.
function makeResponseTypeFromClient(clientName: string, method: string, pathStr: string) {
  const pathResult = formatPath(pathStr)
  const runtimeAccess = `${clientName}${pathResult.runtimePath}.$${method}`
  const typeAccess = pathResult.hasBracket
    ? `typeof ${clientName}${pathResult.typeofPrefix}${pathResult.bracketSuffix}['$${method}']`
    : `typeof ${runtimeAccess}`
  return `Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<${typeAccess}>>>>>`
}

function makeArgsType(clientName: string, method: string, pathStr: string) {
  const pathResult = formatPath(pathStr)
  const runtimeAccess = `${clientName}${pathResult.runtimePath}.$${method}`
  const typeAccess = pathResult.hasBracket
    ? `typeof ${clientName}${pathResult.typeofPrefix}${pathResult.bracketSuffix}['$${method}']`
    : `typeof ${runtimeAccess}`
  return `InferRequestType<${typeAccess}>`
}

function makeQueryKeyGetterName(method: string, pathStr: string, isSWR?: boolean) {
  if (isSWR) {
    return `get${capitalize(methodPath(method, pathStr))}Key`
  }
  return `get${capitalize(methodPath('', pathStr))}QueryKey`
}

function makeInfiniteQueryKeyGetterName(method: string, pathStr: string, isSWR?: boolean) {
  if (isSWR) {
    return `get${capitalize(methodPath(method, pathStr))}InfiniteKey`
  }
  return `get${capitalize(methodPath('', pathStr))}InfiniteQueryKey`
}

function makeQueryOptionsGetterName(pathStr: string) {
  return `get${capitalize(methodPath('', pathStr))}QueryOptions`
}

function makeInfiniteQueryOptionsGetterName(pathStr: string) {
  return `get${capitalize(methodPath('', pathStr))}InfiniteQueryOptions`
}

function makeMutationOptionsGetterName(method: string, pathStr: string) {
  return `get${capitalize(methodPath(method, pathStr))}MutationOptions`
}

// Structured key pattern: ['prefix','/full/path',args?] enables both per-prefix
// and per-endpoint invalidation.
// @see https://tanstack.com/query/latest/docs/framework/react/guides/query-keys
// @see https://swr.vercel.app/docs/arguments
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
  // First path segment, e.g. '/pet/findByStatus' → 'pet'
  const prefix = honoPath.replace(/^\//, '').split('/')[0]
  if (config.isVueQuery) {
    if (hasArgs) {
      return `export function ${keyGetterName}(args:MaybeRefOrGetter<${argsType}>){${hasHeader ? 'const{header:_,...keyArgs}=toValue(args);return' : 'return'}['${prefix}','${honoPath}',${hasHeader ? 'keyArgs' : 'args'}]as const}`
    }
    return `export function ${keyGetterName}(){return['${prefix}','${honoPath}']as const}`
  }
  if (hasArgs) {
    // REST: headers are metadata, not resource identifiers — excluded from key.
    const body = hasHeader
      ? `const{header:_,...keyArgs}=args;return['${prefix}','${honoPath}',keyArgs]as const`
      : `return['${prefix}','${honoPath}',args]as const`
    return `export function ${keyGetterName}(args:${argsType}){${body}}`
  }
  return `export function ${keyGetterName}(){return['${prefix}','${honoPath}']as const}`
}

// Same as makeQueryKeyGetterCode but appends 'infinite' to the key tuple.
function makeInfiniteQueryKeyGetterCode(
  keyGetterName: string,
  hasArgs: boolean,
  argsType: string,
  honoPath: string,
  config: { readonly frameworkName: string; readonly isVueQuery?: boolean },
  hasHeader = false,
) {
  const prefix = honoPath.replace(/^\//, '').split('/')[0]

  if (config.isVueQuery) {
    if (hasArgs) {
      return `export function ${keyGetterName}(args:MaybeRefOrGetter<${argsType}>){${hasHeader ? 'const{header:_,...keyArgs}=toValue(args);return' : 'return'}['${prefix}','${honoPath}',${hasHeader ? 'keyArgs' : 'args'},'infinite']as const}`
    }
    return `export function ${keyGetterName}(){return['${prefix}','${honoPath}','infinite']as const}`
  }
  if (hasArgs) {
    const infBody = hasHeader
      ? `const{header:_,...keyArgs}=args;return['${prefix}','${honoPath}',keyArgs,'infinite']as const`
      : `return['${prefix}','${honoPath}',args,'infinite']as const`
    return `export function ${keyGetterName}(args:${argsType}){${infBody}}`
  }
  return `export function ${keyGetterName}(){return['${prefix}','${honoPath}','infinite']as const}`
}

/**
 * Generates the query options factory.
 *
 * The factory returns either a `queryOptions({...})`-branded options object
 * (when the framework provides the helper) or a plain `{queryKey, queryFn}` literal.
 * `queryFn` inlines `parseResponse(client.x.$y(...))` directly so no fetcher wrapper is needed.
 *
 * @see https://tanstack.com/query/latest/docs/framework/react/guides/query-options
 */
function makeQueryOptionsGetterCode(
  optionsGetterName: string,
  keyGetterName: string,
  hasArgs: boolean,
  argsType: string,
  runtimeAccess: string,
  config: {
    readonly hasQueryOptionsHelper?: boolean
    readonly isVueQuery?: boolean
  },
) {
  const queryKeyCall = hasArgs ? `${keyGetterName}(args)` : `${keyGetterName}()`
  // With `queryOptions(...)` helper, `signal` is contextually typed; without, annotate explicitly.
  const queryFnSig = config.hasQueryOptionsHelper ? '{signal}' : '{signal}:QueryFunctionContext'
  if (config.isVueQuery && hasArgs) {
    const fetcherCall = `parseResponse(${runtimeAccess}(toValue(args),{...options,init:{...options?.init,signal}}))`
    const bodyContent = `queryKey:${queryKeyCall},queryFn(${queryFnSig}){return ${fetcherCall}}`
    const returnExpr = config.hasQueryOptionsHelper
      ? `queryOptions({${bodyContent}})`
      : `{${bodyContent}}`
    return `export function ${optionsGetterName}(args:MaybeRefOrGetter<${argsType}>,options?:ClientRequestOptions){return ${returnExpr}}`
  }
  const fetcherCall = hasArgs
    ? `parseResponse(${runtimeAccess}(args,{...options,init:{...options?.init,signal}}))`
    : `parseResponse(${runtimeAccess}(undefined,{...options,init:{...options?.init,signal}}))`
  const bodyContent = `queryKey:${queryKeyCall},queryFn(${queryFnSig}){return ${fetcherCall}}`
  const returnExpr = config.hasQueryOptionsHelper
    ? `queryOptions({${bodyContent}})`
    : `{${bodyContent}}`
  if (hasArgs) {
    return `export function ${optionsGetterName}(args:${argsType},options?:ClientRequestOptions){return ${returnExpr}}`
  }
  return `export function ${optionsGetterName}(options?:ClientRequestOptions){return ${returnExpr}}`
}

// With helper: wraps `infiniteQueryOptions({...})` + required `pagination` arg.
// Without: plain `{queryKey, queryFn}`; caller supplies pagination at hook site.
function makeInfiniteQueryOptionsGetterCode(
  optionsGetterName: string,
  infiniteKeyGetterName: string,
  hasArgs: boolean,
  argsType: string,
  runtimeAccess: string,
  responseType: string,
  config: {
    readonly isVueQuery?: boolean
    readonly hasInfiniteQueryOptionsHelper?: boolean
  },
) {
  const queryKeyCall = hasArgs ? `${infiniteKeyGetterName}(args)` : `${infiniteKeyGetterName}()`
  if (config.hasInfiniteQueryOptionsHelper) {
    const paginationParam = `pagination:{initialPageParam:TPageParam;getNextPageParam:(lastPage:${responseType},allPages:${responseType}[],lastPageParam:TPageParam)=>TPageParam|undefined|null}`
    if (config.isVueQuery && hasArgs) {
      const fetcherCall = `parseResponse(${runtimeAccess}(toValue(args),{...options,init:{...options?.init,signal}}))`
      const body = `queryKey:${queryKeyCall},queryFn({signal}:QueryFunctionContext){return ${fetcherCall}},initialPageParam:pagination.initialPageParam,getNextPageParam:pagination.getNextPageParam`
      return `export function ${optionsGetterName}<TPageParam=unknown>(args:MaybeRefOrGetter<${argsType}>,${paginationParam},options?:ClientRequestOptions){return infiniteQueryOptions({${body}})}`
    }
    const fetcherCall = hasArgs
      ? `parseResponse(${runtimeAccess}(args,{...options,init:{...options?.init,signal}}))`
      : `parseResponse(${runtimeAccess}(undefined,{...options,init:{...options?.init,signal}}))`
    const body = `queryKey:${queryKeyCall},queryFn({signal}:QueryFunctionContext){return ${fetcherCall}},initialPageParam:pagination.initialPageParam,getNextPageParam:pagination.getNextPageParam`
    if (hasArgs) {
      return `export function ${optionsGetterName}<TPageParam=unknown>(args:${argsType},${paginationParam},options?:ClientRequestOptions){return infiniteQueryOptions({${body}})}`
    }
    return `export function ${optionsGetterName}<TPageParam=unknown>(${paginationParam},options?:ClientRequestOptions){return infiniteQueryOptions({${body}})}`
  }
  // Branch 2: plain object (legacy / no helper)
  if (config.isVueQuery && hasArgs) {
    const fetcherCall = `parseResponse(${runtimeAccess}(toValue(args),{...options,init:{...options?.init,signal}}))`
    const bodyContent = `queryKey:${queryKeyCall},queryFn({signal}:QueryFunctionContext){return ${fetcherCall}}`
    return `export function ${optionsGetterName}(args:MaybeRefOrGetter<${argsType}>,options?:ClientRequestOptions){return {${bodyContent}}}`
  }
  const fetcherCall = hasArgs
    ? `parseResponse(${runtimeAccess}(args,{...options,init:{...options?.init,signal}}))`
    : `parseResponse(${runtimeAccess}(undefined,{...options,init:{...options?.init,signal}}))`
  const bodyContent = `queryKey:${queryKeyCall},queryFn({signal}:QueryFunctionContext){return ${fetcherCall}}`
  if (hasArgs) {
    return `export function ${optionsGetterName}(args:${argsType},options?:ClientRequestOptions){return {${bodyContent}}}`
  }
  return `export function ${optionsGetterName}(options?:ClientRequestOptions){return {${bodyContent}}}`
}

function makeMutationOptionsGetterCode(
  optionsGetterName: string,
  hasArgs: boolean,
  argsType: string,
  runtimeAccess: string,
  method: string,
  honoPath: string,
  responseType: string,
  hasNoContent: boolean,
  config: {
    readonly hasMutationOptionsHelper?: boolean
    readonly errorType?: string
  },
) {
  const methodUpper = method.toUpperCase()
  const prefix = honoPath.replace(/^\//, '').split('/')[0]
  const inlineKey = `['${prefix}','${honoPath}','${methodUpper}']as const`
  const errorType = config.errorType ?? 'unknown'
  // TError is only useful when wrapped by `mutationOptions<...>`.
  const tErrorGeneric = config.hasMutationOptionsHelper ? `<TError=${errorType}>` : ''
  const dataType = hasNoContent ? `${responseType}|undefined` : responseType
  const variablesType = hasArgs ? argsType : 'void'
  const typeArgs = `<${dataType},TError,${variablesType}>`
  if (hasArgs) {
    const bodyContent = `mutationKey:${inlineKey},async mutationFn(args:${argsType}){return parseResponse(${runtimeAccess}(args,options))}`
    const returnExpr = config.hasMutationOptionsHelper
      ? `mutationOptions${typeArgs}({${bodyContent}})`
      : `{${bodyContent}}`
    return `export function ${optionsGetterName}${tErrorGeneric}(options?:ClientRequestOptions){return ${returnExpr}}`
  }
  const bodyContent = `mutationKey:${inlineKey},async mutationFn(){return parseResponse(${runtimeAccess}(undefined,options))}`
  const returnExpr = config.hasMutationOptionsHelper
    ? `mutationOptions${typeArgs}({${bodyContent}})`
    : `{${bodyContent}}`
  return `export function ${optionsGetterName}${tErrorGeneric}(options?:ClientRequestOptions){return ${returnExpr}}`
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
  runtimeAccess: string,
  queryFn = 'useSWR',
) {
  const argsSig = hasArgs ? `args:${argsType},` : ''
  const swrConfigType = 'SWRConfiguration&{swrKey?:Key;enabled?:boolean}'
  const optionsSig = `options?:{swr?:${swrConfigType};options?:ClientRequestOptions}`
  const keyCall = hasArgs ? `${keyGetterName}(args)` : `${keyGetterName}()`
  const fetcherCall = hasArgs
    ? `parseResponse(${runtimeAccess}(args,clientOptions))`
    : `parseResponse(${runtimeAccess}(undefined,clientOptions))`
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
  runtimeAccess: string,
  errorType = 'unknown',
) {
  const argsSig = hasArgs ? `args:${argsType},` : ''
  // TError generic enables custom error types: useInfiniteUsers<APIError>(...)
  const tErrorGeneric = `<TError=${errorType}>`
  const swrConfigType = `SWRInfiniteConfiguration<${responseType},TError>&{swrKey?:SWRInfiniteKeyLoader}`
  const optionsSig = `options:{swr?:${swrConfigType};options?:ClientRequestOptions}`
  const keyCall = hasArgs ? `${infiniteKeyGetterName}(args)` : `${infiniteKeyGetterName}()`
  const fetcherCall = hasArgs
    ? `parseResponse(${runtimeAccess}(args,clientOptions))`
    : `parseResponse(${runtimeAccess}(undefined,clientOptions))`
  return `export function ${hookName}${tErrorGeneric}(${argsSig}${optionsSig}){const{swr:swrOptions,options:clientOptions}=options??{};const{swrKey:customKeyLoader,...restSwrOptions}=swrOptions??{};const keyLoader=customKeyLoader??((index:number)=>[...${keyCall},index]as const);return useSWRInfinite(keyLoader,async()=>${fetcherCall},restSwrOptions)}`
}

/**
 * Generates a query hook with inline queryKey + queryFn. The hook builds its own
 * options object rather than spreading the matching `getXQueryOptions` factory.
 * Why: `queryOptions()` brands its result with `DataTag`, fixing `queryKey` to a
 * narrow literal tuple and `TError` to `DefaultError`. Both land in contravariant
 * positions of the hook's wide generic options type (`queryKey: readonly unknown[]`,
 * caller-supplied `TError`), so spreading the factory is not assignable — this holds
 * for the regular hook too, independent of its generics, not just the suspense one.
 * Inlining keeps every hook (regular + suspense + infinite) on one
 * factory-compatible shape sharing a single parseResponse call.
 *
 * The queryFn calls the Hono client (`client.x.$y`) directly rather than importing a
 * generated `rpc` fetcher. This is not about layering aesthetics (regenerated codegen
 * tolerates such duplication): it keeps each framework's output self-contained — depending
 * only on `hono/client` + the client, generatable in isolation — and keeps the response
 * type, request call, and `signal` injection all derived from that one client, so hook
 * inference never becomes coupled to a separate fetcher's signature.
 * @see https://tanstack.com/query/latest/docs/framework/react/typescript#typing-query-options
 */
function makeQueryHookCode(
  hookName: string,
  keyGetterName: string,
  runtimeAccess: string,
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
  const errorType = config.errorType ?? 'unknown'
  // TData first so callers can override `select`'s output type without naming TError:
  //   useUsers<string[]>(args, { query: { select: (data) => data.map(u => u.name) } })
  const generics = `<TData=${responseType},TError=${errorType}>`
  const queryOptionsType = `${config.useQueryOptionsType}<${responseType},TError,TData>`
  const optionsType = `{query?:${queryOptionsType};options?:ClientRequestOptions}`
  const keyCall = hasArgs ? `${keyGetterName}(args)` : `${keyGetterName}()`
  // Svelte Query v5+ requires thunk pattern: createQuery(() => options)
  if (config.useThunk) {
    const argsSig = hasArgs ? `args:()=>${argsType},` : ''
    const svelteKeyCall = hasArgs ? `${keyGetterName}(args())` : `${keyGetterName}()`
    const fetcherCall = hasArgs
      ? `parseResponse(${runtimeAccess}(args(),{...clientOptions,init:{...clientOptions?.init,signal}}))`
      : `parseResponse(${runtimeAccess}(undefined,{...clientOptions,init:{...clientOptions?.init,signal}}))`
    return `export function ${hookName}${generics}(${argsSig}options?:()=>${optionsType}){return ${config.queryFn}(()=>{const{query,options:clientOptions}=options?.()??{};return{...query,queryKey:${svelteKeyCall},queryFn({signal}:QueryFunctionContext){return ${fetcherCall}}}})}`
  }
  if (config.isVueQuery) {
    const argsSig = hasArgs ? `args:MaybeRefOrGetter<${argsType}>,` : ''
    const fetcherCall = hasArgs
      ? `parseResponse(${runtimeAccess}(toValue(args),{...clientOptions,init:{...clientOptions?.init,signal}}))`
      : `parseResponse(${runtimeAccess}(undefined,{...clientOptions,init:{...clientOptions?.init,signal}}))`
    return `export function ${hookName}${generics}(${argsSig}options?:${optionsType}){const{query:queryOptions,options:clientOptions}=options??{};return ${config.queryFn}({...queryOptions,queryKey:${keyCall},queryFn({signal}){return ${fetcherCall}}})}`
  }
  const argsSig = hasArgs ? `args:${argsType},` : ''
  const fetcherCall = hasArgs
    ? `parseResponse(${runtimeAccess}(args,{...clientOptions,init:{...clientOptions?.init,signal}}))`
    : `parseResponse(${runtimeAccess}(undefined,{...clientOptions,init:{...clientOptions?.init,signal}}))`
  return `export function ${hookName}${generics}(${argsSig}options?:${optionsType}){const{query:queryOptions,options:clientOptions}=options??{};return ${config.queryFn}({...queryOptions,queryKey:${keyCall},queryFn({signal}:QueryFunctionContext){return ${fetcherCall}}})}`
}

function makeSuspenseQueryHookCode(
  hookName: string,
  keyGetterName: string,
  runtimeAccess: string,
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
  const errorType = config.errorType ?? 'unknown'
  const generics = `<TData=${responseType},TError=${errorType}>`
  const queryOptionsType = `${config.useSuspenseQueryOptionsType}<${responseType},TError,TData>`
  const optionsType = `{query?:${queryOptionsType};options?:ClientRequestOptions}`
  const keyCall = hasArgs ? `${keyGetterName}(args)` : `${keyGetterName}()`
  if (config.useThunk) {
    const argsSig = hasArgs ? `args:()=>${argsType},` : ''
    const svelteKeyCall = hasArgs ? `${keyGetterName}(args())` : `${keyGetterName}()`
    const fetcherCall = hasArgs
      ? `parseResponse(${runtimeAccess}(args(),{...clientOptions,init:{...clientOptions?.init,signal}}))`
      : `parseResponse(${runtimeAccess}(undefined,{...clientOptions,init:{...clientOptions?.init,signal}}))`
    return `export function ${hookName}${generics}(${argsSig}options?:()=>${optionsType}){return ${config.suspenseQueryFn}(()=>{const{query,options:clientOptions}=options?.()??{};return{...query,queryKey:${svelteKeyCall},queryFn({signal}:QueryFunctionContext){return ${fetcherCall}}}})}`
  }
  if (config.isVueQuery) {
    const argsSig = hasArgs ? `args:MaybeRefOrGetter<${argsType}>,` : ''
    const fetcherCall = hasArgs
      ? `parseResponse(${runtimeAccess}(toValue(args),{...clientOptions,init:{...clientOptions?.init,signal}}))`
      : `parseResponse(${runtimeAccess}(undefined,{...clientOptions,init:{...clientOptions?.init,signal}}))`
    return `export function ${hookName}${generics}(${argsSig}options?:${optionsType}){const{query:queryOptions,options:clientOptions}=options??{};return ${config.suspenseQueryFn}({...queryOptions,queryKey:${keyCall},queryFn({signal}){return ${fetcherCall}}})}`
  }
  const argsSig = hasArgs ? `args:${argsType},` : ''
  const fetcherCall = hasArgs
    ? `parseResponse(${runtimeAccess}(args,{...clientOptions,init:{...clientOptions?.init,signal}}))`
    : `parseResponse(${runtimeAccess}(undefined,{...clientOptions,init:{...clientOptions?.init,signal}}))`
  return `export function ${hookName}${generics}(${argsSig}options?:${optionsType}){const{query:queryOptions,options:clientOptions}=options??{};return ${config.suspenseQueryFn}({...queryOptions,queryKey:${keyCall},queryFn({signal}:QueryFunctionContext){return ${fetcherCall}}})}`
}

/**
 * Builds the inline body for an infinite query hook (queryKey + queryFn + optional pagination).
 * Hook builds its own options object rather than spreading the matching
 * `infiniteQueryOptions(...)` factory: like `queryOptions()`, the helper brands its result with
 * `DataTag` (narrow literal-tuple `queryKey`, `TError` fixed to `DefaultError`), which is not
 * assignable to the hook's wide generic options type — same cause as the non-infinite hooks,
 * not specific to the suspense variant.
 *
 * `isVueQuery` drops `:QueryFunctionContext` from `queryFn` — `useInfiniteQuery({...})` provides
 * contextual typing for `signal: AbortSignal`, so the annotation is redundant and breaks
 * Vue Query's narrow per-call queryKey inference.
 */
function makeInfiniteHookBody(
  keyCall: string,
  fetcherCall: string,
  useHelper: boolean,
  isVueQuery = false,
): string {
  const queryFnSig = isVueQuery ? '{signal}' : '{signal}:QueryFunctionContext'
  const base = `queryKey:${keyCall},queryFn(${queryFnSig}){return ${fetcherCall}}`
  return useHelper
    ? `${base},initialPageParam:pagination.initialPageParam,getNextPageParam:pagination.getNextPageParam`
    : base
}

function makeInfiniteQueryHookCode(
  hookName: string,
  runtimeAccess: string,
  infiniteKeyGetterName: string,
  infiniteOptionsGetterName: string,
  hasArgs: boolean,
  argsType: string,
  responseType: string,
  config: {
    readonly infiniteQueryFn: string
    readonly useInfiniteQueryOptionsType: string
    readonly useThunk?: boolean
    readonly isVueQuery?: boolean
    readonly hasInfiniteQueryOptionsHelper?: boolean
    readonly errorType?: string
  },
) {
  const errorType = config.errorType ?? 'unknown'
  // When the helper is enabled, TData defaults to `InfiniteData<...>` (TanStack v5 semantics);
  // pagination is required as a separate arg so options.query becomes optional.
  // When disabled, TData defaults to the page response type and users supply pagination via options.query.
  const useHelper = config.hasInfiniteQueryOptionsHelper === true
  const tDataDefault = useHelper ? `InfiniteData<${responseType}>` : responseType
  const generics = `<TData=${tDataDefault},TError=${errorType},TPageParam=unknown>`
  const queryKeyType = `ReturnType<typeof ${infiniteKeyGetterName}>`
  const queryOptionsType = `${config.useInfiniteQueryOptionsType}<${responseType},TError,TData,${queryKeyType},TPageParam>`
  const optionsType = useHelper
    ? `{query?:${queryOptionsType};options?:ClientRequestOptions}`
    : `{query:${queryOptionsType};options?:ClientRequestOptions}`
  const paginationParam = `pagination:{initialPageParam:TPageParam;getNextPageParam:(lastPage:${responseType},allPages:${responseType}[],lastPageParam:TPageParam)=>TPageParam|undefined|null}`
  const paginationSig = useHelper ? `${paginationParam},` : ''

  // Vue Query: spread factory. Inline `initialPageParam: TPageParam` doesn't satisfy
  // `useInfiniteQuery`'s `MaybeRefDeep<TPageParam>` constraint, but `infiniteQueryOptions(...)`
  // brands the result so the spread is accepted.
  if (config.isVueQuery && useHelper) {
    const argsSig = hasArgs ? `args:MaybeRefOrGetter<${argsType}>,` : ''
    const optionsCall = hasArgs
      ? `${infiniteOptionsGetterName}(args,pagination,clientOptions)`
      : `${infiniteOptionsGetterName}(pagination,clientOptions)`
    return `export function ${hookName}${generics}(${argsSig}${paginationParam},options?:${optionsType}){const{query:queryOptions,options:clientOptions}=options??{};return ${config.infiniteQueryFn}({...queryOptions,...${optionsCall}})}`
  }

  if (config.useThunk) {
    const argsSig = hasArgs ? `args:()=>${argsType},` : ''
    const keyCall = hasArgs ? `${infiniteKeyGetterName}(args())` : `${infiniteKeyGetterName}()`
    const fetcherCall = hasArgs
      ? `parseResponse(${runtimeAccess}(args(),{...clientOptions,init:{...clientOptions?.init,signal}}))`
      : `parseResponse(${runtimeAccess}(undefined,{...clientOptions,init:{...clientOptions?.init,signal}}))`
    const body = makeInfiniteHookBody(keyCall, fetcherCall, useHelper)
    const optionsTypeSig = useHelper ? `options?:()=>${optionsType}` : `options:()=>${optionsType}`
    const destructure = useHelper ? `options?.()??{}` : 'options()'
    return `export function ${hookName}${generics}(${argsSig}${paginationSig}${optionsTypeSig}){return ${config.infiniteQueryFn}(()=>{const{query,options:clientOptions}=${destructure};return{...query,${body}}})}`
  }
  if (config.isVueQuery) {
    const argsSig = hasArgs ? `args:MaybeRefOrGetter<${argsType}>,` : ''
    const keyCall = hasArgs ? `${infiniteKeyGetterName}(args)` : `${infiniteKeyGetterName}()`
    const fetcherCall = hasArgs
      ? `parseResponse(${runtimeAccess}(toValue(args),{...clientOptions,init:{...clientOptions?.init,signal}}))`
      : `parseResponse(${runtimeAccess}(undefined,{...clientOptions,init:{...clientOptions?.init,signal}}))`
    const body = makeInfiniteHookBody(keyCall, fetcherCall, useHelper, true)
    return `export function ${hookName}${generics}(${argsSig}options:${optionsType}){const{query:queryOptions,options:clientOptions}=options;return ${config.infiniteQueryFn}({...queryOptions,${body}})}`
  }
  const argsSig = hasArgs ? `args:${argsType},` : ''
  const keyCall = hasArgs ? `${infiniteKeyGetterName}(args)` : `${infiniteKeyGetterName}()`
  const fetcherCall = hasArgs
    ? `parseResponse(${runtimeAccess}(args,{...clientOptions,init:{...clientOptions?.init,signal}}))`
    : `parseResponse(${runtimeAccess}(undefined,{...clientOptions,init:{...clientOptions?.init,signal}}))`
  const body = makeInfiniteHookBody(keyCall, fetcherCall, useHelper)
  const optionsTypeSig = useHelper ? `options?:${optionsType}` : `options:${optionsType}`
  const destructure = useHelper ? 'options??{}' : 'options'
  return `export function ${hookName}${generics}(${argsSig}${paginationSig}${optionsTypeSig}){const{query:queryOptions,options:clientOptions}=${destructure};return ${config.infiniteQueryFn}({...queryOptions,${body}})}`
}

function makeSuspenseInfiniteQueryHookCode(
  hookName: string,
  runtimeAccess: string,
  infiniteKeyGetterName: string,
  infiniteOptionsGetterName: string,
  hasArgs: boolean,
  argsType: string,
  responseType: string,
  config: {
    readonly suspenseInfiniteQueryFn: string
    readonly useSuspenseInfiniteQueryOptionsType: string
    readonly useThunk?: boolean
    readonly isVueQuery?: boolean
    readonly hasInfiniteQueryOptionsHelper?: boolean
    readonly errorType?: string
  },
) {
  const errorType = config.errorType ?? 'unknown'
  const useHelper = config.hasInfiniteQueryOptionsHelper === true
  const tDataDefault = useHelper ? `InfiniteData<${responseType}>` : responseType
  const generics = `<TData=${tDataDefault},TError=${errorType},TPageParam=unknown>`
  const queryKeyType = `ReturnType<typeof ${infiniteKeyGetterName}>`
  const queryOptionsType = `${config.useSuspenseInfiniteQueryOptionsType}<${responseType},TError,TData,${queryKeyType},TPageParam>`
  const optionsType = useHelper
    ? `{query?:${queryOptionsType};options?:ClientRequestOptions}`
    : `{query:${queryOptionsType};options?:ClientRequestOptions}`
  const paginationParam = `pagination:{initialPageParam:TPageParam;getNextPageParam:(lastPage:${responseType},allPages:${responseType}[],lastPageParam:TPageParam)=>TPageParam|undefined|null}`
  const paginationSig = useHelper ? `${paginationParam},` : ''

  // Vue Query: spread factory (see makeInfiniteQueryHookCode for rationale)
  if (config.isVueQuery && useHelper) {
    const argsSig = hasArgs ? `args:MaybeRefOrGetter<${argsType}>,` : ''
    const optionsCall = hasArgs
      ? `${infiniteOptionsGetterName}(args,pagination,clientOptions)`
      : `${infiniteOptionsGetterName}(pagination,clientOptions)`
    return `export function ${hookName}${generics}(${argsSig}${paginationParam},options?:${optionsType}){const{query:queryOptions,options:clientOptions}=options??{};return ${config.suspenseInfiniteQueryFn}({...queryOptions,...${optionsCall}})}`
  }

  if (config.useThunk) {
    const argsSig = hasArgs ? `args:()=>${argsType},` : ''
    const keyCall = hasArgs ? `${infiniteKeyGetterName}(args())` : `${infiniteKeyGetterName}()`
    const fetcherCall = hasArgs
      ? `parseResponse(${runtimeAccess}(args(),{...clientOptions,init:{...clientOptions?.init,signal}}))`
      : `parseResponse(${runtimeAccess}(undefined,{...clientOptions,init:{...clientOptions?.init,signal}}))`
    const body = makeInfiniteHookBody(keyCall, fetcherCall, useHelper)
    const optionsTypeSig = useHelper ? `options?:()=>${optionsType}` : `options:()=>${optionsType}`
    const destructure = useHelper ? `options?.()??{}` : 'options()'
    return `export function ${hookName}${generics}(${argsSig}${paginationSig}${optionsTypeSig}){return ${config.suspenseInfiniteQueryFn}(()=>{const{query,options:clientOptions}=${destructure};return{...query,${body}}})}`
  }
  if (config.isVueQuery) {
    const argsSig = hasArgs ? `args:MaybeRefOrGetter<${argsType}>,` : ''
    const keyCall = hasArgs ? `${infiniteKeyGetterName}(args)` : `${infiniteKeyGetterName}()`
    const fetcherCall = hasArgs
      ? `parseResponse(${runtimeAccess}(toValue(args),{...clientOptions,init:{...clientOptions?.init,signal}}))`
      : `parseResponse(${runtimeAccess}(undefined,{...clientOptions,init:{...clientOptions?.init,signal}}))`
    const body = makeInfiniteHookBody(keyCall, fetcherCall, useHelper, true)
    return `export function ${hookName}${generics}(${argsSig}options:${optionsType}){const{query:queryOptions,options:clientOptions}=options;return ${config.suspenseInfiniteQueryFn}({...queryOptions,${body}})}`
  }
  const argsSig = hasArgs ? `args:${argsType},` : ''
  const keyCall = hasArgs ? `${infiniteKeyGetterName}(args)` : `${infiniteKeyGetterName}()`
  const fetcherCall = hasArgs
    ? `parseResponse(${runtimeAccess}(args,{...clientOptions,init:{...clientOptions?.init,signal}}))`
    : `parseResponse(${runtimeAccess}(undefined,{...clientOptions,init:{...clientOptions?.init,signal}}))`
  const body = makeInfiniteHookBody(keyCall, fetcherCall, useHelper)
  const optionsTypeSig = useHelper ? `options?:${optionsType}` : `options:${optionsType}`
  const destructure = useHelper ? 'options??{}' : 'options'
  return `export function ${hookName}${generics}(${argsSig}${paginationSig}${optionsTypeSig}){const{query:queryOptions,options:clientOptions}=${destructure};return ${config.suspenseInfiniteQueryFn}({...queryOptions,${body}})}`
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
  runtimeAccess: string,
  hasNoContent: boolean,
  errorType = 'unknown',
) {
  const variablesType = hasArgs ? argsType : 'undefined'
  const responseTypeWithUndefined = hasNoContent ? `${responseType}|undefined` : responseType
  // TError generic enables custom error types: usePostUsers<APIError>(...)
  const tErrorGeneric = `<TError=${errorType}>`
  const mutationConfigType = `SWRMutationConfiguration<${responseTypeWithUndefined},TError,Key,${variablesType}>`
  const optionsSig = `options?:{mutation?:${mutationConfigType}&{swrKey?:Key};options?:ClientRequestOptions}`
  if (hasArgs) {
    return `export function ${hookName}${tErrorGeneric}(${optionsSig}){const{mutation:mutationOptions,options:clientOptions}=options??{};const{swrKey:customKey,...restMutationOptions}=mutationOptions??{};const swrKey=customKey??${inlineKey};return{swrKey,...useSWRMutation(swrKey,async(_:Key,{arg}:{arg:${argsType}})=>parseResponse(${runtimeAccess}(arg,clientOptions)),restMutationOptions)}}`
  }
  return `export function ${hookName}${tErrorGeneric}(${optionsSig}){const{mutation:mutationOptions,options:clientOptions}=options??{};const{swrKey:customKey,...restMutationOptions}=mutationOptions??{};const swrKey=customKey??${inlineKey};return{swrKey,...useSWRMutation(swrKey,async()=>parseResponse(${runtimeAccess}(undefined,clientOptions)),restMutationOptions)}}`
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
    readonly hasMutationOptionsHelper?: boolean
  },
  hasNoContent: boolean,
) {
  const variablesType = hasArgs ? argsType : 'void'
  const errorType = config.errorType ?? 'unknown'
  const tErrorGeneric = `<TError=${errorType}>`
  // For 204/205 responses, parseResponse returns undefined
  const dataType = hasNoContent ? `${responseType}|undefined` : responseType
  const mutationOptionsType = `${config.useMutationOptionsType}<${dataType},TError,${variablesType}>`
  const optionsType = `{mutation?:${mutationOptionsType};options?:ClientRequestOptions}`
  // Only forward `<TError>` to the factory when it actually accepts the type parameter
  // (i.e. wraps with `mutationOptions<...>` helper). Otherwise the factory has no generics.
  const factoryTypeArg = config.hasMutationOptionsHelper ? '<TError>' : ''
  // Spread user options first, then the factory so the operation contract wins.
  // Svelte Query v5+ requires thunk pattern: createMutation(() => options)
  if (config.useThunk) {
    return `export function ${hookName}${tErrorGeneric}(options?:()=>${optionsType}){return ${config.mutationFn}(()=>{const{mutation,options:clientOptions}=options?.()??{};return{...mutation,...${optionsGetterName}${factoryTypeArg}(clientOptions)}})}`
  }
  return `export function ${hookName}${tErrorGeneric}(options?:${optionsType}){const{mutation:mutationOptions,options:clientOptions}=options??{};return ${config.mutationFn}({...mutationOptions,...${optionsGetterName}${factoryTypeArg}(clientOptions)})}`
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
  // Infinite hooks are emitted only when the operation declares `x-pagination: true`.
  // Generating Infinite for non-paginated GETs creates unusable code (no getNextPageParam).
  const hasPagination = op['x-pagination'] === true
  // Detect header parameters for key exclusion (REST: headers are metadata, not resource identifiers)
  const pathLevelParams = deps.toParameterLikes(item.parameters)
  const opParams = deps.toParameterLikes(op.parameters)
  const hasHeaderArgs = [...pathLevelParams, ...opParams].some((p) => p.in === 'header')
  // Operation file naming uses methodPath (e.g. `getHealth`) — same convention as before
  // even though the corresponding fetcher function is no longer emitted.
  const operationFileName = methodPath(method, pathStr)
  const argsType = makeArgsType(clientName, method, pathStr)
  const runtimeAccess = makeRuntimeAccess(clientName, method, pathStr)
  const responseType = makeResponseTypeFromClient(clientName, method, pathStr)
  // parseResponse returns undefined for 204/205 No Content responses
  const hasNoContent = hasNoContentResponse(op)
  // Convert {param} to :param for key path display
  const honoPath = pathStr.replace(/\{([^}]+)\}/g, ':$1')
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
        runtimeAccess,
        config.queryFn,
      )
      // Immutable hook (useSWRImmutable) - generated by default as best practice
      const immutableHookName = `${config.hookPrefix}Immutable${capitalize(operationFileName)}`
      const immutableHookCode = config.immutableQueryFn
        ? makeSWRQueryHookCode(
            immutableHookName,
            keyGetterName,
            hasArgs,
            argsType,
            runtimeAccess,
            config.immutableQueryFn,
          )
        : null
      // Infinite query support (only when x-pagination: true)
      const infiniteKeyGetterName = makeInfiniteQueryKeyGetterName(method, pathStr, true)
      const infiniteKeyGetterCode = hasPagination
        ? makeInfiniteQueryKeyGetterCode(
            infiniteKeyGetterName,
            hasArgs,
            argsType,
            honoPath,
            config,
            hasHeaderArgs,
          )
        : null
      const infiniteHookName = `${config.hookPrefix}Infinite${capitalize(operationFileName)}`
      const infiniteHookCode = hasPagination
        ? makeSWRInfiniteHookCode(
            infiniteHookName,
            infiniteKeyGetterName,
            hasArgs,
            argsType,
            responseType,
            runtimeAccess,
            config.errorType,
          )
        : null
      // Order: key → hook → immutableHook → infiniteKey → infiniteHook
      const parts = [
        keyGetterCode,
        hookCode,
        immutableHookCode,
        infiniteKeyGetterCode,
        infiniteHookCode,
      ].filter(Boolean)
      return {
        code: parts.join('\n\n'),
        isQuery: true,
        hasArgs,
        hasInfinite: hasPagination,
        operationFileName,
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
      runtimeAccess,
      hasNoContent,
      config.errorType,
    )
    return {
      code: hookCode,
      isQuery: false,
      hasArgs,
      hasInfinite: false,
      operationFileName,
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
      runtimeAccess,
      config,
    )
    const hookCode = makeQueryHookCode(
      queryHookName,
      keyGetterName,
      runtimeAccess,
      hasArgs,
      argsType,
      responseType,
      config,
    )
    // Generate infinite query key getter (only when infinite query hooks are enabled
    // AND endpoint declares `x-pagination: true`)
    const infiniteKeyGetterName = makeInfiniteQueryKeyGetterName(method, pathStr)
    const infiniteOptionsGetterName = makeInfiniteQueryOptionsGetterName(pathStr)
    const { infiniteQueryFn, useInfiniteQueryOptionsType } = config
    const hasInfinite = !!(infiniteQueryFn && useInfiniteQueryOptionsType) && hasPagination
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
    const infiniteOptionsGetterCode = hasInfinite
      ? makeInfiniteQueryOptionsGetterCode(
          infiniteOptionsGetterName,
          infiniteKeyGetterName,
          hasArgs,
          argsType,
          runtimeAccess,
          responseType,
          {
            ...(config.isVueQuery ? { isVueQuery: true } : {}),
            ...(config.hasInfiniteQueryOptionsHelper
              ? { hasInfiniteQueryOptionsHelper: true }
              : {}),
          },
        )
      : null
    // Generate suspense query hook
    const suspenseHookName = `${config.hookPrefix}Suspense${capitalize(pathFuncName)}`
    const suspenseHookCode =
      config.suspenseQueryFn && config.useSuspenseQueryOptionsType
        ? makeSuspenseQueryHookCode(
            suspenseHookName,
            keyGetterName,
            runtimeAccess,
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
          runtimeAccess,
          infiniteKeyGetterName,
          infiniteOptionsGetterName,
          hasArgs,
          argsType,
          responseType,
          {
            infiniteQueryFn,
            useInfiniteQueryOptionsType,
            ...(config.useThunk ? { useThunk: true } : {}),
            ...(config.isVueQuery ? { isVueQuery: true } : {}),
            ...(config.hasInfiniteQueryOptionsHelper
              ? { hasInfiniteQueryOptionsHelper: true }
              : {}),
            ...(config.errorType ? { errorType: config.errorType } : {}),
          },
        )
      : null
    const suspenseInfiniteHookName = `${config.hookPrefix}SuspenseInfinite${capitalize(pathFuncName)}`
    const suspenseInfiniteHookCode =
      hasInfinite && config.suspenseInfiniteQueryFn && config.useSuspenseInfiniteQueryOptionsType
        ? makeSuspenseInfiniteQueryHookCode(
            suspenseInfiniteHookName,
            runtimeAccess,
            infiniteKeyGetterName,
            infiniteOptionsGetterName,
            hasArgs,
            argsType,
            responseType,
            {
              suspenseInfiniteQueryFn: config.suspenseInfiniteQueryFn,
              useSuspenseInfiniteQueryOptionsType: config.useSuspenseInfiniteQueryOptionsType,
              ...(config.useThunk ? { useThunk: true } : {}),
              ...(config.isVueQuery ? { isVueQuery: true } : {}),
              ...(config.hasInfiniteQueryOptionsHelper
                ? { hasInfiniteQueryOptionsHelper: true }
                : {}),
              ...(config.errorType ? { errorType: config.errorType } : {}),
            },
          )
        : null
    // Order: key → factory → hook → suspenseHook → infiniteKey → infiniteFactory → infiniteHook → suspenseInfiniteHook
    const parts = [
      keyGetterCode,
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
      operationFileName,
    } as const
  }
  // Mutation: emit factory + hook
  const optionsGetterName = makeMutationOptionsGetterName(method, pathStr)
  const optionsGetterCode = makeMutationOptionsGetterCode(
    optionsGetterName,
    hasArgs,
    argsType,
    runtimeAccess,
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
  return {
    code: `${optionsGetterCode}\n\n${hookCode}`,
    isQuery: false,
    hasArgs,
    hasInfinite: false,
    operationFileName,
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
  readonly operationFileName: string
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
                operationFileName: result.operationFileName,
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
            operationFileName: string
          } => item !== null,
        )
    })
}

/**
 * Generates the import header for Query hook files.
 *
 * Imports include:
 * - Query/Mutation hooks from the framework package
 * - UseQueryOptions/UseMutationOptions/InfiniteData types
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
    // Framework option-factory helpers — emitted only when the lib config opts in.
    // queryOptions/infiniteQueryOptions enable DataTag branding for queryClient.getQueryData;
    // mutationOptions provides type-safe defaults for setMutationDefaults / reusable factories.
    ...(hasQuery && config.hasQueryOptionsHelper ? ['queryOptions'] : []),
    ...(hasInfiniteQuery && config.hasInfiniteQueryOptionsHelper ? ['infiniteQueryOptions'] : []),
    ...(hasMutation && config.hasMutationOptionsHelper ? ['mutationOptions'] : []),
  ]
  // Type imports for options - UseQueryOptions, UseMutationOptions, QueryFunctionContext
  // QueryFunctionContext is emitted only when at least one generated `queryFn` carries the
  // explicit `:QueryFunctionContext` annotation. Vue Query drops the annotation from hook
  // bodies (useQuery / useInfiniteQuery / useSuspenseQuery provide contextual typing for
  // `signal: AbortSignal`), but the plain-object factories still emit the annotation since
  // a bare object literal has no surrounding contextual type for `queryFn`.
  const typeImports = [
    ...(hasQuery ? [config.useQueryOptionsType, 'QueryFunctionContext'] : []),
    ...(hasQuery && config.useSuspenseQueryOptionsType ? [config.useSuspenseQueryOptionsType] : []),
    ...(hasInfiniteQuery && config.useInfiniteQueryOptionsType
      ? [config.useInfiniteQueryOptionsType]
      : []),
    ...(hasInfiniteQuery && config.useSuspenseInfiniteQueryOptionsType
      ? [config.useSuspenseInfiniteQueryOptionsType]
      : []),
    // InfiniteData: needed when helper-wrapped factory returns InfiniteData<...>-typed options
    ...(hasInfiniteQuery && config.hasInfiniteQueryOptionsHelper ? ['InfiniteData'] : []),
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
  const keysCode = prefixKeyCodes.length ? `${prefixKeyCodes.join('\n\n')}\n` : ''
  const exportLines = Array.from(
    new Set(hookCodes.map(({ operationFileName }) => `export * from './${operationFileName}'`)),
  )
  const indexLines = keysCode ? [`export * from './keys'`, ...exportLines] : exportLines
  const index = `${indexLines.join('\n')}\n`
  const results = await Promise.all([
    ...hookCodes.map(({ operationFileName, code, isQuery, hasArgs, hasInfinite }) => {
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
      const filePath = path.join(outDir, `${operationFileName}.ts`)
      return emit(fileSrc, path.dirname(filePath), filePath)
    }),
    ...(keysCode ? [emit(keysCode, outDir, path.join(outDir, 'keys.ts'))] : []),
    emit(index, path.dirname(indexPath), indexPath),
  ])
  const e = results.find((result) => !result.ok)
  if (e) return e
  return {
    ok: true,
    value: `Generated ${config.frameworkName.toLowerCase().replace(/ /g, '-')} hooks written to ${outDir}/*.ts (index.ts included)`,
  } as const
}
