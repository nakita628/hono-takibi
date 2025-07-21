/**
 * Generates a Hono route definition as a TypeScript string.
 *
 * @param args - Route metadata and OpenAPI properties.
 * @returns A TypeScript export string using `createRoute`.
 *
 * @example
 * createRoute({
 *   routeName: 'getUserRoute',
 *   method: 'method:"get",',
 *   path: 'path:"/user",',
 *   responses: 'responses:{200:{description:"OK"}}',
 *   requestParams: 'request:{query:z.object({...})}'
 * })
 */
export function createRoute(args: {
  routeName: string
  tags?: string
  method: string
  path: string
  operationId?: string
  summary?: string
  description?: string
  security?: string
  requestParams: string
  responses: string
}): string {
  const properties = [
    args.tags,
    args.method,
    args.path,
    args.operationId,
    args.summary,
    args.description,
    args.security,
    args.requestParams,
    args.responses,
  ].join('')
  return `export const ${args.routeName}=createRoute({${properties}})`
}
