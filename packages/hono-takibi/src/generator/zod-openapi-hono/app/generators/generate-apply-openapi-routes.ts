import { generateAppRouteHandler } from '../generate-app-route-handler'

/**
 * Generates the application route handlers.
 *
 * @function generateApplyOpenapiRoutes
 * @param routeMappings - An array of objects containing route name, handler name, and path.
 * @returns A string of application route handlers.
 */
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
