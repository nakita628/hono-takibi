/**
 * Generate app route handler
 * @param { string } routeName - Route name
 * @param { string } handlerName - Handler name
 * @returns { string } App route handler
 */
export function generateAppRouteHandler(routeName: string, handlerName: string) {
  return `.openapi(${routeName},${handlerName})`
}
