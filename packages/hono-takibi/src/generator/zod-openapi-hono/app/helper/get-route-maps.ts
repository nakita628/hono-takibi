import { generateHandlerName } from '../../handler/generate-handler-name'
import { generateRouteName } from '../../openapi/route/generate-route-name'
import type { OpenAPISpec } from '../../../../type'

/**
 * Get route maps
 * @param { OpenAPISpec } openAPISpec - OpenAPI spec
 * @returns { { routeName: string, handlerName: string, path: string }[] } Route maps
 */
export function getRouteMaps(openAPISpec: OpenAPISpec) {
  const paths = openAPISpec.paths
  const routeMappings = Object.entries(paths).flatMap(([path, pathItem]) => {
    return Object.entries(pathItem).flatMap(([method]) => {
      const routeName = generateRouteName(method, path)
      const handlerName = generateHandlerName(method, path)
      return { routeName, handlerName, path }
    })
  })
  return routeMappings
}
