import { appRouteHandler } from './utils/index.js'

/**
 * Generates the application route handlers.
 *
 * @param routeMappings - An array of route definitions with route and handler names.
 * @returns A string of `.openapi(...)` calls joined by newline.
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
