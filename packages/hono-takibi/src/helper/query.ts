import path from 'node:path'

import { Effect } from 'effect'

import { HTTP_METHODS } from '../constants/index.js'
import { emit } from '../emit/index.js'
import { GenerateError } from '../error/index.js'
import { hasNoContentResponse, isOpenAPIPaths, isOperationLike, isRecord } from '../guard/index.js'
import type { OpenAPI, OpenAPIPaths } from '../openapi/index.js'
import { capitalize, routeName, toIdentifierPascalCase } from '../utils/index.js'
import { makeGroupClientName, operationTags } from './group.js'
import type { Grouping } from './group.js'
import { formatPath, makeOperationDeps, operationHasArgs, parsePathItem } from './rpc.js'

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
  return tail
    ? ({ sig: `,${tail.name}?:${tail[kind]}` as const, arg: `,${tail.name}` as const } as const)
    : ({ sig: '' as const, arg: '' as const } as const)
}

// Solid Query types its option objects as `Accessor<...>` (a thunk), because `createQuery`
// takes the whole options object as a thunk. The user-facing `options.query` slot needs the
// *unwrapped* object: spreading an accessor copies a function's (empty) own properties, so the
// caller's options are silently dropped at runtime and TError never reaches the result.
// `ReturnType<...>` is the same unwrapping Solid itself uses to declare `queryOptions()`.
function makeOptionsType(optionsType: string, unwrapAccessor?: boolean) {
  return unwrapAccessor ? (`ReturnType<${optionsType}>` as const) : optionsType
}

// The hook supplies these itself, so `options.query` leaves them out — the shape
// openapi-react-query uses. The libraries type `queryKey` as required, which otherwise forces the
// caller to pass a key the hook then overwrites, and leaves `select` unable to bind TData.
const QUERY_OMIT_KEYS = `'queryKey'|'queryFn'` as const
// Infinite hooks with the helper also supply both page-param functions, from `pagination`.
const INFINITE_OMIT_KEYS = `'queryKey'|'queryFn'|'initialPageParam'|'getNextPageParam'` as const
// Mutation hooks supply `mutationFn` — the operation contract that types `data` — so the slot
// leaves it out. `mutationKey` stays: mutations are not cached, so the key is metadata rather
// than identity (`useIsMutating` / `useMutationState` filter on it, `setMutationDefaults`
// registers against it), and the hook honours the caller's key over the factory's, the way the
// SWR mutation hook already honours `swrKey`.
const MUTATION_OMIT_KEYS = `'mutationFn'` as const

// Vue's option types are unions — `MaybeRef<{...}>` (`Ref | ComputedRef | object`), plus a getter
// for mutations — and a plain `Omit` over a union keeps only the keys every member shares: none.
// The hook spreads the value, which only works on the plain object anyway, so `Extract` keeps
// that member. For queries it is the only one with the required `queryKey`. Mutation options are
// all optional, so the probe is a weak type: a `Ref` (only `value`) and a getter (no properties)
// share nothing with it and drop out, while the plain object matches.
const VUE_QUERY_MEMBER = `{queryKey:unknown}` as const
const VUE_MUTATION_MEMBER = `{mutationFn?:unknown}` as const
function makeOmitInjectedKeys(optionsType: string, keys: string, vueMember?: string) {
  const objectType = vueMember ? (`Extract<${optionsType},${vueMember}>` as const) : optionsType
  return `Omit<${objectType},${keys}>` as const
}

function makeHookName(method: string, pathStr: string, prefix: string, paths: OpenAPIPaths) {
  const funcName = routeName(method, pathStr, paths)
  return `${prefix}${capitalize(funcName)}` as const
}

// e.g. ('client','get','/users/{id}') → "client.users[':id'].$get"
function makeRuntimeAccess(
  clientName: string,
  method: string,
  pathStr: string,
  hasBasePath = false,
) {
  const pathResult = formatPath(pathStr, hasBasePath)
  return `${clientName}${pathResult.runtimePath}.$${method}`
}

// A bracketed path (`client.users[':id']`) cannot be reached through `typeof` on the runtime
// expression, so the type position indexes the method off the bracket instead.
function makeTypeAccess(clientName: string, method: string, pathStr: string, hasBasePath = false) {
  const pathResult = formatPath(pathStr, hasBasePath)
  return pathResult.hasBracket
    ? (`typeof ${clientName}${pathResult.typeofPrefix}${pathResult.bracketSuffix}['$${method}']` as const)
    : (`typeof ${clientName}${pathResult.runtimePath}.$${method}` as const)
}

// Chains Awaited/ReturnType/typeof parseResponse to derive parsed JSON shape.
function makeResponseTypeFromClient(
  clientName: string,
  method: string,
  pathStr: string,
  hasBasePath = false,
) {
  return `Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<${makeTypeAccess(clientName, method, pathStr, hasBasePath)}>>>>>` as const
}

function makeArgsType(clientName: string, method: string, pathStr: string, hasBasePath = false) {
  return `InferRequestType<${makeTypeAccess(clientName, method, pathStr, hasBasePath)}>` as const
}

// GET is the resource's default read, so its query-side names carry only the path (`useUsers`,
// `getUsersQueryKey`). The other safe method that yields query hooks — QUERY (OpenAPI 3.2,
// `createRoute({ method: 'query' })`, `client.x.$query`) — keeps its method in the names
// (`useQueryUsers`, `getQueryUsersQueryKey`) so it can sit next to the GET on the same path, the
// way mutation names already do. Its keys carry the method too: `['users', '/users', 'QUERY', args]`.
function queryNameMethod(method: string) {
  return method === 'get' ? '' : method
}

function makeQueryKeyGetterName(
  method: string,
  pathStr: string,
  paths: OpenAPIPaths,
  isSWR?: boolean,
) {
  if (isSWR) {
    return `get${capitalize(routeName(method, pathStr, paths))}Key` as const
  }
  return `get${capitalize(routeName(queryNameMethod(method), pathStr, paths))}QueryKey` as const
}

// Mutations keep the method in their key — several methods share a path — and, like the query
// side, expose the key through a getter so `useIsMutating` / `setMutationDefaults` callers do not
// have to reach into the options factory for it.
function makeMutationKeyGetterName(
  method: string,
  pathStr: string,
  paths: OpenAPIPaths,
  isSWR?: boolean,
) {
  if (isSWR) {
    return `get${capitalize(routeName(method, pathStr, paths))}Key`
  }
  return `get${capitalize(routeName(method, pathStr, paths))}MutationKey`
}

