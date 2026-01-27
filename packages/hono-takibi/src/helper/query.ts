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
import type { OpenAPI, OpenAPIPaths } from '../openapi/index.js'
import { escapeCommentEnd, isRecord, methodPath, upperFirst } from '../utils/index.js'
import type { HttpMethod, OperationDeps, PathItemLike } from './index.js'
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
  return `${prefix}${upperFirst(funcName)}`
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
 * @returns Query key getter function name (e.g., "getGetUsersQueryKey")
 */
function makeQueryKeyGetterName(method: string, pathStr: string): string {
  const funcName = methodPath(method, pathStr)
  return `get${upperFirst(funcName)}QueryKey`
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
  return `get${upperFirst(funcName)}QueryOptions`
}

/**
 * Generates query key getter function code using structured keys.
 *
 * Pattern: ['prefix', '/full/path', args?]
 * - prefix: First path segment for prefix invalidation (e.g., 'pet')
 * - path: Full path for uniqueness (e.g., '/pet/findByStatus')
 * - args: Request arguments when present
 *
 * This enables:
 * - Prefix invalidation: invalidateQueries({ queryKey: ['pet'] }) → all pet queries
 * - Unique keys: Different endpoints never collide
 * - No query string order issues (query params as object)
 *
 * @param keyGetterName - Function name for key getter
 * @param hasArgs - Whether the operation has arguments
 * @param inferRequestType - TypeScript type for request
 * @param honoPath - Hono-style path (with :param)
 * @param clientPath - Client path expression
 * @param config - Framework configuration
 * @returns Query key getter function code
 * @see https://tanstack.com/query/latest/docs/framework/react/guides/query-keys
 */
function makeQueryKeyGetterCode(
  keyGetterName: string,
  hasArgs: boolean,
  inferRequestType: string,
  honoPath: string,
  _clientPath: string,
  config: { frameworkName: string; isVueQuery?: boolean },
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
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function ${keyGetterName}(args:MaybeRef<${inferRequestType}>){return['${prefix}','${honoPath}',unref(args)]as const}`
    }
    return `/**
 * Generates ${config.frameworkName} cache key for GET ${safeCommentPathNoParam}
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function ${keyGetterName}(){return['${prefix}','${honoPath}']as const}`
  }

  // TanStack Query / Svelte Query: ['prefix', '/path', args]
  if (hasArgs) {
    return `/**
 * Generates ${config.frameworkName} cache key for GET ${safeCommentPath}
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function ${keyGetterName}(args:${inferRequestType}){return['${prefix}','${honoPath}',args]as const}`
  }
  return `/**
 * Generates ${config.frameworkName} cache key for GET ${safeCommentPathNoParam}
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function ${keyGetterName}(){return['${prefix}','${honoPath}']as const}`
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
export const ${optionsGetterName}=(args:${inferRequestType},clientOptions?:ClientRequestOptions)=>({queryKey:${queryKeyCall},queryFn:({signal}:QueryFunctionContext)=>${fetcherBody}})`
  }
  return `/**
 * Returns ${config.frameworkName} query options for GET ${commentPath}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const ${optionsGetterName}=(clientOptions?:ClientRequestOptions)=>({queryKey:${queryKeyCall},queryFn:({signal}:QueryFunctionContext)=>${fetcherBody}})`
}

/* ─────────────────────────────── Query Hook Code ─────────────────────────────── */

function makeQueryHookCode(
  hookName: string,
  optionsGetterName: string,
  hasArgs: boolean,
  inferRequestType: string,
  parseResponseType: string,
  docs: string,
  config: { queryFn: string; useThunk?: boolean; useQueryOptionsType: string; usePartialOmit?: boolean },
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

/* ─────────────────────────────── Mutation Hook Code ─────────────────────────────── */

function makeMutationHookCode(
  hookName: string,
  hasArgs: boolean,
  inferRequestType: string,
  inferResponseType: string,
  clientPath: string,
  method: string,
  docs: string,
  config: { mutationFn: string; useThunk?: boolean; useMutationOptionsType: string; usePartialOmit?: boolean },
  hasNoContent: boolean,
): string {
  // Simple pattern with typed callbacks
  const variablesType = hasArgs ? inferRequestType : 'void'

  // For 204/205 responses, parseResponse returns undefined
  const dataType = hasNoContent ? `${inferResponseType}|undefined` : inferResponseType

  // Use official TanStack Query mutation options type
  // Vue Query needs Partial<Omit<...>> due to type conflicts with MaybeRefOrGetter
  const mutationOptionsType = config.usePartialOmit
    ? `Partial<Omit<${config.useMutationOptionsType}<${dataType},Error,${variablesType}>,'mutationFn'>>`
    : `${config.useMutationOptionsType}<${dataType},Error,${variablesType}>`
  const optionsType = `{mutation?:${mutationOptionsType};client?:ClientRequestOptions}`

  // Svelte Query v5+ requires thunk pattern: createMutation(() => options)
  if (hasArgs) {
    const clientCall = `${clientPath}.$${method}(args,clientOptions)`
    const fetcherBody = makeFetcher(clientCall)
    const optionsExpr = `{...mutationOptions,mutationFn:async(args:${inferRequestType})=>${fetcherBody}}`
    const mutationCall = config.useThunk
      ? `${config.mutationFn}(()=>(${optionsExpr}))`
      : `${config.mutationFn}(${optionsExpr})`
    return `${docs}
export function ${hookName}(options?:${optionsType}){const{mutation:mutationOptions,client:clientOptions}=options??{};return ${mutationCall}}`
  }
  const clientCall = `${clientPath}.$${method}(undefined,clientOptions)`
  const fetcherBody = makeFetcher(clientCall)
  const optionsExpr = `{...mutationOptions,mutationFn:async()=>${fetcherBody}}`
  const mutationCall = config.useThunk
    ? `${config.mutationFn}(()=>(${optionsExpr}))`
    : `${config.mutationFn}(${optionsExpr})`
  return `${docs}
export function ${hookName}(options?:${optionsType}){const{mutation:mutationOptions,client:clientOptions}=options??{};return ${mutationCall}}`
}

/* ─────────────────────────────── Single-hook generator ─────────────────────────────── */

function makeHookCode(
  pathStr: string,
  method: HttpMethod,
  item: PathItemLike,
  deps: OperationDeps,
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
  },
): { code: string; isQuery: boolean; hasArgs: boolean } | null {
  const op = item[method]
  if (!isOperationLike(op)) return null

  const hookName = makeHookName(method, pathStr, config.hookPrefix)
  const pathResult = formatPath(pathStr)
  const hasArgs = operationHasArgs(item, op, deps)
  const isQuery = method === 'get'

  const inferRequestType = buildInferRequestType(deps.client, pathResult, method)
  // Use parseResponse return type for accurate type inference
  const parseResponseType = buildParseResponseType(deps.client, pathResult, method)
  // parseResponse returns undefined for 204/205 No Content responses
  const hasNoContent = hasNoContentResponse(op)

  // Convert {param} to :param for key path display
  const honoPath = pathStr.replace(/\{([^}]+)\}/g, ':$1')
  const clientPath = `${deps.client}${pathResult.runtimePath}`

  const summary = typeof op.summary === 'string' ? op.summary : ''
  const description = typeof op.description === 'string' ? op.description : ''
  const docs = buildOperationDocs(method, pathStr, summary || undefined, description || undefined)

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

  const hookCode = makeMutationHookCode(
    hookName,
    hasArgs,
    inferRequestType,
    parseResponseType,
    clientPath,
    method,
    docs,
    config,
    hasNoContent,
  )
  return { code: hookCode, isQuery: false, hasArgs }
}

