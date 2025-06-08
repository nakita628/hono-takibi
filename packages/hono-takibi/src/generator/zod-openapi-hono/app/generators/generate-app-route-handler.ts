/**
 * Generate app route handler
 * @param { string } routeName - Route name
 * @param { string } handlerName - Handler name
 */
export function generateAppRouteHandler(routeName: string, handlerName: string) {
  return `.openapi(${routeName},${handlerName})`
}