function makeMutationKeyGetterCode(keyGetterName: string, method: string, honoPath: string) {
  const prefix = honoPath.replace(/^\//u, '').split('/')[0]
  return `export function ${keyGetterName}(){return['${prefix}','${honoPath}','${method.toUpperCase()}']as const}`
}

function makeInfiniteQueryKeyGetterName(
  method: string,
  pathStr: string,
  paths: OpenAPIPaths,
  isSWR?: boolean,
) {
  if (isSWR) {
    return `get${capitalize(routeName(method, pathStr, paths))}InfiniteKey`
  }
  return `get${capitalize(routeName(queryNameMethod(method), pathStr, paths))}InfiniteQueryKey`
}

// Vue hooks take `args` as `MaybeRefOrGetter`, so the key has to follow it: a plain getter call
// unwraps once at setup and freezes the key, and a changed `Ref` would never refetch. `computed`
// keeps it live — Vue Query unwraps `MaybeRefDeep` keys itself. The key getters stay plain
// arrays, which is what invalidation and cache lookups want.
function makeVueReactiveKey(keyCall: string) {
  return `computed(()=>${keyCall})` as const
}

// The parts of the arguments a key leaves out. A header and a cookie say who asks, not what
// is asked for: the same resource under another token is the same cache entry, and a token
// in the key would be written out by a persisted cache and shown by the devtools. In the
// browser a `cookie` argument is not even sent, `Cookie` being a forbidden header.
const KEY_EXCLUDED_ARGS = ['header', 'cookie'] as const

type KeyExcludedArg = (typeof KEY_EXCLUDED_ARGS)[number]

// What stands for the arguments in a key: the arguments as they are, or the rest of them
// after the excluded parts are destructured away, `const{header:_,cookie:__,...keyArgs}=args`.
function makeKeyArgs(excluded: readonly KeyExcludedArg[], args: string) {
  if (excluded.length === 0) return { declaration: '', value: args } as const
  const picks = excluded.map((name, i) => `${name}:${'_'.repeat(i + 1)}`).join(',')
  return { declaration: `const{${picks},...keyArgs}=${args};`, value: 'keyArgs' } as const
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
  excluded: readonly KeyExcludedArg[] = [],
  method = 'get',
) {
  // First path segment, e.g. '/pet/findByStatus' → 'pet'
  const prefix = honoPath.replace(/^\//u, '').split('/')[0]
  const methodKey = method === 'get' ? '' : `,'${method.toUpperCase()}'`
  if (!hasArgs) {
    return `export function ${keyGetterName}(){return['${prefix}','${honoPath}'${methodKey}]as const}`
  }
  if (config.isVueQuery) {
    const { declaration, value } = makeKeyArgs(excluded, 'toValue(args)')
    return `export function ${keyGetterName}(args:MaybeRefOrGetter<${argsType}>){${declaration}return['${prefix}','${honoPath}'${methodKey},${value}]as const}`
  }
  const { declaration, value } = makeKeyArgs(excluded, 'args')
  return `export function ${keyGetterName}(args:${argsType}){${declaration}return['${prefix}','${honoPath}'${methodKey},${value}]as const}`
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
  excluded: readonly KeyExcludedArg[] = [],
  method = 'get',
) {
  const prefix = honoPath.replace(/^\//u, '').split('/')[0]
  const methodKey = method === 'get' ? '' : `,'${method.toUpperCase()}'`
  if (!hasArgs) {
    return `export function ${keyGetterName}(){return['${prefix}','${honoPath}'${methodKey},'infinite']as const}` as const
  }
  if (config.isVueQuery) {
    const { declaration, value } = makeKeyArgs(excluded, 'toValue(args)')
    return `export function ${keyGetterName}(args:MaybeRefOrGetter<${argsType}>){${declaration}return['${prefix}','${honoPath}'${methodKey},'infinite',${value}]as const}` as const
  }
  const { declaration, value } = makeKeyArgs(excluded, 'args')
  return `export function ${keyGetterName}(args:${argsType}){${declaration}return['${prefix}','${honoPath}'${methodKey},'infinite',${value}]as const}` as const
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
  const queryKeyCall = hasArgs
    ? (`${keyGetterName}(args)` as const)
    : (`${keyGetterName}()` as const)
  // With `queryOptions(...)` helper, `signal` is contextually typed; without, annotate explicitly.
  const queryFnSig = config.hasQueryOptionsHelper
    ? ('{signal}' as const)
    : ('{signal}:QueryFunctionContext' as const)
  if (config.isVueQuery && hasArgs) {
    const fetcherCall =
      `parseResponse(${runtimeAccess}(toValue(args),{...options,init:{...options?.init,signal}}))` as const
    const bodyContent =
      `queryKey:${makeVueReactiveKey(queryKeyCall)},queryFn(${queryFnSig}){return ${fetcherCall}}` as const
    const returnExpr = config.hasQueryOptionsHelper
      ? (`queryOptions({${bodyContent}})` as const)
      : (`{${bodyContent}}` as const)
    return `export function ${optionsGetterName}(args:MaybeRefOrGetter<${argsType}>,options?:ClientRequestOptions){return ${returnExpr}}` as const
  }
  const fetcherCall = hasArgs
    ? (`parseResponse(${runtimeAccess}(args,{...options,init:{...options?.init,signal}}))` as const)
    : (`parseResponse(${runtimeAccess}(undefined,{...options,init:{...options?.init,signal}}))` as const)
  const bodyContent =
    `queryKey:${queryKeyCall},queryFn(${queryFnSig}){return ${fetcherCall}}` as const
  // Vue keeps the plain `queryOptions({...})` form: its hooks do not spread the factory
  // (see `makeQueryHookCode`), so the generics would be dead weight there.
  const carriesHookGenerics = config.hasQueryOptionsHelper === true && !config.isVueQuery
  const generics = carriesHookGenerics
    ? (`<TData=${responseType},TError=${config.errorType ?? 'unknown'}>` as const)
    : ('' as const)
  const returnExpr = carriesHookGenerics
    ? (`queryOptions<${responseType},TError,TData,ReturnType<typeof ${keyGetterName}>>({${bodyContent}})` as const)
    : config.hasQueryOptionsHelper
      ? (`queryOptions({${bodyContent}})` as const)
      : (`{${bodyContent}}` as const)
  if (hasArgs) {
    return `export function ${optionsGetterName}${generics}(args:${argsType},options?:ClientRequestOptions){return ${returnExpr}}` as const
  }
  return `export function ${optionsGetterName}${generics}(options?:ClientRequestOptions){return ${returnExpr}}` as const
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
    ? (`getRequestArgs:(args:${argsType},pageParam:unknown)=>${argsType}` as const)
    : (`getRequestArgs:(pageParam:unknown)=>${argsType}` as const)
}

function makeRequestArgsCall(hasArgs: boolean) {
  return (argsExpr: string) =>
    hasArgs
      ? (`pagination.getRequestArgs(${argsExpr},pageParam)` as const)
      : (`pagination.getRequestArgs(pageParam)` as const)
}

// `getNextPageParam` mirrors TanStack's GetNextPageParamFunction arity, `allPageParams` included.
// @see https://tanstack.com/query/latest/docs/framework/react/reference/useInfiniteQuery
function makePaginationParam(hasArgs: boolean, argsType: string, responseType: string) {
  return `pagination:{initialPageParam:TPageParam;getNextPageParam:(lastPage:${responseType},allPages:${responseType}[],lastPageParam:TPageParam,allPageParams:TPageParam[])=>TPageParam|undefined|null;${makeGetRequestArgsField(hasArgs, argsType)}}` as const
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
  const queryKeyCall = hasArgs
    ? `${infiniteKeyGetterName}(args)`
    : (`${infiniteKeyGetterName}()` as const)
  const queryKeyType = `ReturnType<typeof ${infiniteKeyGetterName}>` as const
  // Vue: the factory's key is a `ComputedRef`, and Vue Query cannot infer TQueryKey through
  // `MaybeRefDeep<ComputedRef<...>>`, so a context pinned to the exact tuple stops the factory
  // from spreading into `useInfiniteQuery`. The queryFn never reads `queryKey`, so keep it wide.
  const queryFnSig = config.isVueQuery
    ? ('{pageParam,signal}:QueryFunctionContext<readonly unknown[],TPageParam>' as const)
    : (`{pageParam,signal}:QueryFunctionContext<${queryKeyType},TPageParam>` as const)
  const requestArgsCall = makeRequestArgsCall(hasArgs)
  if (config.hasInfiniteQueryOptionsHelper) {
    const paginationParam = makePaginationParam(hasArgs, argsType, responseType)
    if (config.isVueQuery && hasArgs) {
      const fetcherCall =
        `parseResponse(${runtimeAccess}(${requestArgsCall('toValue(args)')},{...options,init:{...options?.init,signal}}))` as const
      const body =
        `queryKey:${makeVueReactiveKey(queryKeyCall)},queryFn(${queryFnSig}){return ${fetcherCall}},initialPageParam:pagination.initialPageParam,getNextPageParam:pagination.getNextPageParam` as const
      return `export function ${optionsGetterName}<TPageParam=unknown>(args:MaybeRefOrGetter<${argsType}>,${paginationParam},options?:ClientRequestOptions){return infiniteQueryOptions({${body}})}` as const
    }
    const fetcherCall =
      `parseResponse(${runtimeAccess}(${requestArgsCall('args')},{...options,init:{...options?.init,signal}}))` as const
    const body =
      `queryKey:${queryKeyCall},queryFn(${queryFnSig}){return ${fetcherCall}},initialPageParam:pagination.initialPageParam,getNextPageParam:pagination.getNextPageParam` as const
    const generics =
      `<TData=InfiniteData<${responseType}>,TError=${config.errorType ?? 'unknown'},TPageParam=unknown>` as const
    const helperCall =
      `infiniteQueryOptions<${responseType},TError,TData,${queryKeyType},TPageParam>({${body}})` as const
    if (hasArgs) {
      return `export function ${optionsGetterName}${generics}(args:${argsType},${paginationParam},options?:ClientRequestOptions){return ${helperCall}}` as const
    }
    return `export function ${optionsGetterName}${generics}(${paginationParam},options?:ClientRequestOptions){return ${helperCall}}` as const
  }
  // Branch 2: plain object (no helper). `pagination` carries only `getRequestArgs`; the caller
  // supplies initialPageParam/getNextPageParam via the spread-in options at the hook site.
  const vuePaginationParam = `pagination:{${makeGetRequestArgsField(hasArgs, argsType)}}`
  if (config.isVueQuery && hasArgs) {
    const fetcherCall =
      `parseResponse(${runtimeAccess}(${requestArgsCall('toValue(args)')},{...options,init:{...options?.init,signal}}))` as const
    const bodyContent =
      `queryKey:${makeVueReactiveKey(queryKeyCall)},queryFn(${queryFnSig}){return ${fetcherCall}}` as const
    return `export function ${optionsGetterName}<TPageParam=unknown>(args:MaybeRefOrGetter<${argsType}>,${vuePaginationParam},options?:ClientRequestOptions){return {${bodyContent}}}` as const
  }
  const fetcherCall =
    `parseResponse(${runtimeAccess}(${requestArgsCall('args')},{...options,init:{...options?.init,signal}}))` as const
  const bodyContent =
    `queryKey:${queryKeyCall},queryFn(${queryFnSig}){return ${fetcherCall}}` as const
  if (hasArgs) {
    return `export function ${optionsGetterName}<TPageParam=unknown>(args:${argsType},${vuePaginationParam},options?:ClientRequestOptions){return {${bodyContent}}}` as const
  }
  return `export function ${optionsGetterName}<TPageParam=unknown>(${vuePaginationParam},options?:ClientRequestOptions){return {${bodyContent}}}` as const
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
  const inlineKey = `${keyGetterName}()` as const
  const errorType = config.errorType ?? ('unknown' as const)
  // TError/TOnMutateResult are only useful when wrapped by `mutationOptions<...>`.
  // TOnMutateResult carries `onMutate`'s return value through to onError/onSuccess/onSettled.
  const tErrorGeneric = config.hasMutationOptionsHelper
    ? (`<TError=${errorType},TOnMutateResult=unknown>` as const)
    : ('' as const)
  const dataType = hasNoContent ? `${responseType}|undefined` : responseType
  const variablesType = hasArgs ? argsType : ('void' as const)
  const typeArgs = `<${dataType},TError,${variablesType},TOnMutateResult>` as const
  if (hasArgs) {
    const bodyContent =
      `mutationKey:${inlineKey},async mutationFn(args:${argsType}){return parseResponse(${runtimeAccess}(args,options))}` as const
    const returnExpr = config.hasMutationOptionsHelper
      ? (`mutationOptions${typeArgs}({${bodyContent}})` as const)
      : (`{${bodyContent}}` as const)
    return `export function ${optionsGetterName}${tErrorGeneric}(options?:ClientRequestOptions){return ${returnExpr}}` as const
  }
  const bodyContent =
    `mutationKey:${inlineKey},async mutationFn(){return parseResponse(${runtimeAccess}(undefined,options))}` as const
  const returnExpr = config.hasMutationOptionsHelper
    ? (`mutationOptions${typeArgs}({${bodyContent}})` as const)
    : (`{${bodyContent}}` as const)
  return `export function ${optionsGetterName}${tErrorGeneric}(options?:ClientRequestOptions){return ${returnExpr}}` as const
}

/**
 * Generates SWR query hook code.
 *
 * SWR pattern: useSWR(key, fetcher, options)
 * - key: null to disable, otherwise the cache key. `enabled: false` and `swrKey: null` both
 *   yield it; only an absent `swrKey` falls back to the generated key
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
  const argsSig = hasArgs ? (`args:${argsType},` as const) : ('' as const)
  // Bare `SWRConfiguration` defaults Data/Error to `any`, leaking `any` into `fallbackData`,
  // `onSuccess`, `onError` and `compare` at the call site. Pin them to the operation's types.
  const tErrorGeneric = `<TError=${errorType}>` as const
  const swrConfigType =
    `SWRConfiguration<${responseType},TError>&{swrKey?:Key;enabled?:boolean}` as const
  const optionsSig = `options?:{swr?:${swrConfigType};options?:ClientRequestOptions}` as const
  const keyCall = hasArgs ? `${keyGetterName}(args)` : (`${keyGetterName}()` as const)
  const fetcherCall = hasArgs
    ? (`parseResponse(${runtimeAccess}(args,clientOptions))` as const)
    : (`parseResponse(${runtimeAccess}(undefined,clientOptions))` as const)
  // `useSWR` cannot infer Error from the config alone and falls back to `any` (unlike the
  // mutation/infinite variants). Pass the type arguments so TError reaches the returned `error`.
  return `export function ${hookName}${tErrorGeneric}(${argsSig}${optionsSig}){const{swr:swrOptions,options:clientOptions}=options??{};const{swrKey:customKey,enabled,...restSwrOptions}=swrOptions??{};const swrKey=enabled!==false?(customKey===undefined?${keyCall}:customKey):null;return{swrKey,...${queryFn}<${responseType},TError>(swrKey,async()=>${fetcherCall},restSwrOptions)}}` as const
}

/**
 * Generates SWR Infinite query hook code.
 *
 * SWR Infinite pattern: useSWRInfinite(getKey, fetcher, options)
 * - getKey: (index: number, previousPageData: Data | null) => Key. `enabled: false` swaps in a
 *   loader that returns null for every page
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
  const argsSig = hasArgs ? (`args:${argsType},` as const) : ('' as const)
  // TError generic enables custom error types: useInfiniteUsers<APIError>(...)
  const tErrorGeneric = `<TError=${errorType}>` as const
  const keyCall = hasArgs
    ? (`${infiniteKeyGetterName}(args)` as const)
    : (`${infiniteKeyGetterName}()` as const)
  // SWR passes the keyLoader's return value to the fetcher as a single argument
  // (SWRInfiniteFetcher = (args: ReturnType<KeyLoader>) => ...). The default keyLoader appends
  // the page `index`, which the fetcher reads back and hands to the caller's `getRequestArgs`.
  // `swrKey` is narrowed to the same index-loader shape so the fetcher's index stays typed.
  const keyType = `ReturnType<typeof ${infiniteKeyGetterName}>` as const
  const loaderKeyType = `readonly[...${keyType},number]` as const
  const swrConfigType =
    `SWRInfiniteConfiguration<${responseType},TError>&{swrKey?:(index:number,previousPageData:${responseType}|null)=>${loaderKeyType}|null;enabled?:boolean}` as const
  const getRequestArgsField = hasArgs
    ? (`getRequestArgs:(args:${argsType},index:number)=>${argsType}` as const)
    : (`getRequestArgs:(index:number)=>${argsType}` as const)
  const optionsSig =
    `options:{swr?:${swrConfigType};options?:ClientRequestOptions;pagination:{${getRequestArgsField}}}` as const
  // The page index sits after prefix, path, the method segment (non-GET only), 'infinite' and args.
  const leadingKeyParts = (hasArgs ? 4 : 3) + (method === 'get' ? 0 : 1)
  const indexDestructure = `[${','.repeat(leadingKeyParts)}index]:${loaderKeyType}` as const
  const requestArgs = hasArgs
    ? (`pagination.getRequestArgs(args,index)` as const)
    : (`pagination.getRequestArgs(index)` as const)
  return `export function ${hookName}${tErrorGeneric}(${argsSig}${optionsSig}){const{swr:swrOptions,options:clientOptions,pagination}=options;const{swrKey:customKeyLoader,enabled,...restSwrOptions}=swrOptions??{};const keyLoader=enabled!==false?(customKeyLoader??((index:number)=>[...${keyCall},index]as const)):()=>null;return useSWRInfinite(keyLoader,(${indexDestructure})=>parseResponse(${runtimeAccess}(${requestArgs},clientOptions)),restSwrOptions)}` as const
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
  const generics = `<TData=${responseType},TError=${errorType}>` as const
  const useFactory = config.hasQueryOptionsHelper === true && !config.isVueQuery
  // Vue spells out TQueryKey (via its 5-parameter form): left at the `QueryKey` default, the
  // options' key-typed members (`persister`, …) clash with the narrow key the hook supplies.
  // Hooks that spread the factory pin it too, to the factory's own key tuple.
  const optionsTypeArgs = config.isVueQuery
    ? (`${responseType},TError,TData,${responseType},ReturnType<typeof ${keyGetterName}>` as const)
    : useFactory
      ? (`${responseType},TError,TData,ReturnType<typeof ${keyGetterName}>` as const)
      : (`${responseType},TError,TData` as const)
  const queryOptionsType = makeOmitInjectedKeys(
    makeOptionsType(
      `${config.useQueryOptionsType}<${optionsTypeArgs}>` as const,
      config.unwrapOptionsAccessor,
    ),
    QUERY_OMIT_KEYS,
    config.isVueQuery ? VUE_QUERY_MEMBER : undefined,
  )
  const optionsType = `{query?:${queryOptionsType};options?:ClientRequestOptions}` as const
  const keyCall = hasArgs ? (`${keyGetterName}(args)` as const) : (`${keyGetterName}()` as const)
  const tail = makeHookTail(config.hookTail, 'query')
  // Svelte Query v5+ requires thunk pattern: createQuery(() => options)
  if (config.useThunk) {
    const argsSig = hasArgs ? `args:()=>${argsType},` : ''
    if (useFactory) {
      const factoryCall = hasArgs
        ? (`${optionsGetterName}<TData,TError>(args(),clientOptions)` as const)
        : (`${optionsGetterName}<TData,TError>(clientOptions)` as const)
      return `export function ${hookName}${generics}(${argsSig}options?:()=>${optionsType}${tail.sig}){return ${config.queryFn}(()=>{const{query,options:clientOptions}=options?.()??{};return{...${factoryCall},...query}}${tail.arg})}` as const
    }
    const svelteKeyCall = hasArgs
      ? (`${keyGetterName}(args())` as const)
      : (`${keyGetterName}()` as const)
    const fetcherCall = hasArgs
      ? (`parseResponse(${runtimeAccess}(args(),{...clientOptions,init:{...clientOptions?.init,signal}}))` as const)
      : (`parseResponse(${runtimeAccess}(undefined,{...clientOptions,init:{...clientOptions?.init,signal}}))` as const)
    return `export function ${hookName}${generics}(${argsSig}options?:()=>${optionsType}${tail.sig}){return ${config.queryFn}(()=>{const{query,options:clientOptions}=options?.()??{};return{...query,queryKey:${svelteKeyCall},queryFn({signal}:QueryFunctionContext){return ${fetcherCall}}}}${tail.arg})}` as const
  }
  if (config.isVueQuery) {
    const argsSig = hasArgs ? (`args:MaybeRefOrGetter<${argsType}>,` as const) : ('' as const)
    const fetcherCall = hasArgs
      ? (`parseResponse(${runtimeAccess}(toValue(args),{...clientOptions,init:{...clientOptions?.init,signal}}))` as const)
      : (`parseResponse(${runtimeAccess}(undefined,{...clientOptions,init:{...clientOptions?.init,signal}}))` as const)
    const vueKeyCall = hasArgs ? makeVueReactiveKey(keyCall) : keyCall
    // The type arguments are spelled out: inferred from the options object, Vue Query's
    // `MaybeRefDeep` walks the response type once per member it could be inferred from, which
    // on a large response is more instantiation than TypeScript allows (TS2589).
    const queryTypeArgs =
      `${responseType},TError,TData,ReturnType<typeof ${keyGetterName}>` as const
    return `export function ${hookName}${generics}(${argsSig}options?:${optionsType}${tail.sig}){const{query:queryOptions,options:clientOptions}=options??{};return ${config.queryFn}<${queryTypeArgs}>({...queryOptions,queryKey:${vueKeyCall},queryFn({signal}){return ${fetcherCall}}}${tail.arg})}` as const
  }
  const argsSig = hasArgs ? (`args:${argsType},` as const) : ('' as const)
  if (useFactory) {
    const factoryCall = hasArgs
      ? (`${optionsGetterName}<TData,TError>(args,clientOptions)` as const)
      : (`${optionsGetterName}<TData,TError>(clientOptions)` as const)
    return `export function ${hookName}${generics}(${argsSig}options?:${optionsType}${tail.sig}){const{query:queryOptions,options:clientOptions}=options??{};return ${config.queryFn}({...${factoryCall},...queryOptions}${tail.arg})}` as const
  }
  const fetcherCall = hasArgs
    ? (`parseResponse(${runtimeAccess}(args,{...clientOptions,init:{...clientOptions?.init,signal}}))` as const)
    : (`parseResponse(${runtimeAccess}(undefined,{...clientOptions,init:{...clientOptions?.init,signal}}))` as const)
  return `export function ${hookName}${generics}(${argsSig}options?:${optionsType}${tail.sig}){const{query:queryOptions,options:clientOptions}=options??{};return ${config.queryFn}({...queryOptions,queryKey:${keyCall},queryFn({signal}:QueryFunctionContext){return ${fetcherCall}}}${tail.arg})}` as const
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
    ? ('{pageParam,signal}' as const)
    : (`{pageParam,signal}:QueryFunctionContext<${queryKeyType},TPageParam>` as const)
  const base = `queryKey:${keyCall},queryFn(${queryFnSig}){return ${fetcherCall}}` as const
  return useHelper
    ? (`${base},initialPageParam:pagination.initialPageParam,getNextPageParam:pagination.getNextPageParam` as const)
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
  const errorType = config.errorType ?? ('unknown' as const)
  // TData defaults to `InfiniteData<...>` (v5 semantics) with or without the helper — `data` is
  // the pages container either way. With the helper, pagination is a separate required arg so
  // options.query becomes optional; without it, users supply pagination via options.query.
  const useHelper = config.hasInfiniteQueryOptionsHelper === true
  // Spread the generic factory wherever the helper is in play (Vue's helper branch below is
  // the exception: its factory keeps `<TPageParam>` only, so the hook spreads it un-typed).
  const useFactory = useHelper && !config.isVueQuery
  const tDataDefault = `InfiniteData<${responseType}>` as const
  const generics = `<TData=${tDataDefault},TError=${errorType},TPageParam=unknown>` as const
  const queryKeyType = `ReturnType<typeof ${infiniteKeyGetterName}>` as const
  // Without the helper (Vue) the page-param functions travel in `options.query`, so they stay.
  const queryOptionsType = makeOmitInjectedKeys(
    makeOptionsType(
      `${config.useInfiniteQueryOptionsType}<${responseType},TError,TData,${queryKeyType},TPageParam>` as const,
      config.unwrapOptionsAccessor,
    ),
    useHelper ? INFINITE_OMIT_KEYS : QUERY_OMIT_KEYS,
    config.isVueQuery ? VUE_QUERY_MEMBER : undefined,
  )
  const optionsType = useHelper
    ? (`{query?:${queryOptionsType};options?:ClientRequestOptions}` as const)
    : (`{query:${queryOptionsType};options?:ClientRequestOptions}` as const)
  const requestArgsCall = makeRequestArgsCall(hasArgs)
  const paginationParam = makePaginationParam(hasArgs, argsType, responseType)
  const paginationSig = useHelper ? (`${paginationParam},` as const) : ('' as const)
  // Non-helper frameworks (Vue) take pagination's page logic via `options.query`, but
  // `getRequestArgs` is not part of the framework option type — carry it on its own param.
  const vuePaginationParam = `pagination:{${makeGetRequestArgsField(hasArgs, argsType)}}` as const
  const tail = makeHookTail(config.hookTail, 'infinite')

  // Vue Query: spread factory. Inline `initialPageParam: TPageParam` doesn't satisfy
  // `useInfiniteQuery`'s `MaybeRefDeep<TPageParam>` constraint, but `infiniteQueryOptions(...)`
  // brands the result so the spread is accepted.
  if (config.isVueQuery && useHelper) {
    const argsSig = hasArgs ? (`args:MaybeRefOrGetter<${argsType}>,` as const) : ('' as const)
    const optionsCall = hasArgs
      ? (`${infiniteOptionsGetterName}(args,pagination,clientOptions)` as const)
      : (`${infiniteOptionsGetterName}(pagination,clientOptions)` as const)
    return `export function ${hookName}${generics}(${argsSig}${paginationParam},options?:${optionsType}${tail.sig}){const{query:queryOptions,options:clientOptions}=options??{};return ${config.infiniteQueryFn}({...queryOptions,...${optionsCall}}${tail.arg})}` as const
  }

  if (config.useThunk) {
    const argsSig = hasArgs ? (`args:()=>${argsType},` as const) : ('' as const)
    if (useFactory) {
      const factoryCall = hasArgs
        ? (`${infiniteOptionsGetterName}<TData,TError,TPageParam>(args(),pagination,clientOptions)` as const)
        : (`${infiniteOptionsGetterName}<TData,TError,TPageParam>(pagination,clientOptions)` as const)
      return `export function ${hookName}${generics}(${argsSig}${paginationSig}options?:()=>${optionsType}${tail.sig}){return ${config.infiniteQueryFn}(()=>{const{query,options:clientOptions}=options?.()??{};return{...${factoryCall},...query}}${tail.arg})}` as const
    }
    const keyCall = hasArgs
      ? (`${infiniteKeyGetterName}(args())` as const)
      : (`${infiniteKeyGetterName}()` as const)
    const fetcherCall =
      `parseResponse(${runtimeAccess}(${requestArgsCall('args()')},{...clientOptions,init:{...clientOptions?.init,signal}}))` as const
    const body = makeInfiniteHookBody(keyCall, fetcherCall, useHelper, queryKeyType)
    const optionsTypeSig = useHelper
      ? (`options?:()=>${optionsType}` as const)
      : (`options:()=>${optionsType}` as const)
    const destructure = useHelper ? (`options?.()??{}` as const) : ('options()' as const)
    return `export function ${hookName}${generics}(${argsSig}${paginationSig}${optionsTypeSig}${tail.sig}){return ${config.infiniteQueryFn}(()=>{const{query,options:clientOptions}=${destructure};return{...query,${body}}}${tail.arg})}` as const
  }
  if (config.isVueQuery) {
    const argsSig = hasArgs ? (`args:MaybeRefOrGetter<${argsType}>,` as const) : ('' as const)
    const keyCall = hasArgs
      ? makeVueReactiveKey(`${infiniteKeyGetterName}(args)` as const)
      : (`${infiniteKeyGetterName}()` as const)
    const fetcherCall =
      `parseResponse(${runtimeAccess}(${requestArgsCall('toValue(args)' as const)},{...clientOptions,init:{...clientOptions?.init,signal}}))` as const
    const body = makeInfiniteHookBody(keyCall, fetcherCall, useHelper, queryKeyType, true)
    return `export function ${hookName}${generics}(${argsSig}${vuePaginationParam},options:${optionsType}${tail.sig}){const{query:queryOptions,options:clientOptions}=options;return ${config.infiniteQueryFn}({...queryOptions,${body}}${tail.arg})}` as const
  }
  const argsSig = hasArgs ? (`args:${argsType},` as const) : ('' as const)
  if (useFactory) {
    const factoryCall = hasArgs
      ? (`${infiniteOptionsGetterName}<TData,TError,TPageParam>(args,pagination,clientOptions)` as const)
      : (`${infiniteOptionsGetterName}<TData,TError,TPageParam>(pagination,clientOptions)` as const)
    return `export function ${hookName}${generics}(${argsSig}${paginationSig}options?:${optionsType}${tail.sig}){const{query:queryOptions,options:clientOptions}=options??{};return ${config.infiniteQueryFn}({...${factoryCall},...queryOptions}${tail.arg})}` as const
  }
  const keyCall = hasArgs
    ? (`${infiniteKeyGetterName}(args)` as const)
    : (`${infiniteKeyGetterName}()` as const)
  const fetcherCall =
    `parseResponse(${runtimeAccess}(${requestArgsCall('args')},{...clientOptions,init:{...clientOptions?.init,signal}}))` as const
  const body = makeInfiniteHookBody(keyCall, fetcherCall, useHelper, queryKeyType)
  const optionsTypeSig = useHelper
    ? (`options?:${optionsType}` as const)
    : (`options:${optionsType}` as const)
  const destructure = useHelper ? ('options??{}' as const) : ('options' as const)
  return `export function ${hookName}${generics}(${argsSig}${paginationSig}${optionsTypeSig}${tail.sig}){const{query:queryOptions,options:clientOptions}=${destructure};return ${config.infiniteQueryFn}({...queryOptions,${body}}${tail.arg})}` as const
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
  const funcName = `get${toIdentifierPascalCase(prefix)}Key` as const
  return `export function ${funcName}(){return['${prefix}']as const}` as const
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
      "import useSWR from'swr'" as const,
      "import useSWRImmutable from'swr/immutable'" as const,
      "import type{Key,SWRConfiguration}from'swr'" as const,
    )
    if (hasInfiniteQuery) {
      lines.push(
        "import useSWRInfinite from'swr/infinite'" as const,
        "import type{SWRInfiniteConfiguration}from'swr/infinite'" as const,
      )
    }
  } else if (hasMutation) {
    lines.push("import type{Key}from'swr'" as const)
  }
  if (hasMutation) {
    lines.push(
      "import useSWRMutation from'swr/mutation'" as const,
      "import type{SWRMutationConfiguration}from'swr/mutation'" as const,
    )
  }
  // Hono client imports. Infinite (x-pagination) hooks reference InferRequestType in
  // `pagination.getRequestArgs` even when the operation itself takes no args, so the
  // import must follow hasInfiniteQuery too (a document whose only paginated operation
  // takes no args has hasAnyArgs=false).
  const honoTypeImports = [
    'ClientRequestOptions' as const,
    ...(hasAnyArgs || hasInfiniteQuery ? (['InferRequestType'] as const) : ([] as const)),
  ]
  lines.push(
    `import type{${honoTypeImports.join(',')}}from'hono/client'` as const,
    "import{parseResponse}from'hono/client'" as const,
    `import{${clientName}}from'${importPath}'` as const,
  )
  return `${lines.join('\n')}\n\n` as const
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
  const variablesType = hasArgs ? argsType : ('undefined' as const)
  const responseTypeWithUndefined = hasNoContent
    ? (`${responseType}|undefined` as const)
    : responseType
  // TError generic enables custom error types: usePostUsers<APIError>(...)
  const tErrorGeneric = `<TError=${errorType}>` as const
  const mutationConfigType =
    `SWRMutationConfiguration<${responseTypeWithUndefined},TError,Key,${variablesType}>` as const
  const optionsSig =
    `options?:{mutation?:${mutationConfigType}&{swrKey?:Key;throwOnError?:boolean};options?:ClientRequestOptions}` as const
  if (hasArgs) {
    return `export function ${hookName}${tErrorGeneric}(${optionsSig}){const{mutation:mutationOptions,options:clientOptions}=options??{};const{swrKey:customKey,...restMutationOptions}=mutationOptions??{};const swrKey=customKey??${keyCall};return{swrKey,...useSWRMutation(swrKey,async(_:Key,{arg}:{arg:${argsType}})=>parseResponse(${runtimeAccess}(arg,clientOptions)),restMutationOptions)}}` as const
  }
  return `export function ${hookName}${tErrorGeneric}(${optionsSig}){const{mutation:mutationOptions,options:clientOptions}=options??{};const{swrKey:customKey,...restMutationOptions}=mutationOptions??{};const swrKey=customKey??${keyCall};return{swrKey,...useSWRMutation(swrKey,async()=>parseResponse(${runtimeAccess}(undefined,clientOptions)),restMutationOptions)}}` as const
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
  const variablesType = hasArgs ? argsType : ('void' as const)
  const errorType = config.errorType ?? ('unknown' as const)
  const tErrorGeneric = `<TError=${errorType},TOnMutateResult=unknown>` as const
  // For 204/205 responses, parseResponse returns undefined
  const dataType = hasNoContent ? `${responseType}|undefined` : responseType
  const fullOptionsType = makeOptionsType(
    `${config.useMutationOptionsType}<${dataType},TError,${variablesType},TOnMutateResult>` as const,
    config.unwrapOptionsAccessor,
  )
  // Only forward the type parameters to the factory when it actually accepts them
  // (i.e. wraps with `mutationOptions<...>` helper). Otherwise the factory has no generics.
  const factoryTypeArg = config.hasMutationOptionsHelper
    ? ('<TError,TOnMutateResult>' as const)
    : ('' as const)
  const factoryCall = `${optionsGetterName}${factoryTypeArg}(clientOptions)` as const
  const tail = makeHookTail(config.hookTail, 'mutation')
  // Vue's members may still be `Ref`s (`MaybeRefDeep`); `useMutation` unwraps them deeply, so a
  // caller's `Ref` key passes through `mutationKey` below as-is.
  const mutationOptionsType = makeOmitInjectedKeys(
    fullOptionsType,
    MUTATION_OMIT_KEYS,
    config.isVueQuery ? VUE_MUTATION_MEMBER : undefined,
  )
  const optionsType = `{mutation?:${mutationOptionsType};options?:ClientRequestOptions}` as const
  // Spread user options first, then the factory so the operation contract wins — `Omit` only
  // rejects a fresh object literal, so the spread order is the last line of defence against a
  // `mutationFn` smuggled in through a variable. `mutationKey` is then restored from the caller.
  // Svelte Query v5+ requires thunk pattern: createMutation(() => options)
  if (config.useThunk) {
    return `export function ${hookName}${tErrorGeneric}(options?:()=>${optionsType}${tail.sig}){return ${config.mutationFn}(()=>{const{mutation,options:clientOptions}=options?.()??{};const mutationDefaults=${factoryCall};return{...mutation,...mutationDefaults,mutationKey:mutation?.mutationKey??mutationDefaults.mutationKey}}${tail.arg})}` as const
  }
  return `export function ${hookName}${tErrorGeneric}(options?:${optionsType}${tail.sig}){const{mutation:mutationOptions,options:clientOptions}=options??{};const mutationDefaults=${factoryCall};return ${config.mutationFn}({...mutationOptions,...mutationDefaults,mutationKey:mutationOptions?.mutationKey??mutationDefaults.mutationKey}${tail.arg})}` as const
}

function makeHookCode(
  paths: OpenAPIPaths,
  pathStr: string,
  method: (typeof HTTP_METHODS)[number],
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
  // Under a base path the client is handed out from below it, where the root of the
  // application is the client itself and not its `index`.
  hasBasePath = false,
) {
  const op = item[method]
  if (!isOperationLike(op)) return null
  const hookName = makeHookName(method, pathStr, config.hookPrefix, paths)
  const hasArgs = operationHasArgs(item, op, deps)
  // QUERY is safe and idempotent like GET (a read that carries its parameters in the body),
  // so it yields query hooks, not mutations; everything else mutates.
  const isQuery = method === 'get' || method === 'query'
  // Infinite hooks are emitted only when the operation declares `x-pagination: true`.
  // Generating Infinite for non-paginated GETs creates unusable code (no getNextPageParam).
  const hasPagination = op['x-pagination'] === true
  // The parts of the arguments the key leaves out, when the operation takes them.
  const params = [
    ...deps.toParameterLikes(item.parameters),
    ...deps.toParameterLikes(op.parameters),
  ]
  const excludedArgs = KEY_EXCLUDED_ARGS.filter((kind) => params.some((p) => p.in === kind))
  // Operation file naming uses methodPath (e.g. `getHealth`) — same convention as before
  // even though the corresponding fetcher function is no longer emitted.
  const operationFileName = routeName(method, pathStr, paths)
  const argsType = makeArgsType(clientName, method, pathStr, hasBasePath)
  const runtimeAccess = makeRuntimeAccess(clientName, method, pathStr, hasBasePath)
  const responseType = makeResponseTypeFromClient(clientName, method, pathStr, hasBasePath)
  // parseResponse returns undefined for 204/205 No Content responses
  const hasNoContent = hasNoContentResponse(op)
  // Convert {param} to :param for key path display
  const honoPath = pathStr.replaceAll(/\{([^}]+)\}/gu, ':$1')
  // SWR: simpler pattern without options getter
  if (config.isSWR) {
    if (isQuery) {
      const keyGetterName = makeQueryKeyGetterName(method, pathStr, paths, true)
      const keyGetterCode = makeQueryKeyGetterCode(
        keyGetterName,
        hasArgs,
        argsType,
        honoPath,
        config,
        excludedArgs,
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
      const immutableHookName =
        `${config.hookPrefix}Immutable${capitalize(operationFileName)}` as const
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
      const infiniteKeyGetterName = makeInfiniteQueryKeyGetterName(method, pathStr, paths, true)
      const infiniteKeyGetterCode = hasPagination
        ? makeInfiniteQueryKeyGetterCode(
            infiniteKeyGetterName,
            hasArgs,
            argsType,
            honoPath,
            config,
            excludedArgs,
            method,
          )
        : null
      const infiniteHookName =
        `${config.hookPrefix}Infinite${capitalize(operationFileName)}` as const
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
    const mutationKeyGetterName = makeMutationKeyGetterName(method, pathStr, paths, true)
    const mutationKeyGetterCode = makeMutationKeyGetterCode(mutationKeyGetterName, method, honoPath)
    const hookCode = makeSWRMutationHookCode(
      hookName,
      `${mutationKeyGetterName}()` as const,
      hasArgs,
      argsType,
      responseType,
      runtimeAccess,
      hasNoContent,
      config.errorType,
    )
    return {
      code: `${mutationKeyGetterCode}\n\n${hookCode}` as const,
      isQuery: false,
      hasArgs,
      hasInfinite: false,
      operationFileName,
    } as const
  }
  // TanStack Query / Vue Query / Svelte Query
  if (isQuery) {
    // For queries, use path-only naming (no HTTP method prefix)
    const queryHookName = makeHookName(queryNameMethod(method), pathStr, config.hookPrefix, paths)
    const pathFuncName = routeName(queryNameMethod(method), pathStr, paths)
    const keyGetterName = makeQueryKeyGetterName(method, pathStr, paths)
    const optionsGetterName = `get${capitalize(pathFuncName)}QueryOptions`
    const keyGetterCode = makeQueryKeyGetterCode(
      keyGetterName,
      hasArgs,
      argsType,
      honoPath,
      config,
      excludedArgs,
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
    const infiniteKeyGetterName = makeInfiniteQueryKeyGetterName(method, pathStr, paths)
    const infiniteOptionsGetterName = `get${capitalize(pathFuncName)}InfiniteQueryOptions` as const
    const { infiniteQueryFn, useInfiniteQueryOptionsType } = config
    const hasInfinite = !!(infiniteQueryFn && useInfiniteQueryOptionsType) && hasPagination
    const infiniteKeyGetterCode = hasInfinite
      ? makeInfiniteQueryKeyGetterCode(
          infiniteKeyGetterName,
          hasArgs,
          argsType,
          honoPath,
          config,
          excludedArgs,
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
            ...(config.isVueQuery ? ({ isVueQuery: true } as const) : ({} as const)),
            ...(config.hasInfiniteQueryOptionsHelper
              ? ({ hasInfiniteQueryOptionsHelper: true } as const)
              : ({} as const)),
            ...(config.errorType ? ({ errorType: config.errorType } as const) : ({} as const)),
          },
        )
      : null
    const suspenseHookName = `${config.hookPrefix}Suspense${capitalize(pathFuncName)}` as const
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
              ...(config.useThunk ? ({ useThunk: true } as const) : ({} as const)),
              ...(config.isVueQuery ? ({ isVueQuery: true } as const) : ({} as const)),
              ...(config.hasQueryOptionsHelper
                ? ({ hasQueryOptionsHelper: true } as const)
                : ({} as const)),
              ...(config.errorType ? ({ errorType: config.errorType } as const) : ({} as const)),
              ...(config.hookTail ? ({ hookTail: config.hookTail } as const) : ({} as const)),
              ...(config.unwrapOptionsAccessor
                ? ({ unwrapOptionsAccessor: true } as const)
                : ({} as const)),
            },
          )
        : null
    const infiniteHookName = `${config.hookPrefix}Infinite${capitalize(pathFuncName)}` as const
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
            ...(config.useThunk ? ({ useThunk: true } as const) : ({} as const)),
            ...(config.isVueQuery ? ({ isVueQuery: true } as const) : ({} as const)),
            ...(config.hasInfiniteQueryOptionsHelper
              ? ({ hasInfiniteQueryOptionsHelper: true } as const)
              : ({} as const)),
            ...(config.errorType ? ({ errorType: config.errorType } as const) : ({} as const)),
            ...(config.hookTail ? ({ hookTail: config.hookTail } as const) : ({} as const)),
            ...(config.unwrapOptionsAccessor
              ? ({ unwrapOptionsAccessor: true } as const)
              : ({} as const)),
          } as const,
        )
      : null
    const suspenseInfiniteHookName =
      `${config.hookPrefix}SuspenseInfinite${capitalize(pathFuncName)}` as const
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
              ...(config.useThunk ? ({ useThunk: true } as const) : ({} as const)),
              ...(config.isVueQuery ? ({ isVueQuery: true } as const) : ({} as const)),
              ...(config.hookTail ? ({ hookTail: config.hookTail } as const) : ({} as const)),
              ...(config.hasInfiniteQueryOptionsHelper
                ? ({ hasInfiniteQueryOptionsHelper: true } as const)
                : ({} as const)),
              ...(config.errorType ? ({ errorType: config.errorType } as const) : ({} as const)),
              ...(config.unwrapOptionsAccessor
                ? ({ unwrapOptionsAccessor: true } as const)
                : ({} as const)),
            } as const,
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
  const optionsGetterName =
    `get${capitalize(routeName(method, pathStr, paths))}MutationOptions` as const
  const mutationKeyGetterName = makeMutationKeyGetterName(method, pathStr, paths)
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
  } as const
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
  clientOf: (path: string, tags: readonly string[] | undefined) => string,
  hasBasePath = false,
): readonly {
  readonly hookName: string
  readonly client: string
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
      const methods = HTTP_METHODS
      return methods
        .map((method) => {
          const operation = pathItem[method]
          const client = clientOf(
            p,
            isOperationLike(operation) ? operationTags(operation) : undefined,
          )
          const result = makeHookCode(paths, p, method, pathItem, deps, config, client, hasBasePath)
          return result
            ? {
                hookName: makeHookName(method, p, config.hookPrefix, paths),
                client,
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
            client: string
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
) {
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
    ...(hasQuery ? ([config.queryFn] as const) : ([] as const)),
    ...(hasQuery && config.suspenseQueryFn ? ([config.suspenseQueryFn] as const) : ([] as const)),
    ...(hasInfiniteQuery && config.infiniteQueryFn
      ? ([config.infiniteQueryFn] as const)
      : ([] as const)),
    ...(hasInfiniteQuery && config.suspenseInfiniteQueryFn
      ? ([config.suspenseInfiniteQueryFn] as const)
      : ([] as const)),
    ...(hasMutation ? ([config.mutationFn] as const) : ([] as const)),
    // Framework option-factory helpers — emitted only when the lib config opts in.
    // queryOptions/infiniteQueryOptions enable DataTag branding for queryClient.getQueryData;
    // mutationOptions provides type-safe defaults for setMutationDefaults / reusable factories.
    ...(hasQuery && config.hasQueryOptionsHelper ? (['queryOptions'] as const) : ([] as const)),
    ...(hasInfiniteQuery && config.hasInfiniteQueryOptionsHelper
      ? (['infiniteQueryOptions'] as const)
      : ([] as const)),
    ...(hasMutation && config.hasMutationOptionsHelper
      ? (['mutationOptions'] as const)
      : ([] as const)),
  ] as const
  // Type imports for options - UseQueryOptions, UseMutationOptions, QueryFunctionContext
  // QueryFunctionContext is emitted only when at least one generated `queryFn` carries the
  // explicit `:QueryFunctionContext` annotation: plain-object query factories (no helper — a
  // bare object literal has no surrounding contextual type for `queryFn`; Vue's hooks drop it
  // since useQuery / useInfiniteQuery provide the typing) and every infinite factory (its
  // context names TPageParam). Helper-backed query factories are contextually typed by
  // `queryOptions(...)`, and the hooks that spread them carry no `queryFn` of their own.
  const needsQueryFnContext = (hasQuery && !config.hasQueryOptionsHelper) || hasInfiniteQuery
  const typeImports = [
    ...(hasQuery ? ([config.useQueryOptionsType] as const) : ([] as const)),
    ...(needsQueryFnContext ? (['QueryFunctionContext'] as const) : ([] as const)),
    ...(hasQuery && config.useSuspenseQueryOptionsType
      ? ([config.useSuspenseQueryOptionsType] as const)
      : ([] as const)),
    ...(hasInfiniteQuery && config.useInfiniteQueryOptionsType
      ? ([config.useInfiniteQueryOptionsType] as const)
      : ([] as const)),
    ...(hasInfiniteQuery && config.useSuspenseInfiniteQueryOptionsType
      ? ([config.useSuspenseInfiniteQueryOptionsType] as const)
      : ([] as const)),
    // InfiniteData: the infinite hooks' TData default, helper or not
    ...(hasInfiniteQuery ? (['InfiniteData'] as const) : ([] as const)),
    ...(hasMutation ? ([config.useMutationOptionsType] as const) : ([] as const)),
    // The hooks' TError default (e.g. `DefaultError`, which honours `Register`) and the
    // trailing-argument types come from the framework package as well.
    ...(config.errorType ? ([config.errorType] as const) : ([] as const)),
    ...(config.hookTail?.imports ?? ([] as const)),
  ] as const
  // Vue Query needs MaybeRefOrGetter type and toValue from 'vue' only when query has args
  // (used in makeQueryKeyGetterCode for args:MaybeRefOrGetter<...> and toValue(args))
  const needsVueImports = config.isVueQuery && hasQueryWithArgs
  // Hono client imports. Infinite (x-pagination) hooks reference InferRequestType in
  // `pagination.getRequestArgs` even when the operation itself takes no args, so the
  // import must follow hasInfiniteQuery too (a document whose only paginated operation
  // takes no args has hasAnyArgs=false).
  const honoTypeImports = [
    'ClientRequestOptions',
    ...(hasAnyArgs || hasInfiniteQuery ? (['InferRequestType'] as const) : ([] as const)),
  ] as const
  const lines = [
    ...(queryImports.length > 0
      ? [`import{${queryImports.join(',')}}from'${config.packageName}'` as const]
      : ([] as const)),
    ...(typeImports.length > 0
      ? ([
          `import type{${[...new Set(typeImports)].join(',')}}from'${config.packageName}'` as const,
        ] as const)
      : ([] as const)),
    // Vue Query needs MaybeRefOrGetter type and toValue from 'vue' for queryKey generation (only when query has args)
    ...(needsVueImports
      ? ([
          "import{computed,toValue}from'vue'" as const,
          "import type{MaybeRefOrGetter}from'vue'" as const,
        ] as const)
      : ([] as const)),
    `import type{${honoTypeImports.join(',')}}from'hono/client'` as const,
    `import{parseResponse}from'hono/client'` as const,
    `import{${clientName}}from'${importPath}'` as const,
  ] as const
  return `${lines.join('\n')}\n\n` as const
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
  grouping?: Grouping,
  basePath?: string,
) {
  return Effect.gen(function* () {
    const pathsMaybe = openAPI.paths
    if (!isOpenAPIPaths(pathsMaybe)) {
      return yield* new GenerateError({ message: 'Invalid OpenAPI paths' })
    }
    const componentsParameters = openAPI.components?.parameters ?? {}
    const componentsRequestBodies = openAPI.components?.requestBodies ?? {}
    const deps = makeOperationDeps(clientName, componentsParameters, componentsRequestBodies)
    // An operation of a split application is called through the client of its group, and
    // through the client of the application when it belongs to none.
    const clientOf = (route: string, tags: readonly string[] | undefined) => {
      const group = grouping?.(route, tags)
      return group === undefined ? clientName : makeGroupClientName(group)
    }
    const hookCodes = makeHookCodes(
      pathsMaybe,
      deps,
      config,
      clientOf,
      basePath !== undefined && basePath !== '/',
    )
    const clientNames = [...new Set(hookCodes.map(({ client }) => client))]
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
      clientNames.length > 0 ? clientNames.join(',') : clientName,
      hasQuery,
      hasMutation,
      hasAnyArgs,
      config,
      hasQueryWithArgs,
      hasInfiniteQuery,
    )
    const code =
      `${header}${body}${hookCodes.length > 0 ? ('\n' as const) : ('' as const)}` as const
    yield* emit(code, path.dirname(output), output)
    return `Generated ${config.frameworkName.toLowerCase().replaceAll(' ', '-')} hooks written to ${output}` as const
  })
}
