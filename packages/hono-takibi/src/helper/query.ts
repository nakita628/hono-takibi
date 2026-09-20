import path from 'node:path'

import { Effect } from 'effect'

import { emit } from '../emit/index.js'
import { GenerateError } from '../error/index.js'
import { isOpenAPIPaths, isOperationLike, isRecord } from '../guard/index.js'
import type { OpenAPI, OpenAPIPaths } from '../openapi/index.js'
import { capitalize, methodPath, toIdentifierPascalCase } from '../utils/index.js'
import {
  formatPath,
  hasNoContentResponse,
  makeOperationDeps,
  operationHasArgs,
  parsePathItem,
} from './rpc.js'

// Every TanStack adapter's hook takes a trailing argument after the options — `queryClient`
// (an accessor of one in Solid and Svelte), or `{ injector }` in Angular. The generated hooks
// forward it so a caller can target a client other than the provided one (tests, multiple
// clients) or run outside an injection context, the way openapi-react-query does.
type HookTail = {
  readonly name: string
  readonly query: string
  readonly infinite: string
  readonly mutation: string
  readonly imports: readonly string[]
}

function makeHookTail(tail: HookTail | undefined, kind: 'query' | 'infinite' | 'mutation') {
  return tail ? { sig: `,${tail.name}?:${tail[kind]}`, arg: `,${tail.name}` } : { sig: '', arg: '' }
}

// Solid Query types its option objects as `Accessor<...>` (a thunk), because `createQuery`
// takes the whole options object as a thunk. The user-facing `options.query` slot needs the
// *unwrapped* object: spreading an accessor copies a function's (empty) own properties, so the
// caller's options are silently dropped at runtime and TError never reaches the result.
// `ReturnType<...>` is the same unwrapping Solid itself uses to declare `queryOptions()`.
function wrapOptionsType(optionsType: string, unwrapAccessor?: boolean) {
  return unwrapAccessor ? `ReturnType<${optionsType}>` : optionsType
}

// The hook supplies these itself, so `options.query` leaves them out — the shape
// openapi-react-query uses. The libraries type `queryKey` as required, which otherwise forces the
// caller to pass a key the hook then overwrites, and leaves `select` unable to bind TData.
const QUERY_OMIT_KEYS = `'queryKey'|'queryFn'`
// Infinite hooks with the helper also supply both page-param functions, from `pagination`.
const INFINITE_OMIT_KEYS = `'queryKey'|'queryFn'|'initialPageParam'|'getNextPageParam'`
// Mutation hooks supply `mutationFn` — the operation contract that types `data` — so the slot
// leaves it out. `mutationKey` stays: mutations are not cached, so the key is metadata rather
// than identity (`useIsMutating` / `useMutationState` filter on it, `setMutationDefaults`
// registers against it), and the hook honours the caller's key over the factory's, the way the
// SWR mutation hook already honours `swrKey`.
const MUTATION_OMIT_KEYS = `'mutationFn'`

// Vue's option types are unions — `MaybeRef<{...}>` (`Ref | ComputedRef | object`), plus a getter
// for mutations — and a plain `Omit` over a union keeps only the keys every member shares: none.
// The hook spreads the value, which only works on the plain object anyway, so `Extract` keeps
// that member. For queries it is the only one with the required `queryKey`. Mutation options are
// all optional, so the probe is a weak type: a `Ref` (only `value`) and a getter (no properties)
// share nothing with it and drop out, while the plain object matches.
const VUE_QUERY_MEMBER = `{queryKey:unknown}`
const VUE_MUTATION_MEMBER = `{mutationFn?:unknown}`
function omitInjectedKeys(optionsType: string, keys: string, vueMember?: string) {
  const objectType = vueMember ? `Extract<${optionsType},${vueMember}>` : optionsType
  return `Omit<${objectType},${keys}>`
}

function makeHookName(method: string, pathStr: string, prefix: string) {
  const funcName = methodPath(method, pathStr)
  return `${prefix}${capitalize(funcName)}`
}

// e.g. ('client','get','/users/{id}') → "client.users[':id'].$get"
function makeRuntimeAccess(clientName: string, method: string, pathStr: string) {
  const pathResult = formatPath(pathStr)
  return `${clientName}${pathResult.runtimePath}.$${method}`
}

// A bracketed path (`client.users[':id']`) cannot be reached through `typeof` on the runtime
// expression, so the type position indexes the method off the bracket instead.
function makeTypeAccess(clientName: string, method: string, pathStr: string) {
  const pathResult = formatPath(pathStr)
  return pathResult.hasBracket
    ? `typeof ${clientName}${pathResult.typeofPrefix}${pathResult.bracketSuffix}['$${method}']`
    : `typeof ${clientName}${pathResult.runtimePath}.$${method}`
}

// Chains Awaited/ReturnType/typeof parseResponse to derive parsed JSON shape.
function makeResponseTypeFromClient(clientName: string, method: string, pathStr: string) {
  return `Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<${makeTypeAccess(clientName, method, pathStr)}>>>>>`
}

function makeArgsType(clientName: string, method: string, pathStr: string) {
  return `InferRequestType<${makeTypeAccess(clientName, method, pathStr)}>`
}

// GET is the resource's default read, so its query-side names carry only the path (`useUsers`,
// `getUsersQueryKey`). The other safe method that yields query hooks — QUERY (OpenAPI 3.2,
// `createRoute({ method: 'query' })`, `client.x.$query`) — keeps its method in the names
// (`useQueryUsers`, `getQueryUsersQueryKey`) so it can sit next to the GET on the same path, the
// way mutation names already do. Its keys carry the method too: `['users', '/users', 'QUERY', args]`.
function queryNameMethod(method: string) {
  return method === 'get' ? '' : method
}

function makeQueryKeyGetterName(method: string, pathStr: string, isSWR?: boolean) {
  if (isSWR) {
    return `get${capitalize(methodPath(method, pathStr))}Key`
  }
  return `get${capitalize(methodPath(queryNameMethod(method), pathStr))}QueryKey`
}

// Mutations keep the method in their key — several methods share a path — and, like the query
// side, expose the key through a getter so `useIsMutating` / `setMutationDefaults` callers do not
// have to reach into the options factory for it.
function makeMutationKeyGetterName(method: string, pathStr: string, isSWR?: boolean) {
  if (isSWR) {
    return `get${capitalize(methodPath(method, pathStr))}Key`
  }
  return `get${capitalize(methodPath(method, pathStr))}MutationKey`
}