/**
 * Builds hook codes from OpenAPI paths.
 */
function makeHookCodes(
  paths: OpenAPIPaths,
  deps: OperationDeps,
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
  },
): { hookName: string; code: string; isQuery: boolean; hasArgs: boolean }[] {
  return Object.entries(paths)
    .filter((entry): entry is [string, Record<string, unknown>] => isRecord(entry[1]))
    .flatMap(([p, rawItem]) => {
      const pathItem = parsePathItem(rawItem)
      return HTTP_METHODS.map((method) => {
        const result = makeHookCode(p, method, pathItem, deps, config)
        return result
          ? {
              hookName: makeHookName(method, p, config.hookPrefix),
              code: result.code,
              isQuery: result.isQuery,
              hasArgs: result.hasArgs,
            }
          : null
      }).filter(
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
  },
): string {
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

  const lines = [
    ...(queryImports.length > 0
      ? [`import{${queryImports.join(',')}}from'${config.packageName}'`]
      : []),
    ...(typeImports.length > 0
      ? [`import type{${typeImports.join(',')}}from'${config.packageName}'`]
      : []),
    // Vue Query needs MaybeRef type and unref from 'vue' for queryKey generation
    ...(config.isVueQuery && hasQuery ? ["import{unref}from'vue'", "import type{MaybeRef}from'vue'"] : []),
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
  const deps = createOperationDeps(clientName, componentsParameters, componentsRequestBodies)

  const hookCodes = makeHookCodes(pathsMaybe, deps, config)

  // Non-split: write single file
  if (!split) {
    const body = hookCodes.map(({ code }) => code).join('\n\n')
    const hasQuery = hookCodes.some(({ isQuery }) => isQuery)
    const hasMutation = hookCodes.some(({ isQuery }) => !isQuery)
    const needsInferRequestType = hookCodes.some(({ hasArgs }) => hasArgs)
    const header = makeHeader(
      importPath,
      hasQuery,
      hasMutation,
      needsInferRequestType,
      clientName,
      config,
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
      const header = makeHeader(importPath, isQuery, !isQuery, hasArgs, clientName, config)
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
