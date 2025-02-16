export function generateHandler(handlerName: string, routeName: string) {
  return `export const ${handlerName}:RouteHandler<typeof ${routeName}>=async(c)=>{}`
}
