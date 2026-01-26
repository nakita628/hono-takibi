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
  buildInferResponseType,
  buildOperationDocs,
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
 * Generates query key getter function code.
 *
 * @param keyGetterName - Function name for key getter
 * @param hasArgs - Whether the operation has arguments
 * @param inferRequestType - TypeScript type for request
 * @param honoPath - Hono-style path (with :param)
 * @param config - Framework configuration
 * @returns Query key getter function code
 */
function makeQueryKeyGetterCode(
  keyGetterName: string,
  hasArgs: boolean,
  inferRequestType: string,
  honoPath: string,
  config: { frameworkName: string },
): string {
  const safeCommentPath = escapeCommentEnd(honoPath.replace(/:([^/]+)/g, '{$1}'))
  const safeCommentPathNoParam = escapeCommentEnd(honoPath)
  if (hasArgs) {
    return `/**
 * Generates ${config.frameworkName} cache key for GET ${safeCommentPath}
 */
export function ${keyGetterName}(args:${inferRequestType}){return['${honoPath}',args]as const}`
  }
  return `/**
 * Generates ${config.frameworkName} cache key for GET ${safeCommentPathNoParam}
 */
export function ${keyGetterName}(){return['${honoPath}']as const}`
}

/**
 * Generates query options getter function code.
 *
 * This function returns an object compatible with TanStack Query's queryOptions pattern,
 * enabling prefetching, ensureQueryData, and other advanced patterns.
 *
 * Uses the queryOptions() helper for proper type inference, signal handling, and DataTag branding.
 * Does NOT accept override options to avoid Vue Query's MaybeRefDeep type conflicts.
 * Override options should be spread at useQuery() level instead.
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
  config: { frameworkName: string; queryOptionsHelper?: string },
): string {
  const safeCommentPath = escapeCommentEnd(honoPath.replace(/:([^/]+)/g, '{$1}'))
  const safeCommentPathNoParam = escapeCommentEnd(honoPath)
  const commentPath = hasArgs ? safeCommentPath : safeCommentPathNoParam

  // Build client call WITH signal for queryOptions
  // queryOptions() provides proper type inference for signal
  // @see https://tanstack.com/query/latest/docs/framework/react/guides/query-cancellation
  const clientCallWithSignal = hasArgs
    ? `${clientPath}.$${method}(args,{...clientOptions,init:{...clientOptions?.init,signal}})`
    : `${clientPath}.$${method}(undefined,{...clientOptions,init:{...clientOptions?.init,signal}})`
  const fetcherBody = makeFetcher(clientCallWithSignal)
  const queryKeyCall = hasArgs ? `${keyGetterName}(args)` : `${keyGetterName}()`
  const optionsHelper = config.queryOptionsHelper ?? 'queryOptions'

  // No override options here - spread happens at useQuery() level
  // This preserves DataTag branding and avoids Vue Query's MaybeRefDeep type conflicts
  if (hasArgs) {
    return `/**
 * Returns ${config.frameworkName} query options for GET ${commentPath}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const ${optionsGetterName}=(args:${inferRequestType},clientOptions?:ClientRequestOptions)=>${optionsHelper}({queryKey:${queryKeyCall},queryFn:({signal})=>${fetcherBody}})`
  }
  return `/**
 * Returns ${config.frameworkName} query options for GET ${commentPath}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const ${optionsGetterName}=(clientOptions?:ClientRequestOptions)=>${optionsHelper}({queryKey:${queryKeyCall},queryFn:({signal})=>${fetcherBody}})`
}

/* ─────────────────────────────── Query Hook Code ─────────────────────────────── */

