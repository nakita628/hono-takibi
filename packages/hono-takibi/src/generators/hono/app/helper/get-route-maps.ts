import type { OpenAPISpec } from '../../../../types'
import { generateHandlerName } from '../../../handler/generate-handler-name'
import { generateRouteName } from '../../../openapi/paths/generate-route-name'

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
