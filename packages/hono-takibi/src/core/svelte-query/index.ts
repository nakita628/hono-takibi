/**
 * Svelte Query hook generation module.
 *
 * Generates type-safe Svelte Query hooks from OpenAPI specifications
 * for use with Hono's RPC client.
 *
 * - GET operations generate `createQuery` hooks
 * - POST/PUT/DELETE/PATCH operations generate `createMutation` hooks
 *
 * ```mermaid
 * flowchart TD
 *   A["svelteQuery(openAPI, output, importPath, split)"] --> B["Parse OpenAPI paths"]
 *   B --> C["Build hook codes"]
 *   C --> D{"split mode?"}
 *   D -->|No| E["Write single file"]
 *   D -->|Yes| F["Write per-hook files"]
 *   F --> G["Write index.ts barrel"]
 * ```
 *
 * @module core/svelte-query
 * @link https://tanstack.com/query/latest/docs/framework/svelte/overview
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

/* ─────────────────────────────── Hook Name Generation ─────────────────────────────── */

/**
 * Convert method + path to hook name (e.g., "get" + "/users" -> "createGetUsers")
 */
const toHookName = (method: string, pathStr: string): string => {
  const funcName = methodPath(method, pathStr)
  return `create${funcName.charAt(0).toUpperCase()}${funcName.slice(1)}`
}

/**
 * Convert method + path to query key getter name (e.g., "get" + "/users" -> "getGetUsersQueryKey")
 */
const toQueryKeyGetterName = (method: string, pathStr: string): string => {
  const funcName = methodPath(method, pathStr)
  return `get${funcName.charAt(0).toUpperCase()}${funcName.slice(1)}QueryKey`
}

/* ─────────────────────────────── Single-hook generator ─────────────────────────────── */

