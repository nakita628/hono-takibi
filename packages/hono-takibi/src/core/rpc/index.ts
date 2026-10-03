import { dirname } from 'node:path'

import { Effect } from 'effect'

import { emit } from '../../emit/index.js'
import { GenerateError } from '../../error/index.js'
import { isOpenAPIPaths, isOperationLike, isRecord } from '../../guard/index.js'
import {
  formatPath,
  groupClientName,
  makeOperationDeps,
  operationHasArgs,
  operationTags,
  parsePathItem,
} from '../../helper/index.js'
import type { Grouping } from '../../helper/index.js'
import type { OpenAPI, OpenAPIPaths } from '../../openapi/index.js'
import { makeInferRequestType, methodPath } from '../../utils/index.js'

/**
 * Builds a JSDoc block from operation `summary` / `description` plus the HTTP route line.
 * Returns an empty string when neither summary nor description is present (the route line
 * alone isn't worth a comment block).
 */
function makeJsDoc(
  operation: { summary?: unknown; description?: unknown },
  method: string,
  path: string,
) {
  const summary = typeof operation.summary === 'string' ? operation.summary.trim() : ''
  const description = typeof operation.description === 'string' ? operation.description.trim() : ''
  if (!summary && !description) return ''
  const sections: string[][] = []
  if (summary) sections.push([summary])
  if (description) sections.push(description.split('\n'))
  sections.push([`${method.toUpperCase()} ${path}`])
  const body = sections
    .map((lines) => lines.join('\n'))
    .join('\n\n')
    .split('\n')
    .map((line) => (line ? ` * ${line}` : ' *'))
    .join('\n')
  return `/**\n${body}\n */\n`
}

function makeOperationCode(
  path: string,
  method: 'get' | 'put' | 'post' | 'delete' | 'options' | 'head' | 'patch' | 'trace' | 'query',
  item: ReturnType<typeof parsePathItem>,
  base: ReturnType<typeof makeOperationDeps>,
  useParseResponse?: boolean,
  hasBasePath?: boolean,
  docs?: boolean,
  grouping?: Grouping,
) {
  const operation = item[method]
  if (!isOperationLike(operation)) return null
  // An operation of a split application is called through the client of its group, and
  // through the client of the application when it belongs to none.
  const group = grouping?.(path, operationTags(operation))
  const deps = group === undefined ? base : { ...base, client: groupClientName(group) }
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
  const jsDoc = docs ? makeJsDoc(operation, method, path) : ''
  const func = `${jsDoc}export async function ${funcName}(${argSig}){return await ${call}}`
  return { code: func, hasArgs, client: deps.client } as const
}

function makeOperationCodes(
  paths: OpenAPIPaths,
  deps: ReturnType<typeof makeOperationDeps>,
  useParseResponse?: boolean,
  hasBasePath?: boolean,
  docs?: boolean,
  grouping?: Grouping,
) {
  return Object.entries(paths)
    .filter((entry) => isRecord(entry[1]))
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
        .map((method) =>
          makeOperationCode(
            p,
            method,
            pathItem,
            deps,
            useParseResponse,
            hasBasePath,
            docs,
            grouping,
          ),
        )
        .filter((item) => item !== null)
    })
}

function makeHeader(
  importPath: string,
  needsInferRequestType: boolean,
  clientNames: readonly string[],
  useParseResponse?: boolean,
) {
  const typeImports = needsInferRequestType
    ? 'InferRequestType,ClientRequestOptions'
    : 'ClientRequestOptions'
  const parseResponseImport = useParseResponse ? `import{parseResponse}from'hono/client'\n` : ''
  return `import type{${typeImports}}from'hono/client'\n${parseResponseImport}import{${clientNames.join(',')}}from'${importPath}'\n\n` as const
}

/**
 * Generates RPC client wrapper functions from OpenAPI specification.
 */
export function rpc(
  openAPI: OpenAPI,
  output: string,
  importPath: string,
  clientName = 'client',
  useParseResponse?: boolean,
  basePath?: string,
  docs?: boolean,
  grouping?: Grouping,
) {
  return Effect.gen(function* () {
    const paths = openAPI.paths
    if (!isOpenAPIPaths(paths)) {
      return yield* new GenerateError({ message: 'Invalid OpenAPI paths' })
    }
    const hasBasePath = basePath !== undefined && basePath !== '/'
    const componentsParameters = openAPI.components?.parameters ?? {}
    const componentsRequestBodies = openAPI.components?.requestBodies ?? {}
    const deps = makeOperationDeps(clientName, componentsParameters, componentsRequestBodies)
    const operationCodes = makeOperationCodes(
      paths,
      deps,
      useParseResponse,
      hasBasePath,
      docs,
      grouping,
    )
    const body = operationCodes.map(({ code }) => code).join('\n\n')
    const needsInferRequestType = operationCodes.some(({ hasArgs }) => hasArgs)
    const clientNames = [...new Set(operationCodes.map(({ client }) => client))]
    const header = makeHeader(
      importPath,
      needsInferRequestType,
      clientNames.length > 0 ? clientNames : [clientName],
      useParseResponse,
    )
    const code = `${header}${body}${operationCodes.length > 0 ? '\n' : ''}`
    yield* emit(code, dirname(output), output)
    return `Generated rpc code written to ${output}`
  })
}
