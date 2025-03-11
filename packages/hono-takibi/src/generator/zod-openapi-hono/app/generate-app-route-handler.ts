/**
 * Generate app route handler
 *
 * @function generateAppRouteHandler
 * @param routeName - Route name
 * @param handlerName - Handler name
 * @returns app route handler
 */
export function generateAppRouteHandler(routeName: string, handlerName: string) {
  return `.openapi(${routeName},${handlerName})`
}
