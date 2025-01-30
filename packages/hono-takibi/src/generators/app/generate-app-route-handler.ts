export function generateAppRouteHandler(routeName: string, handlerName: string) {
  return `.openapi(${routeName}, ${handlerName})`
}
