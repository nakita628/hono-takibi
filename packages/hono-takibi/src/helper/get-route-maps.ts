import type { OpenAPI } from '../openapi/index.js'
import { isHttpMethod, methodPath } from '../utils/index.js'

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
      if (!isHttpMethod(method)) return []
      return {
        routeName: `${methodPath(method, path)}Route`,
        handlerName: `${methodPath(method, path)}RouteHandler`,
        path,
      }
    })
  })
  return routeMappings
}
