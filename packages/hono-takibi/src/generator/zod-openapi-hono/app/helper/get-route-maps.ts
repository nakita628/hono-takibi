import { handlerName } from '../../handler/generator/index.js'
import { routeName } from '../../openapi/route/index.js'
import type { OpenAPI } from '../../../../openapi/index.js'

/**
 * Get route maps
 * @param { openapi } openapi - OpenAPI spec
 * @returns { { routeName: string, handlerName: string, path: string }[] } Route maps
 */
export function getRouteMaps(
  openapi: OpenAPI,
): { routeName: string; handlerName: string; path: string }[] {
  const paths = openapi.paths
  const routeMappings = Object.entries(paths).flatMap(([path, pathItem]) => {
    return Object.entries(pathItem).flatMap(([method]) => {
      return {
        routeName: routeName(method, path),
        handlerName: handlerName(method, path),
        path,
      }
    })
  })
  return routeMappings
}