const makeHookCode = (
  pathStr: string,
  method: HttpMethod,
  item: PathItemLike,
  deps: OperationDeps,
): GeneratedHook => {
  const op = item[method]
  if (!isOperationLike(op)) return null

  const hookName = toHookName(method, pathStr)
  const queryKeyGetterName = toQueryKeyGetterName(method, pathStr)
  const pathResult = formatPath(pathStr)
  const hasArgs = operationHasArgs(item, op, deps)
  const isQuery = method === 'get'

  const inferRequestType = buildInferRequestType(deps.client, pathResult, method)
  const inferResponseType = buildInferResponseType(deps.client, pathResult, method)

  // Convert {param} to :param for key path display
  const honoPath = pathStr.replace(/\{([^}]+)\}/g, ':$1')

  const summary = typeof op.summary === 'string' ? op.summary : ''
  const description = typeof op.description === 'string' ? op.description : ''
  const docs = buildOperationDocs(method, pathStr, summary || undefined, description || undefined)

  const keyDocs = [
    '/**',
    ` * Generates Svelte Query cache key for ${method.toUpperCase()} ${pathStr.replace(/\/\*/g, '/[*]')}`,
    ' */',
  ].join('\n')

  let hookCode: string
  let keyGetterCode: string

  if (isQuery) {
    // createQuery hook for GET (Svelte Query pattern)
    const argsSig = hasArgs ? `args:${inferRequestType},` : ''
    const queryOptionsType = `CreateQueryOptions<${inferResponseType},Error>`
    const optionsSig = `options?:{query?:${queryOptionsType};client?:ClientRequestOptions},queryClient?:QueryClient`

    const keyGetterCall = hasArgs ? `${queryKeyGetterName}(args)` : `${queryKeyGetterName}()`
    const clientCall = hasArgs
      ? `${deps.client}${pathResult.runtimePath}.$${method}(args,clientOptions)`
      : `${deps.client}${pathResult.runtimePath}.$${method}(undefined,clientOptions)`

    // Spread queryOptions first, then override with internal queryKey/queryFn to ensure they're never overwritten
    hookCode = `${docs}
export function ${hookName}(${argsSig}${optionsSig}){const{query:queryOptions,client:clientOptions}=options??{};const queryKey=${keyGetterCall};const query=createQuery({...queryOptions,queryKey,queryFn:async()=>parseResponse(${clientCall})},queryClient);return{...query,queryKey}}`

    // Key getter for GET (orval style: optional args with conditional spread)
    if (hasArgs) {
      keyGetterCode = `${keyDocs}
export function ${queryKeyGetterName}(args?:${inferRequestType}){return['${honoPath}',...(args?[args]:[])]as const}`
    } else {
      keyGetterCode = `${keyDocs}
export function ${queryKeyGetterName}(){return['${honoPath}']as const}`
    }
  } else {
    // createMutation hook for POST/PUT/DELETE/PATCH (Svelte Query pattern)
    // Note: TData includes undefined because parseResponse returns undefined for 204 No Content
    // Spread options first, then define mutationFn to ensure it's never overwritten
    if (hasArgs) {
      const mutationOptionsType = `CreateMutationOptions<${inferResponseType}|undefined,Error,${inferRequestType}>`
      const optionsSig = `options?:{mutation?:${mutationOptionsType};client?:ClientRequestOptions},queryClient?:QueryClient`
      hookCode = `${docs}
export function ${hookName}(${optionsSig}){return createMutation<${inferResponseType}|undefined,Error,${inferRequestType}>({...options?.mutation,mutationFn:async(args)=>parseResponse(${deps.client}${pathResult.runtimePath}.$${method}(args,options?.client))},queryClient)}`
    } else {
      const mutationOptionsType = `CreateMutationOptions<${inferResponseType}|undefined,Error,void>`
      const optionsSig = `options?:{mutation?:${mutationOptionsType};client?:ClientRequestOptions},queryClient?:QueryClient`
      hookCode = `${docs}
export function ${hookName}(${optionsSig}){return createMutation<${inferResponseType}|undefined,Error,void>({...options?.mutation,mutationFn:async()=>parseResponse(${deps.client}${pathResult.runtimePath}.$${method}(undefined,options?.client))},queryClient)}`
    }

    // No key getter for mutations
    keyGetterCode = ''
  }

  const code = keyGetterCode ? `${hookCode}\n\n${keyGetterCode}` : hookCode
  return { code, isQuery, hasArgs }
}

/**
 * Builds hook codes from OpenAPI paths.
 */
const makeHookCodes = (paths: OpenAPIPaths, deps: OperationDeps): HookCode[] =>
  Object.entries(paths)
    .filter((entry): entry is [string, Record<string, unknown>] => isRecord(entry[1]))
    .flatMap(([p, rawItem]) => {
      const pathItem = parsePathItem(rawItem)
      return HTTP_METHODS.map((method) => {
        const result = makeHookCode(p, method, pathItem, deps)
        return result
          ? {
              hookName: toHookName(method, p),
              code: result.code,
              isQuery: result.isQuery,
              hasArgs: result.hasArgs,
            }
          : null
      }).filter((item): item is HookCode => item !== null)
    })

/* ─────────────────────────────── Header ─────────────────────────────── */

/**
 * Generates the import header for Svelte Query hook files.
 */
