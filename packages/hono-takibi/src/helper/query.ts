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
import { isRecord, methodPath } from '../utils/index.js'
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

/* ─────────────────────────────── Types ─────────────────────────────── */

type HookCode = {
  readonly hookName: string
  readonly code: string
  readonly isQuery: boolean
  readonly hasArgs: boolean
}

type GeneratedHook = { code: string; isQuery: boolean; hasArgs: boolean } | null

/**
 * Configuration for different query library frameworks.
 */
export type QueryFrameworkConfig = {
  /** Package name for imports (e.g., '@tanstack/react-query') */
  readonly packageName: string
  /** Framework display name for docs (e.g., 'TanStack Query') */
  readonly frameworkName: string
  /** Hook prefix (e.g., 'use' or 'create') */
  readonly hookPrefix: string
  /** Query function name (e.g., 'useQuery' or 'createQuery') */
  readonly queryFn: string
  /** Mutation function name (e.g., 'useMutation' or 'createMutation') */
  readonly mutationFn: string
  /** Query options type name (e.g., 'UseQueryOptions' or 'CreateQueryOptions') */
  readonly queryOptionsType: string
  /** Mutation options type name (e.g., 'UseMutationOptions' or 'CreateMutationOptions') */
  readonly mutationOptionsType: string
  /** Whether to omit TQueryKey type parameter from query options (for Vue Query compatibility) */
  readonly omitQueryKeyType?: boolean
}

/* ─────────────────────────────── Framework Configs ─────────────────────────────── */

/**
 * TanStack Query (React) configuration.
 */
export const TANSTACK_QUERY_CONFIG: QueryFrameworkConfig = {
  packageName: '@tanstack/react-query',
  frameworkName: 'TanStack Query',
  hookPrefix: 'use',
  queryFn: 'useQuery',
  mutationFn: 'useMutation',
  queryOptionsType: 'UseQueryOptions',
  mutationOptionsType: 'UseMutationOptions',
}

/**
 * Svelte Query configuration.
 */
export const SVELTE_QUERY_CONFIG: QueryFrameworkConfig = {
  packageName: '@tanstack/svelte-query',
  frameworkName: 'Svelte Query',
  hookPrefix: 'create',
  queryFn: 'createQuery',
  mutationFn: 'createMutation',
  queryOptionsType: 'CreateQueryOptions',
  mutationOptionsType: 'CreateMutationOptions',
}

/**
 * Vue Query configuration.
 */
export const VUE_QUERY_CONFIG: QueryFrameworkConfig = {
  packageName: '@tanstack/vue-query',
  frameworkName: 'Vue Query',
  hookPrefix: 'use',
  queryFn: 'useQuery',
  mutationFn: 'useMutation',
  queryOptionsType: 'UseQueryOptions',
  mutationOptionsType: 'UseMutationOptions',
  omitQueryKeyType: true,
}

/* ─────────────────────────────── Hook Name Generation ─────────────────────────────── */

/**
 * Convert method + path to hook name.
 *
 * @param method - HTTP method
 * @param pathStr - API path
 * @param prefix - Hook prefix ('use' or 'create')
 * @returns Hook name (e.g., "useGetUsers" or "createGetUsers")
 */
