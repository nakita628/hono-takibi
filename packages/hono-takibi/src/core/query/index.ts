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
 * @module core/query
 * @link https://tanstack.com/query/latest
 * @link https://hono.dev/docs/guides/rpc
 */
import path from 'node:path'
import type { HttpMethod, OperationDeps, PathItemLike } from '../../helper/index.js'
import {
  buildInferRequestType,
  buildInferResponseType,
  buildOperationDocs,
  core,
  createOperationDeps,
  formatPath,
  HTTP_METHODS,
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

/**
 * Convert method + path to query key getter name.
 *
 * @param method - HTTP method
 * @param pathStr - API path
 * @returns Query key getter name (e.g., "getGetUsersQueryKey")
 */
const makeQueryKeyGetterName = (method: string, pathStr: string): string => {
  const funcName = methodPath(method, pathStr)
  return `get${funcName.charAt(0).toUpperCase()}${funcName.slice(1)}QueryKey`
}

/* ─────────────────────────────── Query Hook Code ─────────────────────────────── */

const makeQueryHookCode = (
  hookName: string,
  queryKeyGetterName: string,
  hasArgs: boolean,
  inferRequestType: string,
  inferResponseType: string,
  clientPath: string,
  method: string,
  pathStr: string,
  honoPath: string,
  docs: string,
  config: QueryFrameworkConfig,
): { hookCode: string; keyGetterCode: string } => {
  const keyGetterCall = hasArgs ? `${queryKeyGetterName}(args)` : `${queryKeyGetterName}()`

  const keyDocs = [
    '/**',
    ` * Generates ${config.frameworkName} cache key for ${method.toUpperCase()} ${pathStr.replace(/\/\*/g, '/[*]')}`,
    ' */',
  ].join('\n')

  // Vue Query: simplified hook without query options to avoid type conflicts with Vue reactivity
  if (config.omitQueryKeyType) {
    const argsSig = hasArgs ? `args:${inferRequestType},` : ''
    const clientCall = hasArgs
      ? `${clientPath}.$${method}(args,clientOptions)`
      : `${clientPath}.$${method}(undefined,clientOptions)`
    const hookCode = `${docs}
export function ${hookName}(${argsSig}clientOptions?:ClientRequestOptions){const queryKey=${keyGetterCall};return ${config.queryFn}({queryKey,queryFn:async()=>parseResponse(${clientCall})})}`
    const keyGetterCode = hasArgs
      ? `${keyDocs}
export function ${queryKeyGetterName}(args:${inferRequestType}){return['${honoPath}',args]as const}`
      : `${keyDocs}
export function ${queryKeyGetterName}(){return['${honoPath}']as const}`
    return { hookCode, keyGetterCode }
  }

  // TanStack/Svelte Query: full options support
  const argsSig = hasArgs ? `args:${inferRequestType},` : ''
  const queryKeyType = hasArgs
    ? `readonly['${honoPath}',${inferRequestType}]`
    : `readonly['${honoPath}']`
  const queryOptionsType = `${config.queryOptionsType}<${inferResponseType},Error,${inferResponseType},${queryKeyType}>`
  const optionsSig = `options?:{query?:${queryOptionsType};client?:ClientRequestOptions},queryClient?:QueryClient`
  const clientCall = hasArgs
    ? `${clientPath}.$${method}(args,clientOptions)`
    : `${clientPath}.$${method}(undefined,clientOptions)`

  const hookCode = `${docs}
export function ${hookName}(${argsSig}${optionsSig}){const{query:queryOptions,client:clientOptions}=options??{};const queryKey=${keyGetterCall};const query=${config.queryFn}({...queryOptions,queryKey,queryFn:async()=>parseResponse(${clientCall})},queryClient);return{...query,queryKey}}`

  const keyGetterCode = hasArgs
    ? `${keyDocs}
export function ${queryKeyGetterName}(args:${inferRequestType}){return['${honoPath}',args]as const}`
    : `${keyDocs}
export function ${queryKeyGetterName}(){return['${honoPath}']as const}`

  return { hookCode, keyGetterCode }
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
): string => {
  // Vue Query: simplified mutation hook without options to avoid type conflicts
  if (config.omitQueryKeyType) {
    if (hasArgs) {
      return `${docs}
export function ${hookName}(clientOptions?:ClientRequestOptions){return ${config.mutationFn}<${inferResponseType}|undefined,Error,${inferRequestType}>({mutationFn:async(args)=>parseResponse(${clientPath}.$${method}(args,clientOptions))})}`
    }
    return `${docs}
export function ${hookName}(clientOptions?:ClientRequestOptions){return ${config.mutationFn}<${inferResponseType}|undefined,Error,void>({mutationFn:async()=>parseResponse(${clientPath}.$${method}(undefined,clientOptions))})}`
  }

  // TanStack/Svelte Query: full options support
  // Note: TData includes undefined because parseResponse returns undefined for 204 No Content
  if (hasArgs) {
    const mutationOptionsType = `${config.mutationOptionsType}<${inferResponseType}|undefined,Error,${inferRequestType}>`
    const optionsSig = `options?:{mutation?:${mutationOptionsType};client?:ClientRequestOptions},queryClient?:QueryClient`
    return `${docs}
export function ${hookName}(${optionsSig}){return ${config.mutationFn}<${inferResponseType}|undefined,Error,${inferRequestType}>({...options?.mutation,mutationFn:async(args)=>parseResponse(${clientPath}.$${method}(args,options?.client))},queryClient)}`
  }
  const mutationOptionsType = `${config.mutationOptionsType}<${inferResponseType}|undefined,Error,void>`
  const optionsSig = `options?:{mutation?:${mutationOptionsType};client?:ClientRequestOptions},queryClient?:QueryClient`
  return `${docs}
export function ${hookName}(${optionsSig}){return ${config.mutationFn}<${inferResponseType}|undefined,Error,void>({...options?.mutation,mutationFn:async()=>parseResponse(${clientPath}.$${method}(undefined,options?.client))},queryClient)}`
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
  const queryKeyGetterName = makeQueryKeyGetterName(method, pathStr)
  const pathResult = formatPath(pathStr)
  const hasArgs = operationHasArgs(item, op, deps)
  const isQuery = method === 'get'

  const inferRequestType = buildInferRequestType(deps.client, pathResult, method)
  const inferResponseType = buildInferResponseType(deps.client, pathResult, method)

  // Convert {param} to :param for key path display
  const honoPath = pathStr.replace(/\{([^}]+)\}/g, ':$1')
  const clientPath = `${deps.client}${pathResult.runtimePath}`

  const summary = typeof op.summary === 'string' ? op.summary : ''
  const description = typeof op.description === 'string' ? op.description : ''
  const docs = buildOperationDocs(method, pathStr, summary || undefined, description || undefined)

  if (isQuery) {
    const { hookCode, keyGetterCode } = makeQueryHookCode(
      hookName,
      queryKeyGetterName,
      hasArgs,
      inferRequestType,
      inferResponseType,
      clientPath,
      method,
      pathStr,
      honoPath,
      docs,
      config,
    )
    return { code: `${hookCode}\n\n${keyGetterCode}`, isQuery: true, hasArgs }
  }

  const hookCode = makeMutationHookCode(
    hookName,
    hasArgs,
    inferRequestType,
    inferResponseType,
    clientPath,
    method,
    docs,
    config,
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

  // Vue Query: simplified imports without QueryClient and options types
  if (config.omitQueryKeyType) {
    const typeImportParts = [
      ...(needsInferRequestType ? ['InferRequestType'] : []),
      ...(hasMutation ? ['InferResponseType'] : []),
      'ClientRequestOptions',
    ]

    const lines = [
      ...(queryImports.length > 0
        ? [`import{${queryImports.join(',')}}from'${config.packageName}'`]
        : []),
      `import type{${typeImportParts.join(',')}}from'hono/client'`,
      "import{parseResponse}from'hono/client'",
      `import{${clientName}}from'${importPath}'`,
    ]
    return `${lines.join('\n')}\n\n`
  }

  // TanStack/Svelte Query: full imports
  const queryTypeImports = [
    'QueryClient',
    ...(hasQuery ? [config.queryOptionsType] : []),
    ...(hasMutation ? [config.mutationOptionsType] : []),
  ]

  const typeImports = needsInferRequestType
    ? 'InferRequestType,InferResponseType,ClientRequestOptions'
    : 'InferResponseType,ClientRequestOptions'

  const lines = [
    ...(queryImports.length > 0
      ? [`import{${queryImports.join(',')}}from'${config.packageName}'`]
      : []),
    `import type{${queryTypeImports.join(',')}}from'${config.packageName}'`,
    `import type{${typeImports}}from'hono/client'`,
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
