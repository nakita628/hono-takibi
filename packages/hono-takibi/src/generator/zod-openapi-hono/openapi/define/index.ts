import { makeCallbacks, makeOperationResponses, makeRequest } from '../../../../helper/openapi.js'
import type { OpenAPI, Operation, Parameter, PathItem } from '../../../../openapi/index.js'
import { methodPath } from '../../../../utils/index.js'

/**
 * Builds `defineOpenAPIRoute({ route: createRoute({...}), handler })` entries.
 *
 * Each entry co-locates the route definition with an empty handler stub for the user
 * to implement, so a single export (e.g. `getUsersRoute`) registers via
 * `app.openapiRoutes([...])`. The empty stub does not type-check until the handler
 * returns a response — the same convention as the routeHandler / inline modes.
 *
 * `addRoute: true` is required for `openapiRoutes` to accept the entry under
 * `exactOptionalPropertyTypes` (otherwise `defineOpenAPIRoute` infers `addRoute?: undefined`,
 * which is not assignable to the `addRoute?: boolean` it expects); it is the default
 * "register in the OpenAPI document" behavior made explicit.
 */
export function defineEntries(
  openapi: OpenAPI,
  readonly?: boolean,
): readonly { readonly name: string; readonly path: string; readonly code: string }[] {
  const makeEntry = (path: string, method: string, operation: Operation, readonly?: boolean) => {
    // Properties follow `openapi/index.ts` `Operation` declaration order (method/path are
    // createRoute-specific and lead; request merges parameters + requestBody).
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
    const entryName = methodPath(method, path)
    return {
      name: entryName,
      path,
      code: `export const ${entryName}Route=defineOpenAPIRoute({route:createRoute({${properties}}${asConst}),handler:async(c)=>{},addRoute:true})`,
    }
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
  return Object.entries(openapi.paths).flatMap(([path, pathItem]) => {
    if (!pathItem) return [] as const
    const resolved = resolvePathItem(pathItem)
    return (['get', 'put', 'post', 'delete', 'patch', 'options', 'head', 'trace'] as const).flatMap(
      (method) => {
        const operation = resolved[method]
        if (!operation?.responses) return []
        const parameters = [
          ...(resolved.parameters ?? ([] as const)),
          ...(operation.parameters ?? ([] as const)),
        ]
          .map(resolveParameter)
          .filter((p) => p !== undefined)
        return [
          makeEntry(
            path,
            method,
            parameters.length > 0 ? { ...operation, parameters } : operation,
            readonly,
          ),
        ]
      },
    )
  })
}
