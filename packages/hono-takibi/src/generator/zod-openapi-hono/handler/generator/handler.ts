/**
 * Generates a handler function for a route.
 * @param { string } handlerName - The name of the handler function.
 * @param { string } routeName - The name of the route.
 * @returns { string } A string of the handler function.
 */
export function handler(handlerName: string, routeName: string): string {
  return `export const ${handlerName}:RouteHandler<typeof ${routeName}>=async(c)=>{}`
}
