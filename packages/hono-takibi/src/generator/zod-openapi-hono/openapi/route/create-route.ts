type CreateRouteParams = {
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
}

/**
 * Generates TypeScript code for a Hono route definition
 * @param { CreateRouteParams } args - Object containing route definition properties
 * @returns { string } Generated TypeScript code string for the route definition
 * @example
 * const args = {
 *   routeName: 'getUsersRoute',
 *   tags: 'tags:["users"],',
 *   method: 'method:"get",',
 *   path: 'path:"/users",',
 *   description: 'description:"Get all users",',
 *   security: 'security:[{"bearerAuth":[]}],',
 *   request: 'request:{query:z.object({limit:z.number()})},',
 *   responses: 'responses:{200:{description:"Success",content:{"application/json":{schema:UserList}}}}'
 * }
 *
 * const code = generateCreateRoute(args)
 * // Returns:
 * // export const getUsersRoute = createRoute({
 * //   tags:["users"],
 * //   method:"get",
 * //   path:"/users",
 * //   description:"Get all users",
 * //   security:[{"bearerAuth":[]}],
 * //   request:{query:z.object({limit:z.number()})},
 * //   responses:{200:{description:"Success",content:{"application/json":{schema:UserList}}}}
 * // })
 *
 * - Combines all route properties into a single createRoute call
 * - Handles:
 *   - Route name export
 *   - OpenAPI tags
 *   - HTTP method
 *   - Path definition
 *   - Route description
 *   - Security requirements
 *   - Request parameters and validation
 *   - Response definitions
 * - Properties are joined without additional spacing
 * - Undefined/empty properties are safely handled
 * - Creates a valid TypeScript export statement
 */
export function createRoute(args: CreateRouteParams): string {
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