function makeQueryHookCode(
  hookName: string,
  optionsGetterName: string,
  hasArgs: boolean,
  inferRequestType: string,
  docs: string,
  config: { queryFn: string },
): string {
  const argsSig = hasArgs ? `args:${inferRequestType},` : ''
  // Get base options from getter (no override options)
  const optionsGetterCall = hasArgs
    ? `${optionsGetterName}(args,clientOptions)`
    : `${optionsGetterName}(clientOptions)`

  // Query options type - inline type for all frameworks
  // Explicitly excludes queryKey and queryFn to avoid type conflicts
  // Generic options (select, placeholderData, initialData) are NOT included:
  // - Vue/Svelte: MaybeRefDeep type conflicts
  // - React: initialData expects TQueryFnData, not TData (select output type)
  // For these advanced options, use getXxxQueryOptions() directly with useQuery
  // @see https://tanstack.com/query/latest/docs/framework/react/guides/query-options
  const queryOptionsTypeStr =
    '{enabled?:boolean;staleTime?:number;gcTime?:number;refetchInterval?:number|false;refetchOnWindowFocus?:boolean;refetchOnMount?:boolean;refetchOnReconnect?:boolean;retry?:boolean|number;retryDelay?:number}'
  const optionsType = `{query?:${queryOptionsTypeStr};client?:ClientRequestOptions}`

  // Spread at useQuery level to override options
  // queryOptions() returns DataTag-branded options, spread preserves type safety
  return `${docs}
export function ${hookName}(${argsSig}options?:${optionsType}){const{query:queryOptions,client:clientOptions}=options??{};return ${config.queryFn}({...${optionsGetterCall},...queryOptions})}`
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
  config: { mutationFn: string },
  hasNoContent: boolean,
): string {
  // Simple pattern with typed callbacks
  const variablesType = hasArgs ? inferRequestType : 'undefined'

  // For 204/205 responses, parseResponse returns undefined
  const dataType = hasNoContent ? `${inferResponseType}|undefined` : inferResponseType
  // onSettled data is always potentially undefined (mutation may not complete)
  // Avoid duplicate `| undefined` when dataType already includes it
  const onSettledDataType = hasNoContent ? dataType : `${dataType}|undefined`

  // Inline mutation options type - excludes mutationFn to prevent override
  const inlineMutationOptionsType = `{onSuccess?:(data:${dataType},variables:${variablesType})=>void;onError?:(error:Error,variables:${variablesType})=>void;onSettled?:(data:${onSettledDataType},error:Error|null,variables:${variablesType})=>void;onMutate?:(variables:${variablesType})=>void;retry?:boolean|number;retryDelay?:number}`
  const optionsType = `{mutation?:${inlineMutationOptionsType};client?:ClientRequestOptions}`

  if (hasArgs) {
    const clientCall = `${clientPath}.$${method}(args,clientOptions)`
    const fetcherBody = makeFetcher(clientCall)
    return `${docs}
export function ${hookName}(options?:${optionsType}){const{mutation:mutationOptions,client:clientOptions}=options??{};return ${config.mutationFn}({...mutationOptions,mutationFn:async(args:${inferRequestType})=>${fetcherBody}})}`
  }
  const clientCall = `${clientPath}.$${method}(undefined,clientOptions)`
  const fetcherBody = makeFetcher(clientCall)
  return `${docs}
export function ${hookName}(options?:${optionsType}){const{mutation:mutationOptions,client:clientOptions}=options??{};return ${config.mutationFn}({...mutationOptions,mutationFn:async()=>${fetcherBody}})}`
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
    queryOptionsHelper?: string
  },
): { code: string; isQuery: boolean; hasArgs: boolean } | null {
  const op = item[method]
  if (!isOperationLike(op)) return null

  const hookName = makeHookName(method, pathStr, config.hookPrefix)
  const pathResult = formatPath(pathStr)
  const hasArgs = operationHasArgs(item, op, deps)
  const isQuery = method === 'get'

  const inferRequestType = buildInferRequestType(deps.client, pathResult, method)
  const baseInferResponseType = buildInferResponseType(deps.client, pathResult, method)
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
      docs,
      config,
    )
    // Combine hook code with key getter code and query options getter code
    return {
      code: `${hookCode}\n\n${keyGetterCode}\n\n${optionsGetterCode}`,
      isQuery: true,
      hasArgs,
    }
  }

  const hookCode = makeMutationHookCode(
    hookName,
    hasArgs,
    inferRequestType,
    baseInferResponseType,
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
    queryOptionsHelper?: string
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
 * - Hono client types (InferRequestType, InferResponseType, ClientRequestOptions)
 * - parseResponse for type-safe response handling
 */
function makeHeader(
  importPath: string,
  hasQuery: boolean,
  hasMutation: boolean,
  needsInferRequestType: boolean,
  clientName: string,
  config: { packageName: string; queryFn: string; mutationFn: string; queryOptionsHelper?: string },
): string {
  const queryImports = [
    ...(hasQuery ? [config.queryFn] : []),
    ...(hasMutation ? [config.mutationFn] : []),
    // Import queryOptions helper for getXxxQueryOptions functions
    ...(hasQuery && config.queryOptionsHelper ? [config.queryOptionsHelper] : []),
  ]

  // Hono client type imports
  // InferRequestType: needed when operation has args
  // InferResponseType: only needed for mutation callbacks (onSuccess, onError, onSettled)
  const honoTypeImportParts = [
    ...(needsInferRequestType ? ['InferRequestType'] : []),
    ...(hasMutation ? ['InferResponseType'] : []),
    'ClientRequestOptions',
  ]

  const lines = [
    ...(queryImports.length > 0
      ? [`import{${queryImports.join(',')}}from'${config.packageName}'`]
      : []),
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
    queryOptionsHelper?: string
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
