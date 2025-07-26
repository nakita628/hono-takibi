import type { OpenAPI } from '../../../../openapi/index.js'
import { routeName } from '../../../../utils/index.js'

/**
 * Extracts route mappings from an OpenAPI specification.
 *
 * @param openapi - The OpenAPI specification object.
 * @returns An array of route mappings, each with route name, handler name, and path.
 */
export function getRouteMaps(
  openapi: OpenAPI,
): { routeName: string; handlerName: string; path: string }[] {
  const paths = openapi.paths
  const routeMappings = Object.entries(paths).flatMap(([path, pathItem]) => {
    return Object.entries(pathItem).flatMap(([method]) => {
      return {
        routeName: routeName(method, path),
        handlerName: `${routeName(method, path)}Handler`,
        path,
      }
    })
  })
  return routeMappings
}
