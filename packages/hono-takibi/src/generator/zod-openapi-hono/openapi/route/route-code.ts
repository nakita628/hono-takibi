import { isHttpMethod, isOperation } from '../../../../validator/index.js'
import type { OpenAPIPaths } from '../../../../openapi/index.js'
import { route } from './index.js'

/**
 * Generates TypeScript code for all valid Hono routes from OpenAPI paths.
 *
 * @param openAPIPaths - The OpenAPI paths object.
 * @returns A string containing all generated route definitions.
 *
 * @remarks
 * - Filters only valid HTTP methods and OpenAPI operations.
 * - Ignores `parameters` keys, undefined values, strings, and arrays.
 * - Uses `route(...)` to generate code for each valid route.
 * - Returns all generated routes joined by newlines.
 */
export function routeCode(openAPIPaths: OpenAPIPaths): string {
  const routes: string[] = []
  // 1. flattening and processing OpenAPI paths
  for (const [path, pathItem] of Object.entries(openAPIPaths)) {
    // 2.skip if path definition does not exist
    if (!pathItem) continue
    // 3. loop through HTTP methods for each path
    for (const [method, pathItemValue] of Object.entries(pathItem)) {
      // 3.1. skip parameters key and undefined operations
      if (method === 'parameters' || !pathItemValue) continue
      // 3.2. check if the method is an HTTP method
      if (!isHttpMethod(method)) throw new Error('Invalid HTTP method')
      // 3.3 exclude the possibility of string or Parameter[]
      if (typeof pathItemValue === 'string' || Array.isArray(pathItemValue)) continue
      // 3.4 at this point, pathItemValue is only a possibility for Operation
      if (!isOperation(pathItemValue)) continue
      // 3.5 generating the root code and adding it to the array
      routes.push(route(path, method, pathItemValue))
    }
  }
  // 4. exclude invalid routes and join them with a newline
  return routes.filter(Boolean).join('\n\n')
}
