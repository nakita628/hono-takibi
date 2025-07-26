/**
 * Generates a Hono route definition as a TypeScript export string.
 *
 * @param args - Route metadata and OpenAPI-compliant fields.
 * @returns A string representing a `createRoute` export statement.
 *
 * @example
 * createRoute({
 *   routeName: 'getUserRoute',
 *   method: 'method:"get",',
 *   path: 'path:"/user",',
 *   requestParams: 'request:{query:z.object({ id: z.string() })},',
 *   responses: 'responses:{200:{description:"OK"}}'
 * })
 * // => export const getUserRoute = createRoute({method:"get",path:"/user",request:{query:...},responses:{...}})
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

/**
 * Wraps the request body code in a `request:{...}` block.
 *
 * @param requestBodyCode - Zod schema string for the request body.
 * @returns A string representing the wrapped request object.
 */
export function requestParams(requestBodyCode: string): string {
  return `request:{${requestBodyCode}},`
}

/**
 * Inserts request body validation code into an existing request parameter string.
 *
 * @param requestParams - The existing request parameter string (e.g., 'request:{...}').
 * @param requestBodyCode - The request body code to insert.
 * @returns The combined request validation string with the body inserted.
 */

export function insertRequestBody(requestParams: string, requestBodyCode: string): string {
  return requestParams.replace('request:{', `request:{${requestBodyCode}`)
}

/**
 * Formats request validation parameters into a `request:{...}` object string.
 *
 * @param requestParamsArray - An array of Zod schema strings (e.g., `query`, `params`, etc.).
 * @returns A TypeScript code string representing the `request` object.
 *
 * @example
 * formatRequestObject(['query:z.object({ page: z.string() })'])
 * // → 'request:{query:z.object({ page: z.string() })},'
 */
export function formatRequestObject(requestParamsArray: string[]): string {
  return `request:{${requestParamsArray.join(',')}},`
}
