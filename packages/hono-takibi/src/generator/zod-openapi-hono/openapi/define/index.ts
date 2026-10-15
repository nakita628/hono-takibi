import { HTTP_METHODS } from '../../../../constants/index.js'
import { isPathItemEntry } from '../../../../guard/index.js'
import {
  makeRouteProperties,
  resolveParameter,
  resolvePathItem,
} from '../../../../helper/openapi.js'
import type { OpenAPI } from '../../../../openapi/index.js'
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
): readonly {
  readonly name: string
  readonly path: string
  readonly tags?: readonly string[]
  readonly code: string
}[] {
  const resolve = resolveParameter(openapi)
  const resolveItem = resolvePathItem(openapi)
  return Object.entries(openapi.paths).flatMap(([path, pathItem]) => {
    if (!isPathItemEntry(pathItem)) return []
    const resolved = resolveItem(pathItem)
    return HTTP_METHODS.flatMap((method) => {
      const operation = resolved[method]
      if (!operation?.responses) return []
      const parameters = [...(resolved.parameters ?? []), ...(operation.parameters ?? [])]
        .map(resolve)
        .filter((p) => p !== undefined)
      const effective = parameters.length > 0 ? { ...operation, parameters } : operation
      const properties = makeRouteProperties(
        path,
        method,
        effective,
        readonly,
        openapi.components?.schemas,
      )
      const asConst = readonly ? ' as const' : ''
      const entryName = methodPath(method, path)
      return [
        {
          name: entryName,
          path,
          ...(effective.tags ? { tags: effective.tags } : {}),
          code: `export const ${entryName}Route=defineOpenAPIRoute({route:createRoute({${properties}}${asConst}),handler:async(c)=>{},addRoute:true})`,
        },
      ]
    })
  })
}