function makeMutationKeyGetterCode(keyGetterName: string, method: string, honoPath: string) {
  const prefix = honoPath.replace(/^\//u, '').split('/')[0]
  return `export function ${keyGetterName}(){return['${prefix}','${honoPath}','${method.toUpperCase()}']as const}`
}

function makeInfiniteQueryKeyGetterName(method: string, pathStr: string, isSWR?: boolean) {
  if (isSWR) {
    return `get${capitalize(methodPath(method, pathStr))}InfiniteKey`
  }
  return `get${capitalize(methodPath(queryNameMethod(method), pathStr))}InfiniteQueryKey`
}

// Vue hooks take `args` as `MaybeRefOrGetter`, so the key has to follow it: a plain getter call
// unwraps once at setup and freezes the key, and a changed `Ref` would never refetch. `computed`
// keeps it live — Vue Query unwraps `MaybeRefDeep` keys itself. The key getters stay plain
// arrays, which is what invalidation and cache lookups want.
function vueReactiveKey(keyCall: string) {
  return `computed(()=>${keyCall})`
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
  method = 'get',
) {
  // First path segment, e.g. '/pet/findByStatus' → 'pet'
  const prefix = honoPath.replace(/^\//u, '').split('/')[0]
  const methodKey = method === 'get' ? '' : `,'${method.toUpperCase()}'`
  if (config.isVueQuery) {
    if (hasArgs) {
      return `export function ${keyGetterName}(args:MaybeRefOrGetter<${argsType}>){${hasHeader ? 'const{header:_,...keyArgs}=toValue(args);return' : 'return'}['${prefix}','${honoPath}'${methodKey},${hasHeader ? 'keyArgs' : 'toValue(args)'}]as const}`
    }
    return `export function ${keyGetterName}(){return['${prefix}','${honoPath}'${methodKey}]as const}`
  }
  if (hasArgs) {
    // REST: headers are metadata, not resource identifiers — excluded from key.
    const body = hasHeader
      ? `const{header:_,...keyArgs}=args;return['${prefix}','${honoPath}'${methodKey},keyArgs]as const`
      : `return['${prefix}','${honoPath}'${methodKey},args]as const`
    return `export function ${keyGetterName}(args:${argsType}){${body}}`
  }
  return `export function ${keyGetterName}(){return['${prefix}','${honoPath}'${methodKey}]as const}`
}

// Same as makeQueryKeyGetterCode with an 'infinite' segment after the path and before the args:
// ['prefix','/path','infinite',args?]. Placing it before the args keeps prefix matching useful —
// ['prefix','/path','infinite'] hits every infinite list for the endpoint whatever its args —
// which is where orval and kubb put theirs, too.
function makeInfiniteQueryKeyGetterCode(
  keyGetterName: string,
  hasArgs: boolean,
  argsType: string,
  honoPath: string,
  config: { readonly frameworkName: string; readonly isVueQuery?: boolean },
  hasHeader = false,
  method = 'get',
) {
  const prefix = honoPath.replace(/^\//u, '').split('/')[0]
  const methodKey = method === 'get' ? '' : `,'${method.toUpperCase()}'`

  if (config.isVueQuery) {
    if (hasArgs) {
      return `export function ${keyGetterName}(args:MaybeRefOrGetter<${argsType}>){${hasHeader ? 'const{header:_,...keyArgs}=toValue(args);return' : 'return'}['${prefix}','${honoPath}'${methodKey},'infinite',${hasHeader ? 'keyArgs' : 'toValue(args)'}]as const}`
    }
    return `export function ${keyGetterName}(){return['${prefix}','${honoPath}'${methodKey},'infinite']as const}`
  }
  if (hasArgs) {
    const infBody = hasHeader
      ? `const{header:_,...keyArgs}=args;return['${prefix}','${honoPath}'${methodKey},'infinite',keyArgs]as const`
      : `return['${prefix}','${honoPath}'${methodKey},'infinite',args]as const`
    return `export function ${keyGetterName}(args:${argsType}){${infBody}}`
  }
  return `export function ${keyGetterName}(){return['${prefix}','${honoPath}'${methodKey},'infinite']as const}`
}

/**
 * Generates the query options factory.
 *
 * The factory returns either a `queryOptions({...})`-branded options object
 * (when the framework provides the helper) or a plain `{queryKey, queryFn}` literal.
 * `queryFn` inlines `parseResponse(client.x.$y(...))` directly so no fetcher wrapper is needed.
 *
 * With the helper the factory is the single place the request is written: the hooks spread it
 * (`{...getXQueryOptions<TData,TError>(...), ...query}`), the shape the TanStack docs recommend.
 * That needs the factory to carry the hooks' generics — `queryOptions()` bakes `TError` and
 * `TData` into its result (`retry`, `select`, ...), so a factory pinned to the defaults is not
 * assignable to a hook whose caller picks them. Left unset, `<TData, TError>` fall back to the
 * defaults, so a direct `getXQueryOptions()` call keeps its previous type.
 *
 * @see https://tanstack.com/query/latest/docs/framework/react/guides/query-options
 */
function makeQueryOptionsGetterCode(
  optionsGetterName: string,
  keyGetterName: string,
  hasArgs: boolean,
  argsType: string,
  runtimeAccess: string,
  responseType: string,
  config: {
    readonly hasQueryOptionsHelper?: boolean
    readonly isVueQuery?: boolean
    readonly errorType?: string
  },
) {
  const queryKeyCall = hasArgs ? `${keyGetterName}(args)` : `${keyGetterName}()`
  // With `queryOptions(...)` helper, `signal` is contextually typed; without, annotate explicitly.
  const queryFnSig = config.hasQueryOptionsHelper ? '{signal}' : '{signal}:QueryFunctionContext'
  if (config.isVueQuery && hasArgs) {
    const fetcherCall = `parseResponse(${runtimeAccess}(toValue(args),{...options,init:{...options?.init,signal}}))`
    const bodyContent = `queryKey:${vueReactiveKey(queryKeyCall)},queryFn(${queryFnSig}){return ${fetcherCall}}`
    const returnExpr = config.hasQueryOptionsHelper
      ? `queryOptions({${bodyContent}})`
      : `{${bodyContent}}`
    return `export function ${optionsGetterName}(args:MaybeRefOrGetter<${argsType}>,options?:ClientRequestOptions){return ${returnExpr}}`
  }
  const fetcherCall = hasArgs
    ? `parseResponse(${runtimeAccess}(args,{...options,init:{...options?.init,signal}}))`
    : `parseResponse(${runtimeAccess}(undefined,{...options,init:{...options?.init,signal}}))`
  const bodyContent = `queryKey:${queryKeyCall},queryFn(${queryFnSig}){return ${fetcherCall}}`
  // Vue keeps the plain `queryOptions({...})` form: its hooks do not spread the factory
  // (see `makeQueryHookCode`), so the generics would be dead weight there.
  const carriesHookGenerics = config.hasQueryOptionsHelper === true && !config.isVueQuery
  const generics = carriesHookGenerics
    ? `<TData=${responseType},TError=${config.errorType ?? 'unknown'}>`
    : ''
  const returnExpr = carriesHookGenerics
    ? `queryOptions<${responseType},TError,TData,ReturnType<typeof ${keyGetterName}>>({${bodyContent}})`
    : config.hasQueryOptionsHelper
      ? `queryOptions({${bodyContent}})`
      : `{${bodyContent}}`
  if (hasArgs) {
    return `export function ${optionsGetterName}${generics}(args:${argsType},options?:ClientRequestOptions){return ${returnExpr}}`
  }
  return `export function ${optionsGetterName}${generics}(options?:ClientRequestOptions){return ${returnExpr}}`
}

// `getRequestArgs` maps `pageParam` into the request. The mapper is supplied by the caller
// (it owns the pagination dialect: which query/path param carries the cursor/page), so the
// generated `queryFn` stays free of `as`/`String()` and the request actually advances pages.
//
// `pageParam` is `unknown`: inside a function generic over TPageParam, the pageParam reaching
// queryFn degrades to `unknown` (QueryFunctionContext is a deferred conditional type), so a
// `TPageParam` parameter here cannot be fed without `as`. The caller narrows it (e.g. String()).
function makeGetRequestArgsField(hasArgs: boolean, argsType: string) {
  return hasArgs
    ? `getRequestArgs:(args:${argsType},pageParam:unknown)=>${argsType}`
    : `getRequestArgs:(pageParam:unknown)=>${argsType}`
}

function makeRequestArgsCall(hasArgs: boolean) {
  return (argsExpr: string) =>
    hasArgs
      ? `pagination.getRequestArgs(${argsExpr},pageParam)`
      : `pagination.getRequestArgs(pageParam)`
}

// `getNextPageParam` mirrors TanStack's GetNextPageParamFunction arity, `allPageParams` included.
// @see https://tanstack.com/query/latest/docs/framework/react/reference/useInfiniteQuery
function makePaginationParam(hasArgs: boolean, argsType: string, responseType: string) {
  return `pagination:{initialPageParam:TPageParam;getNextPageParam:(lastPage:${responseType},allPages:${responseType}[],lastPageParam:TPageParam,allPageParams:TPageParam[])=>TPageParam|undefined|null;${makeGetRequestArgsField(hasArgs, argsType)}}`
}

// With helper: wraps `infiniteQueryOptions({...})` + required `pagination` arg. Like the
// query factory, it carries the infinite hooks' generics (`<TData, TError, TPageParam>`) so the
// hooks can spread it; `TData` defaults to `InfiniteData<...>`, the v5 result shape.
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
    readonly errorType?: string
  },
) {
  const queryKeyCall = hasArgs ? `${infiniteKeyGetterName}(args)` : `${infiniteKeyGetterName}()`
  const queryKeyType = `ReturnType<typeof ${infiniteKeyGetterName}>`
  // Vue: the factory's key is a `ComputedRef`, and Vue Query cannot infer TQueryKey through
  // `MaybeRefDeep<ComputedRef<...>>`, so a context pinned to the exact tuple stops the factory
  // from spreading into `useInfiniteQuery`. The queryFn never reads `queryKey`, so keep it wide.
  const queryFnSig = config.isVueQuery
    ? '{pageParam,signal}:QueryFunctionContext<readonly unknown[],TPageParam>'
    : `{pageParam,signal}:QueryFunctionContext<${queryKeyType},TPageParam>`
  const requestArgsCall = makeRequestArgsCall(hasArgs)
  if (config.hasInfiniteQueryOptionsHelper) {
    const paginationParam = makePaginationParam(hasArgs, argsType, responseType)
    if (config.isVueQuery && hasArgs) {
      const fetcherCall = `parseResponse(${runtimeAccess}(${requestArgsCall('toValue(args)')},{...options,init:{...options?.init,signal}}))`
      const body = `queryKey:${vueReactiveKey(queryKeyCall)},queryFn(${queryFnSig}){return ${fetcherCall}},initialPageParam:pagination.initialPageParam,getNextPageParam:pagination.getNextPageParam`
      return `export function ${optionsGetterName}<TPageParam=unknown>(args:MaybeRefOrGetter<${argsType}>,${paginationParam},options?:ClientRequestOptions){return infiniteQueryOptions({${body}})}`
    }
    const fetcherCall = `parseResponse(${runtimeAccess}(${requestArgsCall('args')},{...options,init:{...options?.init,signal}}))`
    const body = `queryKey:${queryKeyCall},queryFn(${queryFnSig}){return ${fetcherCall}},initialPageParam:pagination.initialPageParam,getNextPageParam:pagination.getNextPageParam`
    const generics = `<TData=InfiniteData<${responseType}>,TError=${config.errorType ?? 'unknown'},TPageParam=unknown>`
    const helperCall = `infiniteQueryOptions<${responseType},TError,TData,${queryKeyType},TPageParam>({${body}})`
    if (hasArgs) {
      return `export function ${optionsGetterName}${generics}(args:${argsType},${paginationParam},options?:ClientRequestOptions){return ${helperCall}}`
    }
    return `export function ${optionsGetterName}${generics}(${paginationParam},options?:ClientRequestOptions){return ${helperCall}}`
  }
  // Branch 2: plain object (no helper). `pagination` carries only `getRequestArgs`; the caller
  // supplies initialPageParam/getNextPageParam via the spread-in options at the hook site.
  const vuePaginationParam = `pagination:{${makeGetRequestArgsField(hasArgs, argsType)}}`
  if (config.isVueQuery && hasArgs) {
    const fetcherCall = `parseResponse(${runtimeAccess}(${requestArgsCall('toValue(args)')},{...options,init:{...options?.init,signal}}))`
    const bodyContent = `queryKey:${vueReactiveKey(queryKeyCall)},queryFn(${queryFnSig}){return ${fetcherCall}}`
    return `export function ${optionsGetterName}<TPageParam=unknown>(args:MaybeRefOrGetter<${argsType}>,${vuePaginationParam},options?:ClientRequestOptions){return {${bodyContent}}}`
  }
  const fetcherCall = `parseResponse(${runtimeAccess}(${requestArgsCall('args')},{...options,init:{...options?.init,signal}}))`
  const bodyContent = `queryKey:${queryKeyCall},queryFn(${queryFnSig}){return ${fetcherCall}}`
  if (hasArgs) {
    return `export function ${optionsGetterName}<TPageParam=unknown>(args:${argsType},${vuePaginationParam},options?:ClientRequestOptions){return {${bodyContent}}}`
  }
  return `export function ${optionsGetterName}<TPageParam=unknown>(${vuePaginationParam},options?:ClientRequestOptions){return {${bodyContent}}}`
}

function makeMutationOptionsGetterCode(
  optionsGetterName: string,
  keyGetterName: string,
  hasArgs: boolean,
  argsType: string,
  runtimeAccess: string,
  responseType: string,
  hasNoContent: boolean,
  config: {
    readonly hasMutationOptionsHelper?: boolean
    readonly errorType?: string
    readonly hookTail?: HookTail
  },
) {
  const inlineKey = `${keyGetterName}()`
  const errorType = config.errorType ?? 'unknown'
  // TError/TOnMutateResult are only useful when wrapped by `mutationOptions<...>`.
  // TOnMutateResult carries `onMutate`'s return value through to onError/onSuccess/onSettled.
  const tErrorGeneric = config.hasMutationOptionsHelper
    ? `<TError=${errorType},TOnMutateResult=unknown>`
    : ''
  const dataType = hasNoContent ? `${responseType}|undefined` : responseType
  const variablesType = hasArgs ? argsType : 'void'
  const typeArgs = `<${dataType},TError,${variablesType},TOnMutateResult>`
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
  responseType: string,
  queryFn = 'useSWR',
  errorType = 'unknown',
) {
  const argsSig = hasArgs ? `args:${argsType},` : ''
  // Bare `SWRConfiguration` defaults Data/Error to `any`, leaking `any` into `fallbackData`,
  // `onSuccess`, `onError` and `compare` at the call site. Pin them to the operation's types.
  const tErrorGeneric = `<TError=${errorType}>`
  const swrConfigType = `SWRConfiguration<${responseType},TError>&{swrKey?:Key;enabled?:boolean}`
  const optionsSig = `options?:{swr?:${swrConfigType};options?:ClientRequestOptions}`
  const keyCall = hasArgs ? `${keyGetterName}(args)` : `${keyGetterName}()`
  const fetcherCall = hasArgs
    ? `parseResponse(${runtimeAccess}(args,clientOptions))`
    : `parseResponse(${runtimeAccess}(undefined,clientOptions))`
  // `useSWR` cannot infer Error from the config alone and falls back to `any` (unlike the
  // mutation/infinite variants). Pass the type arguments so TError reaches the returned `error`.
  return `export function ${hookName}${tErrorGeneric}(${argsSig}${optionsSig}){const{swr:swrOptions,options:clientOptions}=options??{};const{swrKey:customKey,enabled,...restSwrOptions}=swrOptions??{};const swrKey=enabled!==false?(customKey??${keyCall}):null;return{swrKey,...${queryFn}<${responseType},TError>(swrKey,async()=>${fetcherCall},restSwrOptions)}}`
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
  method = 'get',
) {
  const argsSig = hasArgs ? `args:${argsType},` : ''
  // TError generic enables custom error types: useInfiniteUsers<APIError>(...)
  const tErrorGeneric = `<TError=${errorType}>`
  const keyCall = hasArgs ? `${infiniteKeyGetterName}(args)` : `${infiniteKeyGetterName}()`
  // SWR passes the keyLoader's return value to the fetcher as a single argument
  // (SWRInfiniteFetcher = (args: ReturnType<KeyLoader>) => ...). The default keyLoader appends
  // the page `index`, which the fetcher reads back and hands to the caller's `getRequestArgs`.
  // `swrKey` is narrowed to the same index-loader shape so the fetcher's index stays typed.
  const keyType = `ReturnType<typeof ${infiniteKeyGetterName}>`
  const loaderKeyType = `readonly[...${keyType},number]`
  const swrConfigType = `SWRInfiniteConfiguration<${responseType},TError>&{swrKey?:(index:number,previousPageData:${responseType}|null)=>${loaderKeyType}|null}`
  const getRequestArgsField = hasArgs
    ? `getRequestArgs:(args:${argsType},index:number)=>${argsType}`
    : `getRequestArgs:(index:number)=>${argsType}`
  const optionsSig = `options:{swr?:${swrConfigType};options?:ClientRequestOptions;pagination:{${getRequestArgsField}}}`
  // The page index sits after prefix, path, the method segment (non-GET only), 'infinite' and args.
  const leadingKeyParts = (hasArgs ? 4 : 3) + (method === 'get' ? 0 : 1)
  const indexDestructure = `[${','.repeat(leadingKeyParts)}index]:${loaderKeyType}`
  const requestArgs = hasArgs
    ? `pagination.getRequestArgs(args,index)`
    : `pagination.getRequestArgs(index)`
  return `export function ${hookName}${tErrorGeneric}(${argsSig}${optionsSig}){const{swr:swrOptions,options:clientOptions,pagination}=options;const{swrKey:customKeyLoader,...restSwrOptions}=swrOptions??{};const keyLoader=customKeyLoader??((index:number)=>[...${keyCall},index]as const);return useSWRInfinite(keyLoader,(${indexDestructure})=>parseResponse(${runtimeAccess}(${requestArgs},clientOptions)),restSwrOptions)}`
}

/**
 * Generates a query hook (regular or suspense).
 *
 * With the framework's `queryOptions()` helper the hook spreads the matching factory —
 * `{...getXQueryOptions<TData,TError>(args, clientOptions), ...query}` — so the request is
 * written once and the caller's options override it, the way the TanStack docs recommend.
 * The factory has to carry the hook's `<TData, TError>` for that spread to type-check:
 * `queryOptions()` bakes both into its result (`retry`, `select`, ...), and the hook's
 * options type pins `TQueryKey` to the factory's literal tuple for the same reason.
 *
 * Without the helper (Vue) the hook inlines queryKey + queryFn instead: Vue Query's
 * `MaybeRefDeep` option types don't take the branded factory, so it keeps the plain form.
 *
 * The queryFn calls the Hono client (`client.x.$y`) directly rather than importing a
 * generated `rpc` fetcher. This is not about layering aesthetics (regenerated codegen
 * tolerates such duplication): it keeps each framework's output self-contained — depending
 * only on `hono/client` + the client, generatable in isolation — and keeps the response
 * type, request call, and `signal` injection all derived from that one client, so hook
 * inference never becomes coupled to a separate fetcher's signature.
 * @see https://tanstack.com/query/latest/docs/framework/react/guides/query-options
 * @see https://tanstack.com/query/latest/docs/framework/react/typescript#typing-query-options
 */
function makeQueryHookCode(
  hookName: string,
  keyGetterName: string,
  optionsGetterName: string,
  runtimeAccess: string,
  hasArgs: boolean,
  argsType: string,
  responseType: string,
  config: {
    readonly queryFn: string
    readonly useThunk?: boolean
    readonly isVueQuery?: boolean
    readonly useQueryOptionsType: string
    readonly hasQueryOptionsHelper?: boolean
    readonly errorType?: string
    readonly hookTail?: HookTail
    readonly unwrapOptionsAccessor?: boolean
  },
) {
  const errorType = config.errorType ?? 'unknown'
  // TData first so callers can override `select`'s output type without naming TError:
  //   useUsers<string[]>(args, { query: { select: (data) => data.map(u => u.name) } })
  const generics = `<TData=${responseType},TError=${errorType}>`
  const useFactory = config.hasQueryOptionsHelper === true && !config.isVueQuery
  // Vue spells out TQueryKey (via its 5-parameter form): left at the `QueryKey` default, the
  // options' key-typed members (`persister`, …) clash with the narrow key the hook supplies.
  // Hooks that spread the factory pin it too, to the factory's own key tuple.
  const optionsTypeArgs = config.isVueQuery
    ? `${responseType},TError,TData,${responseType},ReturnType<typeof ${keyGetterName}>`
    : useFactory
      ? `${responseType},TError,TData,ReturnType<typeof ${keyGetterName}>`
      : `${responseType},TError,TData`
  const queryOptionsType = omitInjectedKeys(
    wrapOptionsType(
      `${config.useQueryOptionsType}<${optionsTypeArgs}>`,
      config.unwrapOptionsAccessor,
    ),
    QUERY_OMIT_KEYS,
    config.isVueQuery ? VUE_QUERY_MEMBER : undefined,
  )
  const optionsType = `{query?:${queryOptionsType};options?:ClientRequestOptions}`
  const keyCall = hasArgs ? `${keyGetterName}(args)` : `${keyGetterName}()`
  const tail = makeHookTail(config.hookTail, 'query')
  // Svelte Query v5+ requires thunk pattern: createQuery(() => options)
  if (config.useThunk) {
    const argsSig = hasArgs ? `args:()=>${argsType},` : ''
    if (useFactory) {
      const factoryCall = hasArgs
        ? `${optionsGetterName}<TData,TError>(args(),clientOptions)`
        : `${optionsGetterName}<TData,TError>(clientOptions)`
      return `export function ${hookName}${generics}(${argsSig}options?:()=>${optionsType}${tail.sig}){return ${config.queryFn}(()=>{const{query,options:clientOptions}=options?.()??{};return{...${factoryCall},...query}}${tail.arg})}`
    }
    const svelteKeyCall = hasArgs ? `${keyGetterName}(args())` : `${keyGetterName}()`
    const fetcherCall = hasArgs
      ? `parseResponse(${runtimeAccess}(args(),{...clientOptions,init:{...clientOptions?.init,signal}}))`
      : `parseResponse(${runtimeAccess}(undefined,{...clientOptions,init:{...clientOptions?.init,signal}}))`
    return `export function ${hookName}${generics}(${argsSig}options?:()=>${optionsType}${tail.sig}){return ${config.queryFn}(()=>{const{query,options:clientOptions}=options?.()??{};return{...query,queryKey:${svelteKeyCall},queryFn({signal}:QueryFunctionContext){return ${fetcherCall}}}}${tail.arg})}`
  }
  if (config.isVueQuery) {
    const argsSig = hasArgs ? `args:MaybeRefOrGetter<${argsType}>,` : ''
    const fetcherCall = hasArgs
      ? `parseResponse(${runtimeAccess}(toValue(args),{...clientOptions,init:{...clientOptions?.init,signal}}))`
      : `parseResponse(${runtimeAccess}(undefined,{...clientOptions,init:{...clientOptions?.init,signal}}))`
    const vueKeyCall = hasArgs ? vueReactiveKey(keyCall) : keyCall
    return `export function ${hookName}${generics}(${argsSig}options?:${optionsType}${tail.sig}){const{query:queryOptions,options:clientOptions}=options??{};return ${config.queryFn}({...queryOptions,queryKey:${vueKeyCall},queryFn({signal}){return ${fetcherCall}}}${tail.arg})}`
  }
  const argsSig = hasArgs ? `args:${argsType},` : ''
  if (useFactory) {
    const factoryCall = hasArgs
      ? `${optionsGetterName}<TData,TError>(args,clientOptions)`
      : `${optionsGetterName}<TData,TError>(clientOptions)`
    return `export function ${hookName}${generics}(${argsSig}options?:${optionsType}${tail.sig}){const{query:queryOptions,options:clientOptions}=options??{};return ${config.queryFn}({...${factoryCall},...queryOptions}${tail.arg})}`
  }
  const fetcherCall = hasArgs
    ? `parseResponse(${runtimeAccess}(args,{...clientOptions,init:{...clientOptions?.init,signal}}))`
    : `parseResponse(${runtimeAccess}(undefined,{...clientOptions,init:{...clientOptions?.init,signal}}))`
  return `export function ${hookName}${generics}(${argsSig}options?:${optionsType}${tail.sig}){const{query:queryOptions,options:clientOptions}=options??{};return ${config.queryFn}({...queryOptions,queryKey:${keyCall},queryFn({signal}:QueryFunctionContext){return ${fetcherCall}}}${tail.arg})}`
}

/**
 * Builds the inline body for an infinite query hook (queryKey + queryFn + optional pagination).
 * Used where the hook cannot spread the `infiniteQueryOptions(...)` factory: Vue (no helper,
 * and the helper's `MaybeRefDeep<TPageParam>` doesn't narrow from a generic parameter).
 * Helper-backed frameworks spread the generic factory instead — see `makeInfiniteQueryHookCode`.
 *
 * `isVueQuery` drops `:QueryFunctionContext` from `queryFn` — `useInfiniteQuery({...})` provides
 * contextual typing for `signal: AbortSignal`, so the annotation is redundant and breaks
 * Vue Query's narrow per-call queryKey inference.
 */
function makeInfiniteHookBody(
  keyCall: string,
  fetcherCall: string,
  useHelper: boolean,
  queryKeyType: string,
  isVueQuery = false,
): string {
  // `pageParam` reaches queryFn as `unknown` (QueryFunctionContext is a deferred conditional, so
  // under a generic TPageParam its pageParam can't resolve) — getRequestArgs accepts `unknown`.
  // The annotation keeps the queryFn assignable to the framework; Vue omits it (annotating breaks
  // Vue Query's per-call queryKey inference — see HOOK_CONFIGS vue-query notes).
  const queryFnSig = isVueQuery
    ? '{pageParam,signal}'
    : `{pageParam,signal}:QueryFunctionContext<${queryKeyType},TPageParam>`
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
    readonly hookTail?: HookTail
    readonly unwrapOptionsAccessor?: boolean
  },
) {
  const errorType = config.errorType ?? 'unknown'
  // TData defaults to `InfiniteData<...>` (v5 semantics) with or without the helper — `data` is
  // the pages container either way. With the helper, pagination is a separate required arg so
  // options.query becomes optional; without it, users supply pagination via options.query.
  const useHelper = config.hasInfiniteQueryOptionsHelper === true
  // Spread the generic factory wherever the helper is in play (Vue's helper branch below is
  // the exception: its factory keeps `<TPageParam>` only, so the hook spreads it un-typed).
  const useFactory = useHelper && !config.isVueQuery
  const tDataDefault = `InfiniteData<${responseType}>`
  const generics = `<TData=${tDataDefault},TError=${errorType},TPageParam=unknown>`
  const queryKeyType = `ReturnType<typeof ${infiniteKeyGetterName}>`
  // Without the helper (Vue) the page-param functions travel in `options.query`, so they stay.
  const queryOptionsType = omitInjectedKeys(
    wrapOptionsType(
      `${config.useInfiniteQueryOptionsType}<${responseType},TError,TData,${queryKeyType},TPageParam>`,
      config.unwrapOptionsAccessor,
    ),
    useHelper ? INFINITE_OMIT_KEYS : QUERY_OMIT_KEYS,
    config.isVueQuery ? VUE_QUERY_MEMBER : undefined,
  )
  const optionsType = useHelper
    ? `{query?:${queryOptionsType};options?:ClientRequestOptions}`
    : `{query:${queryOptionsType};options?:ClientRequestOptions}`
  const requestArgsCall = makeRequestArgsCall(hasArgs)
  const paginationParam = makePaginationParam(hasArgs, argsType, responseType)
  const paginationSig = useHelper ? `${paginationParam},` : ''
  // Non-helper frameworks (Vue) take pagination's page logic via `options.query`, but
  // `getRequestArgs` is not part of the framework option type — carry it on its own param.
  const vuePaginationParam = `pagination:{${makeGetRequestArgsField(hasArgs, argsType)}}`
  const tail = makeHookTail(config.hookTail, 'infinite')

  // Vue Query: spread factory. Inline `initialPageParam: TPageParam` doesn't satisfy
  // `useInfiniteQuery`'s `MaybeRefDeep<TPageParam>` constraint, but `infiniteQueryOptions(...)`
  // brands the result so the spread is accepted.
  if (config.isVueQuery && useHelper) {
    const argsSig = hasArgs ? `args:MaybeRefOrGetter<${argsType}>,` : ''
    const optionsCall = hasArgs
      ? `${infiniteOptionsGetterName}(args,pagination,clientOptions)`
      : `${infiniteOptionsGetterName}(pagination,clientOptions)`
    return `export function ${hookName}${generics}(${argsSig}${paginationParam},options?:${optionsType}${tail.sig}){const{query:queryOptions,options:clientOptions}=options??{};return ${config.infiniteQueryFn}({...queryOptions,...${optionsCall}}${tail.arg})}`
  }

  if (config.useThunk) {
    const argsSig = hasArgs ? `args:()=>${argsType},` : ''
    if (useFactory) {
      const factoryCall = hasArgs
        ? `${infiniteOptionsGetterName}<TData,TError,TPageParam>(args(),pagination,clientOptions)`
        : `${infiniteOptionsGetterName}<TData,TError,TPageParam>(pagination,clientOptions)`
      return `export function ${hookName}${generics}(${argsSig}${paginationSig}options?:()=>${optionsType}${tail.sig}){return ${config.infiniteQueryFn}(()=>{const{query,options:clientOptions}=options?.()??{};return{...${factoryCall},...query}}${tail.arg})}`
    }
    const keyCall = hasArgs ? `${infiniteKeyGetterName}(args())` : `${infiniteKeyGetterName}()`
    const fetcherCall = `parseResponse(${runtimeAccess}(${requestArgsCall('args()')},{...clientOptions,init:{...clientOptions?.init,signal}}))`
    const body = makeInfiniteHookBody(keyCall, fetcherCall, useHelper, queryKeyType)
    const optionsTypeSig = useHelper ? `options?:()=>${optionsType}` : `options:()=>${optionsType}`
    const destructure = useHelper ? `options?.()??{}` : 'options()'
    return `export function ${hookName}${generics}(${argsSig}${paginationSig}${optionsTypeSig}${tail.sig}){return ${config.infiniteQueryFn}(()=>{const{query,options:clientOptions}=${destructure};return{...query,${body}}}${tail.arg})}`
  }
  if (config.isVueQuery) {
    const argsSig = hasArgs ? `args:MaybeRefOrGetter<${argsType}>,` : ''
    const keyCall = hasArgs
      ? vueReactiveKey(`${infiniteKeyGetterName}(args)`)
      : `${infiniteKeyGetterName}()`
    const fetcherCall = `parseResponse(${runtimeAccess}(${requestArgsCall('toValue(args)')},{...clientOptions,init:{...clientOptions?.init,signal}}))`
    const body = makeInfiniteHookBody(keyCall, fetcherCall, useHelper, queryKeyType, true)
    return `export function ${hookName}${generics}(${argsSig}${vuePaginationParam},options:${optionsType}${tail.sig}){const{query:queryOptions,options:clientOptions}=options;return ${config.infiniteQueryFn}({...queryOptions,${body}}${tail.arg})}`
  }
  const argsSig = hasArgs ? `args:${argsType},` : ''
  if (useFactory) {
    const factoryCall = hasArgs
      ? `${infiniteOptionsGetterName}<TData,TError,TPageParam>(args,pagination,clientOptions)`
      : `${infiniteOptionsGetterName}<TData,TError,TPageParam>(pagination,clientOptions)`
    return `export function ${hookName}${generics}(${argsSig}${paginationSig}options?:${optionsType}${tail.sig}){const{query:queryOptions,options:clientOptions}=options??{};return ${config.infiniteQueryFn}({...${factoryCall},...queryOptions}${tail.arg})}`
  }
  const keyCall = hasArgs ? `${infiniteKeyGetterName}(args)` : `${infiniteKeyGetterName}()`
  const fetcherCall = `parseResponse(${runtimeAccess}(${requestArgsCall('args')},{...clientOptions,init:{...clientOptions?.init,signal}}))`
  const body = makeInfiniteHookBody(keyCall, fetcherCall, useHelper, queryKeyType)
  const optionsTypeSig = useHelper ? `options?:${optionsType}` : `options:${optionsType}`
  const destructure = useHelper ? 'options??{}' : 'options'
  return `export function ${hookName}${generics}(${argsSig}${paginationSig}${optionsTypeSig}${tail.sig}){const{query:queryOptions,options:clientOptions}=${destructure};return ${config.infiniteQueryFn}({...queryOptions,${body}}${tail.arg})}`
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
    const prefix = p.replace(/^\//u, '').split('/')[0]
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
    lines.push(
      "import useSWR from'swr'",
      "import useSWRImmutable from'swr/immutable'",
      "import type{Key,SWRConfiguration}from'swr'",
    )
    if (hasInfiniteQuery) {
      lines.push(
        "import useSWRInfinite from'swr/infinite'",
        "import type{SWRInfiniteConfiguration}from'swr/infinite'",
      )
    }
  } else if (hasMutation) {
    lines.push("import type{Key}from'swr'")
  }
  if (hasMutation) {
    lines.push(
      "import useSWRMutation from'swr/mutation'",
      "import type{SWRMutationConfiguration}from'swr/mutation'",
    )
  }
  // Hono client imports. Infinite (x-pagination) hooks reference InferRequestType in
  // `pagination.getRequestArgs` even when the operation itself takes no args, so the
  // import must follow hasInfiniteQuery too (a document whose only paginated operation
  // takes no args has hasAnyArgs=false).
  const honoTypeImports = [
    'ClientRequestOptions',
    ...(hasAnyArgs || hasInfiniteQuery ? ['InferRequestType'] : []),
  ]
  lines.push(
    `import type{${honoTypeImports.join(',')}}from'hono/client'`,
    "import{parseResponse}from'hono/client'",
    `import{${clientName}}from'${importPath}'`,
  )
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
  keyCall: string,
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
  const optionsSig = `options?:{mutation?:${mutationConfigType}&{swrKey?:Key;throwOnError?:boolean};options?:ClientRequestOptions}`
  if (hasArgs) {
    return `export function ${hookName}${tErrorGeneric}(${optionsSig}){const{mutation:mutationOptions,options:clientOptions}=options??{};const{swrKey:customKey,...restMutationOptions}=mutationOptions??{};const swrKey=customKey??${keyCall};return{swrKey,...useSWRMutation(swrKey,async(_:Key,{arg}:{arg:${argsType}})=>parseResponse(${runtimeAccess}(arg,clientOptions)),restMutationOptions)}}`
  }
  return `export function ${hookName}${tErrorGeneric}(${optionsSig}){const{mutation:mutationOptions,options:clientOptions}=options??{};const{swrKey:customKey,...restMutationOptions}=mutationOptions??{};const swrKey=customKey??${keyCall};return{swrKey,...useSWRMutation(swrKey,async()=>parseResponse(${runtimeAccess}(undefined,clientOptions)),restMutationOptions)}}`
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
    readonly isVueQuery?: boolean
    readonly useMutationOptionsType: string
    readonly errorType?: string
    readonly hookTail?: HookTail
    readonly hasMutationOptionsHelper?: boolean
    readonly unwrapOptionsAccessor?: boolean
  },
  hasNoContent: boolean,
) {
  const variablesType = hasArgs ? argsType : 'void'
  const errorType = config.errorType ?? 'unknown'
  const tErrorGeneric = `<TError=${errorType},TOnMutateResult=unknown>`
  // For 204/205 responses, parseResponse returns undefined
  const dataType = hasNoContent ? `${responseType}|undefined` : responseType
  const fullOptionsType = wrapOptionsType(
    `${config.useMutationOptionsType}<${dataType},TError,${variablesType},TOnMutateResult>`,
    config.unwrapOptionsAccessor,
  )
  // Only forward the type parameters to the factory when it actually accepts them
  // (i.e. wraps with `mutationOptions<...>` helper). Otherwise the factory has no generics.
  const factoryTypeArg = config.hasMutationOptionsHelper ? '<TError,TOnMutateResult>' : ''
  const factoryCall = `${optionsGetterName}${factoryTypeArg}(clientOptions)`
  const tail = makeHookTail(config.hookTail, 'mutation')
  // Vue's members may still be `Ref`s (`MaybeRefDeep`); `useMutation` unwraps them deeply, so a
  // caller's `Ref` key passes through `mutationKey` below as-is.
  const mutationOptionsType = omitInjectedKeys(
    fullOptionsType,
    MUTATION_OMIT_KEYS,
    config.isVueQuery ? VUE_MUTATION_MEMBER : undefined,
  )
  const optionsType = `{mutation?:${mutationOptionsType};options?:ClientRequestOptions}`
  // Spread user options first, then the factory so the operation contract wins — `Omit` only
  // rejects a fresh object literal, so the spread order is the last line of defence against a
  // `mutationFn` smuggled in through a variable. `mutationKey` is then restored from the caller.
  // Svelte Query v5+ requires thunk pattern: createMutation(() => options)
  if (config.useThunk) {
    return `export function ${hookName}${tErrorGeneric}(options?:()=>${optionsType}${tail.sig}){return ${config.mutationFn}(()=>{const{mutation,options:clientOptions}=options?.()??{};const mutationDefaults=${factoryCall};return{...mutation,...mutationDefaults,mutationKey:mutation?.mutationKey??mutationDefaults.mutationKey}}${tail.arg})}`
  }
  return `export function ${hookName}${tErrorGeneric}(options?:${optionsType}${tail.sig}){const{mutation:mutationOptions,options:clientOptions}=options??{};const mutationDefaults=${factoryCall};return ${config.mutationFn}({...mutationOptions,...mutationDefaults,mutationKey:mutationOptions?.mutationKey??mutationDefaults.mutationKey}${tail.arg})}`
}