const makeHeader = (
  importPath: string,
  hasQuery: boolean,
  hasMutation: boolean,
  needsInferRequestType: boolean,
  clientName: string,
): string => {
  const lines: string[] = []

  // Svelte Query imports
  const svelteQueryImports: string[] = []
  const svelteQueryTypeImports: string[] = ['QueryClient']

  if (hasQuery) {
    svelteQueryImports.push('createQuery')
    svelteQueryTypeImports.push('CreateQueryOptions')
  }
  if (hasMutation) {
    svelteQueryImports.push('createMutation')
    svelteQueryTypeImports.push('CreateMutationOptions')
  }

  if (svelteQueryImports.length > 0) {
    lines.push(`import{${svelteQueryImports.join(',')}}from'@tanstack/svelte-query'`)
  }
  lines.push(`import type{${svelteQueryTypeImports.join(',')}}from'@tanstack/svelte-query'`)

  // Hono client imports
  const typeImports = needsInferRequestType
    ? 'InferRequestType,InferResponseType,ClientRequestOptions'
    : 'InferResponseType,ClientRequestOptions'
  lines.push(`import type{${typeImports}}from'hono/client'`)
  lines.push("import{parseResponse}from'hono/client'")
  lines.push(`import{${clientName}}from'${importPath}'`)

  return `${lines.join('\n')}\n\n`
}

/* ─────────────────────────────── Entry ─────────────────────────────── */

/**
 * Generates Svelte Query hooks from OpenAPI specification.
 *
 * Creates type-safe Svelte Query hooks that wrap Hono RPC client calls,
 * with proper TypeScript types derived from OpenAPI schemas.
 *
 * - GET operations generate `createQuery` hooks
 * - POST/PUT/DELETE/PATCH operations generate `createMutation` hooks
 *
 * ```mermaid
 * flowchart LR
 *   subgraph "Generated Code"
 *     A["export function createGetUsers(...) { return createQuery(...) }"]
 *   end
 *   subgraph "Usage"
 *     B["const { data, error } = createGetUsers({ query: { limit: 10 } })"]
 *   end
 *   A --> B
 * ```
 *
 * @param openAPI - Parsed OpenAPI specification
 * @param output - Output file path or directory
 * @param importPath - Import path for the Hono client
 * @param split - Whether to split into multiple files (one per hook)
 * @param clientName - Name of the client export (default: 'client')
 * @returns Promise resolving to success message or error
 *
 * @example
 * ```ts
 * // Single file output
 * await svelteQuery(openAPI, 'src/hooks.ts', './client')
 * // Generates: src/hooks.ts with all Svelte Query hooks
 *
 * // Split mode output
 * await svelteQuery(openAPI, 'src/hooks', './client', true)
 * // Generates: src/hooks/createGetUsers.ts, src/hooks/createPostUsers.ts, src/hooks/index.ts
 * ```
 */
export async function svelteQuery(
  openAPI: OpenAPI,
  output: string | `${string}.ts`,
  importPath: string,
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

  const hookCodes = makeHookCodes(pathsMaybe, deps)

  // Non-split: write single file
  if (!split) {
    const body = hookCodes.map(({ code }) => code).join('\n\n')
    const hasQuery = hookCodes.some(({ isQuery }) => isQuery)
    const hasMutation = hookCodes.some(({ isQuery }) => !isQuery)
    const needsInferRequestType = hookCodes.some(({ hasArgs }) => hasArgs)
    const header = makeHeader(importPath, hasQuery, hasMutation, needsInferRequestType, clientName)
    const code = `${header}${body}${hookCodes.length ? '\n' : ''}`
    const coreResult = await core(code, path.dirname(output), output)
    if (!coreResult.ok) return { ok: false, error: coreResult.error }
    return { ok: true, value: `Generated svelte-query hooks written to ${output}` }
  }

  // Split: write each file + index.ts (barrel) in parallel
  const { outDir, indexPath } = resolveSplitOutDir(output)

  const exportLines = Array.from(
    new Set(hookCodes.map(({ hookName }) => `export * from './${hookName}'`)),
  )
  const index = `${exportLines.join('\n')}\n`

  const allResults = await Promise.all([
    ...hookCodes.map(({ hookName, code, isQuery, hasArgs }) => {
      const hasQueryFile = isQuery
      const hasMutationFile = !isQuery
      const header = makeHeader(importPath, hasQueryFile, hasMutationFile, hasArgs, clientName)
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
    value: `Generated svelte-query hooks written to ${outDir}/*.ts (index.ts included)`,
  }
}
