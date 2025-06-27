import { handlerName } from '../../handler/generator/index.js'
import { generateRouteName } from '../../openapi/route/route-name.js'
import type { OpenAPI } from '../../../../openapi/index.js'

/**
 * Get route maps
 * @param { openAPI } OpenAPI - OpenAPI spec
 * @returns { { routeName: string, handlerName: string, path: string }[] } Route maps
 */
export function getRouteMaps(
  openapi: OpenAPI,
): { routeName: string; handlerName: string; path: string }[] {
  const paths = openapi.paths
  const routeMappings = Object.entries(paths).flatMap(([path, pathItem]) => {
    return Object.entries(pathItem).flatMap(([method]) => {
      return {
        routeName: generateRouteName(method, path),
        handlerName: handlerName(method, path),
        path,
      }
    })
  })
  return routeMappings
}
