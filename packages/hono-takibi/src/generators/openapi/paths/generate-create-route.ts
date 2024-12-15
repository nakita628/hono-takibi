type GenerateCreateRouteParams = {
  routeName: string
  tagsCode: string
  methodCode: string
  pathCode: string
  descriptionCode?: string
  securityCode?: string
  requestParams: string
  responsesCode: string
}

/**
 * Generates TypeScript code for a Hono route definition
 *
 * @function generateCreateRoute
 * @param args - Object containing route definition properties
 * @returns Generated TypeScript code string for the route definition
 *
 * @example
 * const args = {
 *   routeName: 'getUsersRoute',
 *   tagsCode: 'tags:["users"],',
 *   methodCode: 'method:"get",',
 *   pathCode: 'path:"/users",',
 *   descriptionCode: 'description:"Get all users",',
 *   securityCode: 'security:[{"bearerAuth":[]}],',
 *   requestParams: 'request:{query:z.object({limit:z.number()})},',
 *   responsesCode: 'responses:{200:{description:"Success",content:{"application/json":{schema:UserList}}}}'
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
 * @note
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
export function generateCreateRoute(args: GenerateCreateRouteParams): string {
  const properties = [
    args.tagsCode,
    args.methodCode,
    args.pathCode,
    args.descriptionCode,
    args.securityCode,
    args.requestParams,
    args.responsesCode,
  ].join('')
  return `export const ${args.routeName}=createRoute({${properties}})`
}
