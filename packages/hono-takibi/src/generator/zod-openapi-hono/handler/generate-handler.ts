/**
 * Generates a handler function for a route.
 *
 * @param handlerName - The name of the handler function.
 * @param routeName - The name of the route.
 * @returns A string of the handler function.
 */
export function generateHandler(handlerName: string, routeName: string) {
  return `export const ${handlerName}:RouteHandler<typeof ${routeName}>=async(c)=>{}`
}