const makeHookName = (method: string, pathStr: string, prefix: string): string => {
  const funcName = methodPath(method, pathStr)
  return `${prefix}${funcName.charAt(0).toUpperCase()}${funcName.slice(1)}`
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
const buildFetcher = (clientCall: string): string => `parseResponse(${clientCall})`

/* ─────────────────────────────── Query Key Getter ─────────────────────────────── */

/**
 * Generates the query key getter function name.
 *
 * @param method - HTTP method
 * @param pathStr - API path
 * @returns Query key getter function name (e.g., "getGetUsersQueryKey")
 */
const makeQueryKeyGetterName = (method: string, pathStr: string): string => {
  const funcName = methodPath(method, pathStr)
  return `get${funcName.charAt(0).toUpperCase()}${funcName.slice(1)}QueryKey`
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
const makeQueryKeyGetterCode = (
  keyGetterName: string,
  hasArgs: boolean,
  inferRequestType: string,
  honoPath: string,
  config: QueryFrameworkConfig,
): string => {
  // Add space between * and / to prevent early comment termination (* / instead of */)
  const safeCommentPath = honoPath.replace(/:([^/]+)/g, '{$1}').replace(/\*\//g, '* /')
  const safeCommentPathNoParam = honoPath.replace(/\*\//g, '* /')
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

/* ─────────────────────────────── Query Hook Code ─────────────────────────────── */

const makeQueryHookCode = (
  hookName: string,
  keyGetterName: string,
  hasArgs: boolean,
  inferRequestType: string,
  clientPath: string,
  method: string,
  docs: string,
  config: QueryFrameworkConfig,
): string => {
  const clientCall = hasArgs
    ? `${clientPath}.$${method}(args,clientOptions)`
    : `${clientPath}.$${method}(undefined,clientOptions)`
  const fetcherBody = buildFetcher(clientCall)

  // Use key getter function
  const queryKeyCall = hasArgs ? `${keyGetterName}(args)` : `${keyGetterName}()`

  // Build hook with inline query options type
  // Note: select is intentionally excluded to ensure proper type inference of data.
  // If users need select, they can use the underlying queryOptions helper.
  const inlineQueryOptionsType =
    '{enabled?:boolean;staleTime?:number;gcTime?:number;refetchInterval?:number|false;refetchOnWindowFocus?:boolean;refetchOnMount?:boolean;refetchOnReconnect?:boolean;retry?:boolean|number;retryDelay?:number}'
  const optionsType = `{query?:${inlineQueryOptionsType};client?:ClientRequestOptions}`
  const argsSig = hasArgs ? `args:${inferRequestType},` : ''

  return `${docs}
export function ${hookName}(${argsSig}options?:${optionsType}){const{query:queryOptions,client:clientOptions}=options??{};return ${config.queryFn}({queryKey:${queryKeyCall},queryFn:async()=>${fetcherBody},...queryOptions})}`
}

/* ─────────────────────────────── Mutation Hook Code ─────────────────────────────── */

const makeMutationHookCode = (
  hookName: string,
  hasArgs: boolean,
  inferRequestType: string,
  inferResponseType: string,
  clientPath: string,
  method: string,
  docs: string,
  config: QueryFrameworkConfig,
  hasNoContent: boolean,
): string => {
  // Build mutation hook with inline options type (no separate type definition)
  const variablesType = hasArgs ? inferRequestType : 'undefined'

  // For 204/205 responses, parseResponse returns undefined, so callback types should reflect this
  // onSuccess receives the success data (undefined for 204)
  // onSettled always receives data | undefined (either success data or undefined on error)
  const successDataType = hasNoContent ? `${inferResponseType}|undefined` : inferResponseType
  const settledDataType = `${inferResponseType}|undefined`

  // Inline mutation options type
  const inlineMutationOptionsType = `{onSuccess?:(data:${successDataType},variables:${variablesType})=>void;onError?:(error:Error,variables:${variablesType})=>void;onSettled?:(data:${settledDataType},error:Error|null,variables:${variablesType})=>void;onMutate?:(variables:${variablesType})=>void;retry?:boolean|number;retryDelay?:number}`
  const optionsType = `{mutation?:${inlineMutationOptionsType};client?:ClientRequestOptions}`

  if (hasArgs) {
    const clientCall = `${clientPath}.$${method}(args,clientOptions)`
    const fetcherBody = buildFetcher(clientCall)
    return `${docs}
export function ${hookName}(options?:${optionsType}){const{mutation:mutationOptions,client:clientOptions}=options??{};return ${config.mutationFn}({mutationFn:async(args:${inferRequestType})=>${fetcherBody},...mutationOptions})}`
  }
  const clientCall = `${clientPath}.$${method}(undefined,clientOptions)`
  const fetcherBody = buildFetcher(clientCall)
  return `${docs}
export function ${hookName}(options?:${optionsType}){const{mutation:mutationOptions,client:clientOptions}=options??{};return ${config.mutationFn}({mutationFn:async()=>${fetcherBody},...mutationOptions})}`
}

/* ─────────────────────────────── Single-hook generator ─────────────────────────────── */

const makeHookCode = (
  pathStr: string,
  method: HttpMethod,
  item: PathItemLike,
  deps: OperationDeps,
  config: QueryFrameworkConfig,
): GeneratedHook => {
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
    const keyGetterCode = makeQueryKeyGetterCode(
      keyGetterName,
      hasArgs,
      inferRequestType,
      honoPath,
      config,
    )
    const hookCode = makeQueryHookCode(
      hookName,
      keyGetterName,
      hasArgs,
      inferRequestType,
      clientPath,
      method,
      docs,
      config,
    )
    // Combine hook code with key getter code
    return { code: `${hookCode}\n\n${keyGetterCode}`, isQuery: true, hasArgs }
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
const makeHookCodes = (
  paths: OpenAPIPaths,
  deps: OperationDeps,
  config: QueryFrameworkConfig,
): HookCode[] =>
  Object.entries(paths)
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
      }).filter((item): item is HookCode => item !== null)
    })

/* ─────────────────────────────── Header ─────────────────────────────── */

/**
 * Generates the import header for Query hook files.
 *
 * Imports include:
 * - Query/Mutation hooks from the framework package
 * - Hono client types (InferRequestType, InferResponseType, ClientRequestOptions)
 * - parseResponse for type-safe response handling
 */
const makeHeader = (
  importPath: string,
  hasQuery: boolean,
  hasMutation: boolean,
  needsInferRequestType: boolean,
  clientName: string,
  config: QueryFrameworkConfig,
): string => {
  const queryImports = [
    ...(hasQuery ? [config.queryFn] : []),
    ...(hasMutation ? [config.mutationFn] : []),
  ]

  // Hono client type imports
  // InferRequestType: needed when operation has args
  // InferResponseType: needed for mutation option types (onSuccess, onError, etc.)
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
  config: QueryFrameworkConfig,
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
