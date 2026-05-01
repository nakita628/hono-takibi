import path from 'node:path'

import { emit } from '../../emit/index.js'
import { isOpenAPIPaths, isOperationLike, isRecord } from '../../guard/index.js'
import {
  formatPath,
  makeOperationDeps,
  operationHasArgs,
  parsePathItem,
  resolveSplitOutDir,
} from '../../helper/index.js'
import type { OpenAPI, OpenAPIPaths } from '../../openapi/index.js'
import { makeInferRequestType, methodPath } from '../../utils/index.js'

function makeOperationCode(
  path: string,
  method: 'get' | 'put' | 'post' | 'delete' | 'options' | 'head' | 'patch' | 'trace',
  item: ReturnType<typeof parsePathItem>,
  deps: ReturnType<typeof makeOperationDeps>,
  useParseResponse?: boolean,
  hasBasePath?: boolean,
) {
  const operation = item[method]
  if (!isOperationLike(operation)) return null
  const funcName = methodPath(method, path)
  const pathResult = formatPath(path, hasBasePath)
  const hasArgs = operationHasArgs(item, operation, deps)
  const inferType = makeInferRequestType(deps.client, pathResult, method)
  const argSig = hasArgs
    ? `args:${inferType},options?:ClientRequestOptions`
    : 'options?:ClientRequestOptions'
  const clientCall = hasArgs
    ? `${deps.client}${pathResult.runtimePath}.$${method}(args,options)`
    : `${deps.client}${pathResult.runtimePath}.$${method}(undefined,options)`
  const call = useParseResponse ? `parseResponse(${clientCall})` : clientCall
  const func = `export async function ${funcName}(${argSig}){return await ${call}}`
  return { code: func, hasArgs } as const
}

function makeOperationCodes(
  paths: OpenAPIPaths,
  deps: ReturnType<typeof makeOperationDeps>,
  useParseResponse?: boolean,
  hasBasePath?: boolean,
) {
  return Object.entries(paths)
    .filter((entry) => isRecord(entry[1]))
    .flatMap(([p, rawItem]) => {
      const pathItem = parsePathItem(rawItem)
      const methods = ['get', 'put', 'post', 'delete', 'options', 'head', 'patch', 'trace'] as const
      return methods
        .map((method) => {
          const result = makeOperationCode(p, method, pathItem, deps, useParseResponse, hasBasePath)
          return result
            ? { funcName: methodPath(method, p), code: result.code, hasArgs: result.hasArgs }
            : null
        })
        .filter((item) => item !== null)
    })
}

function makeHeader(
  importPath: string,
  needsInferRequestType: boolean,
  clientName: string,
  useParseResponse?: boolean,
) {
  const typeImports = needsInferRequestType
    ? 'InferRequestType,ClientRequestOptions'
    : 'ClientRequestOptions'
  const parseResponseImport = useParseResponse ? `import{parseResponse}from'hono/client'\n` : ''
  return `import type{${typeImports}}from'hono/client'\n${parseResponseImport}import{${clientName}}from'${importPath}'\n\n` as const
}

/**
 * Generates RPC client wrapper functions from OpenAPI specification.
 *
 * @param openAPI - Parsed OpenAPI specification
 * @param output - Output file path or directory
 * @param importPath - Import path for the Hono client
 * @param split - Whether to split into multiple files (one per operation)
 * @param clientName - Name of the client export (default: 'client')
 * @param useParseResponse - Whether to wrap calls with parseResponse
 * @param basePath - Base path for the app (e.g. '/api')
 * @returns Promise resolving to success message or error
 */
export async function rpc(
  openAPI: OpenAPI,
  output: string,
  importPath: string,
  split?: boolean,
  clientName = 'client',
  useParseResponse?: boolean,
  basePath?: string,
) {
  const paths = openAPI.paths
  if (!isOpenAPIPaths(paths)) return { ok: false, error: 'Invalid OpenAPI paths' } as const
  const hasBasePath = basePath !== undefined && basePath !== '/'
  const componentsParameters = openAPI.components?.parameters ?? {}
  const componentsRequestBodies = openAPI.components?.requestBodies ?? {}
  const deps = makeOperationDeps(clientName, componentsParameters, componentsRequestBodies)
  const operationCodes = makeOperationCodes(paths, deps, useParseResponse, hasBasePath)
  if (!split) {
    const body = operationCodes.map(({ code }) => code).join('\n\n')
    const needsInferRequestType = operationCodes.some(({ hasArgs }) => hasArgs)
    const header = makeHeader(importPath, needsInferRequestType, clientName, useParseResponse)
    const code = `${header}${body}${operationCodes.length ? '\n' : ''}`
    const emitResult = await emit(code, path.dirname(output), output)
    if (!emitResult.ok) return { ok: false, error: emitResult.error } as const
    return { ok: true, value: `Generated rpc code written to ${output}` } as const
  }
  const { outDir, indexPath } = resolveSplitOutDir(output)
  const exportLines = Array.from(
    new Set(operationCodes.map(({ funcName }) => `export * from './${funcName}'`)),
  )
  const index = `${exportLines.join('\n')}\n`
  const results = await Promise.all([
    ...operationCodes.map(({ funcName, code, hasArgs }) => {
      const header = makeHeader(importPath, hasArgs, clientName, useParseResponse)
      const fileSrc = `${header}${code}\n`
      const filePath = path.join(outDir, `${funcName}.ts`)
      return emit(fileSrc, path.dirname(filePath), filePath)
    }),
    emit(index, path.dirname(indexPath), indexPath),
  ])
  const e = results.find((result) => !result.ok)
  if (e) return e
  return {
    ok: true,
    value: `Generated rpc code written to ${outDir}/*.ts (index.ts included)`,
  } as const
}
