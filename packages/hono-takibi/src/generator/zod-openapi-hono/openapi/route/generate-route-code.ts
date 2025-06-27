import type { OpenAPIPaths } from '../../../../openapi/index.js'
import { isHttpMethod } from '../../../../core/validator/is-http-method.js'
import { route } from './index.js'
import { isOperation } from '../../../../core/validator/is-operation.js'

/**
 * Generates TypeScript code for all valid routes based on OpenAPI paths
 * @param { OpenAPIPaths } openAPIPaths - OpenAPI paths object containing route definitions
 * @returns { string } Generated TypeScript code string for all valid routes
 *
 * - Processes each path and HTTP method combination
 * - Validates HTTP methods and operation objects
 * - Skips invalid or unsupported route definitions
 * - Handles:
 *   - Path parameters
 *   - Query parameters
 *   - Request bodies
 *   - Response schemas
 * - Generates type-safe route handlers using zod validation
 * - Combines all routes with proper spacing
 */
export function generateRouteCode(openAPIPaths: OpenAPIPaths): string {
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
