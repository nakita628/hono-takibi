import { appRouteHandler } from './index.js'

/**
 * Generates the application route handlers.
 *
 * @function applyOpenapiRoutes
 * @param routeMappings - An array of objects containing route name, handler name, and path.
 * @returns A string of application route handlers.
 */
export function applyOpenapiRoutes(
  routeMappings: {
    routeName: string
    handlerName: string
    path: string
  }[],
) {
  return routeMappings
    .map(({ routeName, handlerName }) => {
      return appRouteHandler(routeName, handlerName)
    })
    .join('\n')
}
