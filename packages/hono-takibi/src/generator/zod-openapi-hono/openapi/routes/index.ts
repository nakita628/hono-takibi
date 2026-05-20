import { makeCallbacks, makeOperationResponses, makeRequest } from '../../../../helper/openapi.js'
import type { OpenAPI, Operation, Parameter, PathItem } from '../../../../openapi/index.js'
import { methodPath } from '../../../../utils/index.js'

export function routeCode(openapi: OpenAPI, readonly?: boolean): string {
  const makeRoute = (path: string, method: string, operation: Operation, readonly?: boolean) => {
    const properties = [
      `method:${JSON.stringify(method)}`,
      `path:${JSON.stringify(path)}`,
      operation.tags ? `tags:${JSON.stringify(operation.tags)}` : undefined,
      operation.summary ? `summary:${JSON.stringify(operation.summary)}` : undefined,
      operation.description ? `description:${JSON.stringify(operation.description)}` : undefined,
      operation.externalDocs ? `externalDocs:${JSON.stringify(operation.externalDocs)}` : undefined,
      operation.operationId ? `operationId:${JSON.stringify(operation.operationId)}` : undefined,
      makeRequest(operation.parameters, operation.requestBody, readonly)
        ? `request:${makeRequest(operation.parameters, operation.requestBody, readonly)}`
        : undefined,
      operation.responses
        ? `responses:${makeOperationResponses(operation.responses, readonly)}`
        : undefined,
      operation.callbacks
        ? `callbacks:{${makeCallbacks(operation.callbacks, readonly)}}`
        : undefined,
      operation.deprecated ? `deprecated:${JSON.stringify(operation.deprecated)}` : undefined,
      operation.security ? `security:${JSON.stringify(operation.security)}` : undefined,
      operation.servers ? `servers:${JSON.stringify(operation.servers)}` : undefined,
    ]
      .filter((v) => v !== undefined)
      .join(',')
    const asConst = readonly ? ' as const' : ''
    return `export const ${methodPath(method, path)}Route=createRoute({${properties}}${asConst})`
  }
  const isParameterRef = (ref: string): ref is `#/components/parameters/${string}` =>
    ref.startsWith('#/components/parameters/')
  const isPathItemRef = (ref: string): ref is `#/components/pathItems/${string}` =>
    ref.startsWith('#/components/pathItems/')
  const resolveParameter = (parameter: Parameter | { readonly $ref?: string }) => {
    if ('name' in parameter && 'in' in parameter) return parameter
    const ref = '$ref' in parameter ? parameter.$ref : undefined
    if (!ref || !isParameterRef(ref)) return undefined
    const resolved = openapi.components?.parameters?.[ref.slice(ref.lastIndexOf('/') + 1)]
    if (!resolved) return undefined
    return { ...resolved, $ref: ref } as const
  }
  const resolvePathItem = (pathItem: PathItem): PathItem => {
    if (pathItem.$ref && isPathItemRef(pathItem.$ref)) {
      const name = pathItem.$ref.slice(pathItem.$ref.lastIndexOf('/') + 1)
      const resolved = openapi.components?.pathItems?.[name]
      if (resolved) {
        const { $ref: _, ...siblings } = pathItem
        return { ...resolved, ...siblings } as const
      }
    }
    return pathItem
  }
  return Object.entries(openapi.paths)
    .flatMap(([path, pathItem]) => {
      if (!pathItem) return [] as const
      const resolved = resolvePathItem(pathItem)
      return (['get', 'put', 'post', 'delete', 'patch', 'options', 'head', 'trace'] as const)
        .map((method) => {
          const operation = resolved[method]
          if (!operation?.responses) return undefined
          const parameters = [
            ...(resolved.parameters ?? ([] as const)),
            ...(operation.parameters ?? ([] as const)),
          ]
            .map(resolveParameter)
            .filter((p) => p !== undefined)
          return makeRoute(
            path,
            method,
            parameters.length > 0 ? { ...operation, parameters } : operation,
            readonly,
          )
        })
        .filter((v) => v !== undefined)
    })
    .join('\n\n')
}