function makeHookCode(
  pathStr: string,
  method: 'get' | 'put' | 'post' | 'delete' | 'options' | 'head' | 'patch' | 'trace' | 'query',
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
    readonly hookTail?: HookTail
    readonly immutableQueryFn?: string
    readonly unwrapOptionsAccessor?: boolean
  },
  clientName: string,
) {
  const op = item[method]
  if (!isOperationLike(op)) return null
  const hookName = makeHookName(method, pathStr, config.hookPrefix)
  const hasArgs = operationHasArgs(item, op, deps)
  // QUERY is safe and idempotent like GET (a read that carries its parameters in the body),
  // so it yields query hooks, not mutations; everything else mutates.
  const isQuery = method === 'get' || method === 'query'
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
  const honoPath = pathStr.replaceAll(/\{([^}]+)\}/gu, ':$1')
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
        method,
      )
      const hookCode = makeSWRQueryHookCode(
        hookName,
        keyGetterName,
        hasArgs,
        argsType,
        runtimeAccess,
        responseType,
        config.queryFn,
        config.errorType,
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
            responseType,
            config.immutableQueryFn,
            config.errorType,
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
            method,
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
            method,
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
    const mutationKeyGetterName = makeMutationKeyGetterName(method, pathStr, true)
    const mutationKeyGetterCode = makeMutationKeyGetterCode(mutationKeyGetterName, method, honoPath)
    const hookCode = makeSWRMutationHookCode(
      hookName,
      `${mutationKeyGetterName}()`,
      hasArgs,
      argsType,
      responseType,
      runtimeAccess,
      hasNoContent,
      config.errorType,
    )
    return {
      code: `${mutationKeyGetterCode}\n\n${hookCode}`,
      isQuery: false,
      hasArgs,
      hasInfinite: false,
      operationFileName,
    } as const
  }
  // TanStack Query / Vue Query / Svelte Query
  if (isQuery) {
    // For queries, use path-only naming (no HTTP method prefix)
    const queryHookName = makeHookName(queryNameMethod(method), pathStr, config.hookPrefix)
    const pathFuncName = methodPath(queryNameMethod(method), pathStr)
    const keyGetterName = makeQueryKeyGetterName(method, pathStr)
    const optionsGetterName = `get${capitalize(pathFuncName)}QueryOptions`
    const keyGetterCode = makeQueryKeyGetterCode(
      keyGetterName,
      hasArgs,
      argsType,
      honoPath,
      config,
      hasHeaderArgs,
      method,
    )
    const optionsGetterCode = makeQueryOptionsGetterCode(
      optionsGetterName,
      keyGetterName,
      hasArgs,
      argsType,
      runtimeAccess,
      responseType,
      config,
    )
    const hookCode = makeQueryHookCode(
      queryHookName,
      keyGetterName,
      optionsGetterName,
      runtimeAccess,
      hasArgs,
      argsType,
      responseType,
      config,
    )
    // Generate infinite query key getter (only when infinite query hooks are enabled
    // AND endpoint declares `x-pagination: true`)
    const infiniteKeyGetterName = makeInfiniteQueryKeyGetterName(method, pathStr)
    const infiniteOptionsGetterName = `get${capitalize(pathFuncName)}InfiniteQueryOptions`
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
          method,
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
            ...(config.errorType ? { errorType: config.errorType } : {}),
          },
        )
      : null
    const suspenseHookName = `${config.hookPrefix}Suspense${capitalize(pathFuncName)}`
    const suspenseHookCode =
      config.suspenseQueryFn && config.useSuspenseQueryOptionsType
        ? makeQueryHookCode(
            suspenseHookName,
            keyGetterName,
            optionsGetterName,
            runtimeAccess,
            hasArgs,
            argsType,
            responseType,
            {
              queryFn: config.suspenseQueryFn,
              useQueryOptionsType: config.useSuspenseQueryOptionsType,
              ...(config.useThunk ? { useThunk: true } : {}),
              ...(config.isVueQuery ? { isVueQuery: true } : {}),
              ...(config.hasQueryOptionsHelper ? { hasQueryOptionsHelper: true } : {}),
              ...(config.errorType ? { errorType: config.errorType } : {}),
              ...(config.hookTail ? { hookTail: config.hookTail } : {}),
              ...(config.unwrapOptionsAccessor ? { unwrapOptionsAccessor: true } : {}),
            },
          )
        : null
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
            ...(config.hookTail ? { hookTail: config.hookTail } : {}),
            ...(config.unwrapOptionsAccessor ? { unwrapOptionsAccessor: true } : {}),
          },
        )
      : null
    const suspenseInfiniteHookName = `${config.hookPrefix}SuspenseInfinite${capitalize(pathFuncName)}`
    const suspenseInfiniteHookCode =
      hasInfinite && config.suspenseInfiniteQueryFn && config.useSuspenseInfiniteQueryOptionsType
        ? makeInfiniteQueryHookCode(
            suspenseInfiniteHookName,
            runtimeAccess,
            infiniteKeyGetterName,
            infiniteOptionsGetterName,
            hasArgs,
            argsType,
            responseType,
            {
              infiniteQueryFn: config.suspenseInfiniteQueryFn,
              useInfiniteQueryOptionsType: config.useSuspenseInfiniteQueryOptionsType,
              ...(config.useThunk ? { useThunk: true } : {}),
              ...(config.isVueQuery ? { isVueQuery: true } : {}),
              ...(config.hookTail ? { hookTail: config.hookTail } : {}),
              ...(config.hasInfiniteQueryOptionsHelper
                ? { hasInfiniteQueryOptionsHelper: true }
                : {}),
              ...(config.errorType ? { errorType: config.errorType } : {}),
              ...(config.unwrapOptionsAccessor ? { unwrapOptionsAccessor: true } : {}),
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
  const optionsGetterName = `get${capitalize(methodPath(method, pathStr))}MutationOptions`
  const mutationKeyGetterName = makeMutationKeyGetterName(method, pathStr)
  const mutationKeyGetterCode = makeMutationKeyGetterCode(mutationKeyGetterName, method, honoPath)
  const optionsGetterCode = makeMutationOptionsGetterCode(
    optionsGetterName,
    mutationKeyGetterName,
    hasArgs,
    argsType,
    runtimeAccess,
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
    code: `${mutationKeyGetterCode}\n\n${optionsGetterCode}\n\n${hookCode}`,
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
    readonly hookTail?: HookTail
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
      const methods = [
        'get',
        'put',
        'post',
        'delete',
        'options',
        'head',
        'patch',
        'trace',
        'query',
      ] as const
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
    readonly errorType?: string
    readonly hookTail?: HookTail
  },
  hasQueryWithArgs = false,
  hasInfiniteQuery = false,
): string {
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
  // explicit `:QueryFunctionContext` annotation: plain-object query factories (no helper — a
  // bare object literal has no surrounding contextual type for `queryFn`; Vue's hooks drop it
  // since useQuery / useInfiniteQuery provide the typing) and every infinite factory (its
  // context names TPageParam). Helper-backed query factories are contextually typed by
  // `queryOptions(...)`, and the hooks that spread them carry no `queryFn` of their own.
  const needsQueryFnContext = (hasQuery && !config.hasQueryOptionsHelper) || hasInfiniteQuery
  const typeImports = [
    ...(hasQuery ? [config.useQueryOptionsType] : []),
    ...(needsQueryFnContext ? ['QueryFunctionContext'] : []),
    ...(hasQuery && config.useSuspenseQueryOptionsType ? [config.useSuspenseQueryOptionsType] : []),
    ...(hasInfiniteQuery && config.useInfiniteQueryOptionsType
      ? [config.useInfiniteQueryOptionsType]
      : []),
    ...(hasInfiniteQuery && config.useSuspenseInfiniteQueryOptionsType
      ? [config.useSuspenseInfiniteQueryOptionsType]
      : []),
    // InfiniteData: the infinite hooks' TData default, helper or not
    ...(hasInfiniteQuery ? ['InfiniteData'] : []),
    ...(hasMutation ? [config.useMutationOptionsType] : []),
    // The hooks' TError default (e.g. `DefaultError`, which honours `Register`) and the
    // trailing-argument types come from the framework package as well.
    ...(config.errorType ? [config.errorType] : []),
    ...(config.hookTail?.imports ?? []),
  ]
  // Vue Query needs MaybeRefOrGetter type and toValue from 'vue' only when query has args
  // (used in makeQueryKeyGetterCode for args:MaybeRefOrGetter<...> and toValue(args))
  const needsVueImports = config.isVueQuery && hasQueryWithArgs
  // Hono client imports. Infinite (x-pagination) hooks reference InferRequestType in
  // `pagination.getRequestArgs` even when the operation itself takes no args, so the
  // import must follow hasInfiniteQuery too (a document whose only paginated operation
  // takes no args has hasAnyArgs=false).
  const honoTypeImports = [
    'ClientRequestOptions',
    ...(hasAnyArgs || hasInfiniteQuery ? ['InferRequestType'] : []),
  ]
  const lines = [
    ...(queryImports.length > 0
      ? [`import{${queryImports.join(',')}}from'${config.packageName}'`]
      : []),
    ...(typeImports.length > 0
      ? [`import type{${[...new Set(typeImports)].join(',')}}from'${config.packageName}'`]
      : []),
    // Vue Query needs MaybeRefOrGetter type and toValue from 'vue' for queryKey generation (only when query has args)
    ...(needsVueImports
      ? ["import{computed,toValue}from'vue'", "import type{MaybeRefOrGetter}from'vue'"]
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
 */
export function makeQueryHooks(
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
    readonly hookTail?: HookTail
    readonly immutableQueryFn?: string
  },
  clientName = 'client',
) {
  return Effect.gen(function* () {
    const pathsMaybe = openAPI.paths
    if (!isOpenAPIPaths(pathsMaybe)) {
      return yield* new GenerateError({ message: 'Invalid OpenAPI paths' })
    }
    const componentsParameters = openAPI.components?.parameters ?? {}
    const componentsRequestBodies = openAPI.components?.requestBodies ?? {}
    const deps = makeOperationDeps(clientName, componentsParameters, componentsRequestBodies)
    const hookCodes = makeHookCodes(pathsMaybe, deps, config, clientName)
    const prefixKeyCodes = makePrefixKeyCodes(pathsMaybe)
    const hasAnyArgs = hookCodes.some(({ hasArgs }) => hasArgs)
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
    const code = `${header}${body}${hookCodes.length > 0 ? '\n' : ''}`
    yield* emit(code, path.dirname(output), output)
    return `Generated ${config.frameworkName.toLowerCase().replaceAll(' ', '-')} hooks written to ${output}`
  })
}
