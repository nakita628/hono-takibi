/**
 * RPC client wrapper generation module.
 *
 * Generates type-safe RPC client functions from OpenAPI specifications
 * for use with Hono's RPC client.
 *
 * ```mermaid
 * flowchart TD
 *   A["rpc(openAPI, output, importPath, split)"] --> B["Parse OpenAPI paths"]
 *   B --> C["Build operation codes"]
 *   C --> D{"split mode?"}
 *   D -->|No| E["Write single file"]
 *   D -->|Yes| F["Write per-operation files"]
 *   F --> G["Write index.ts barrel"]
 * ```
 *
 * @module core/rpc
 * @link https://github.com/honojs/hono/blob/main/src/client/types.ts#L46-L76
 */
import path from 'node:path'
import { isOpenAPIPaths, isOperationLike, isRecord } from '../../guard/index.js'
import {
  core,
  formatPath,
  makeInferRequestType,
  makeOperationDeps,
  operationHasArgs,
  parsePathItem,
  resolveSplitOutDir,
} from '../../helper/index.js'
import type { OpenAPI, OpenAPIPaths } from '../../openapi/index.js'
import { methodPath, makeOperationDocs } from '../../utils/index.js'

/* ─────────────────────────────── Types ─────────────────────────────── */

type OperationCode = {
  readonly funcName: string
  readonly code: string
  readonly hasArgs: boolean
}

type GeneratedOperation = { code: string; hasArgs: boolean } | null

/* ─────────────────────────────── Single-operation generator ─────────────────────────────── */

const makeOperationCode = (
  pathStr: string,
  method: 'get' | 'put' | 'post' | 'delete' | 'options' | 'head' | 'patch' | 'trace',
  item: ReturnType<typeof parsePathItem>,
  deps: ReturnType<typeof makeOperationDeps>,
  useParseResponse?: boolean,
): GeneratedOperation => {
  const op = item[method]
  if (!isOperationLike(op)) return null

  const funcName = methodPath(method, pathStr)
  const pathResult = formatPath(pathStr)
  const hasArgs = operationHasArgs(item, op, deps)

  const inferType = makeInferRequestType(deps.client, pathResult, method)

  const argSig = hasArgs
    ? `args:${inferType},options?:ClientRequestOptions`
    : 'options?:ClientRequestOptions'
  const clientCall = hasArgs
    ? `${deps.client}${pathResult.runtimePath}.$${method}(args,options)`
    : `${deps.client}${pathResult.runtimePath}.$${method}(undefined,options)`
  const call = useParseResponse ? `parseResponse(${clientCall})` : clientCall

  const summary = typeof op.summary === 'string' ? op.summary : ''
  const description = typeof op.description === 'string' ? op.description : ''
  const docs = makeOperationDocs(method, pathStr, summary || undefined, description || undefined)

  const func = `export async function ${funcName}(${argSig}){return await ${call}}`

  return { code: `${docs}\n${func}`, hasArgs }
}

/**
 * Builds operation codes from OpenAPI paths.
 */
const makeOperationCodes = (
  paths: OpenAPIPaths,
  deps: ReturnType<typeof makeOperationDeps>,
  useParseResponse?: boolean,
): OperationCode[] =>
  Object.entries(paths)
    .filter((entry): entry is [string, Record<string, unknown>] => isRecord(entry[1]))
    .flatMap(([p, rawItem]) => {
      const pathItem = parsePathItem(rawItem)
      const methods = ['get', 'put', 'post', 'delete', 'options', 'head', 'patch', 'trace'] as const
      return methods
        .map((method) => {
          const result = makeOperationCode(p, method, pathItem, deps, useParseResponse)
          return result
            ? { funcName: methodPath(method, p), code: result.code, hasArgs: result.hasArgs }
            : null
        })
        .filter((item): item is OperationCode => item !== null)
    })

/* ─────────────────────────────── Header ─────────────────────────────── */

const makeHeader = (
  importPath: string,
  needsInferRequestType: boolean,
  clientName: string,
  useParseResponse?: boolean,
): string => {
  const typeImports = needsInferRequestType
    ? 'InferRequestType,ClientRequestOptions'
    : 'ClientRequestOptions'
  const parseResponseImport = useParseResponse ? `import{parseResponse}from'hono/client'\n` : ''
  return `import type{${typeImports}}from'hono/client'\n${parseResponseImport}import{${clientName}}from'${importPath}'\n\n`
}

/* ─────────────────────────────── Entry ─────────────────────────────── */

/**
 * Generates RPC client wrapper functions from OpenAPI specification.
 *
 * Creates type-safe client functions that wrap Hono RPC client calls,
 * with proper TypeScript types derived from OpenAPI schemas.
 *
 * ```mermaid
 * flowchart LR
 *   subgraph "Generated Code"
 *     A["export async function getUsers(params) { return await client.users.$get(params) }"]
 *   end
 *   subgraph "Usage"
 *     B["const users = await getUsers({ query: { limit: 10 } })"]
 *   end
 *   A --> B
 * ```
 *
 * @param openAPI - Parsed OpenAPI specification
 * @param output - Output file path or directory
 * @param importPath - Import path for the Hono client
 * @param split - Whether to split into multiple files (one per operation)
 * @param clientName - Name of the client export (default: 'client')
 * @returns Promise resolving to success message or error
 *
 * @example
 * ```ts
 * // Single file output
 * await rpc(openAPI, 'src/rpc.ts', './client')
 * // Generates: src/rpc.ts with all RPC functions
 *
 * // Split mode output
 * await rpc(openAPI, 'src/rpc', './client', true)
 * // Generates: src/rpc/getUsers.ts, src/rpc/postUsers.ts, src/rpc/index.ts
 * ```
 */
export async function rpc(
  openAPI: OpenAPI,
  output: string | `${string}.ts`,
  importPath: string,
  split?: boolean,
  clientName = 'client',
  useParseResponse?: boolean,
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

  const operationCodes = makeOperationCodes(pathsMaybe, deps, useParseResponse)

  // Non-split: write single file
  if (!split) {
    const body = operationCodes.map(({ code }) => code).join('\n\n')
    const needsInferRequestType = operationCodes.some(({ hasArgs }) => hasArgs)
    const header = makeHeader(importPath, needsInferRequestType, clientName, useParseResponse)
    const code = `${header}${body}${operationCodes.length ? '\n' : ''}`
    const coreResult = await core(code, path.dirname(output), output)
    if (!coreResult.ok) return { ok: false, error: coreResult.error }
    return { ok: true, value: `Generated rpc code written to ${output}` }
  }

  // Split: write each file + index.ts (barrel) in parallel
  const { outDir, indexPath } = resolveSplitOutDir(output)

  const exportLines = Array.from(
    new Set(operationCodes.map(({ funcName }) => `export * from './${funcName}'`)),
  )
  const index = `${exportLines.join('\n')}\n`

  const allResults = await Promise.all([
    ...operationCodes.map(({ funcName, code, hasArgs }) => {
      const header = makeHeader(importPath, hasArgs, clientName, useParseResponse)
      const fileSrc = `${header}${code}\n`
      const filePath = path.join(outDir, `${funcName}.ts`)
      return core(fileSrc, path.dirname(filePath), filePath)
    }),
    core(index, path.dirname(indexPath), indexPath),
  ])

  const firstError = allResults.find((r) => !r.ok)
  if (firstError) return firstError
  return {
    ok: true,
    value: `Generated rpc code written to ${outDir}/*.ts (index.ts included)`,
  }
}
