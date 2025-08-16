import type { OpenAPI } from '../openapi/index.js'
import { methodPath } from '../utils/index.js'

/**
 * Extracts route mappings from an OpenAPI specification.
 *
 * @param openapi - The OpenAPI specification object.
 * @returns An array of route mappings, each with route name, handler name, and path.
 */
export function getRouteMaps(
  openapi: OpenAPI,
): { routeName: string; handlerName: string; path: string }[] {
  const isHttpMethod = (
    v: string,
  ): v is 'get' | 'put' | 'post' | 'delete' | 'patch' | 'options' | 'head' | 'trace' => {
    for (const m of ['get', 'put', 'post', 'delete', 'patch', 'options', 'head', 'trace']) {
      if (m === v) return true
    }
    return false
  }
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
