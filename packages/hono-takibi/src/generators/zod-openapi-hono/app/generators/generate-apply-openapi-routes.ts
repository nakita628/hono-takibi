import { generateAppRouteHandler } from '../generate-app-route-handler'

export function generateApplyOpenapiRoutes(
  routeMappings: {
    routeName: string
    handlerName: string
    path: string
  }[],
) {
  return routeMappings
    .map(({ routeName, handlerName }) => {
      return generateAppRouteHandler(routeName, handlerName)
    })
    .join('\n')
}
