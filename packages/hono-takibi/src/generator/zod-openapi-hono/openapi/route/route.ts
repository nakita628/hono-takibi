import type { Operation } from '../../../../openapi/index.js'
import { requestParameter } from './params/index.js'
import { createRoute } from './create-route.js'
import { response } from './response/index.js'
import { routeName } from './index.js'
import { escapeStringLiteral } from '../../../../core/utils/escape-string-literal.js'
/**
 * Generates TypeScript code for a Hono route based on OpenAPI operation details
 * @param { string } path - The URL path pattern for the route
 * @param { string } method - The HTTP method (GET, POST, etc.)
 * @param { Operation } operation - The OpenAPI Operation object containing route details
 * @returns { string } Generated TypeScript code string for the route
 *
 * - Generates a complete route definition including:
 *   - Route name based on method and path
 *   - OpenAPI tags for documentation
 *   - HTTP method and path
 *   - Route description
 *   - Security requirements
 *   - Request parameters and body validation
 *   - Response schemas for different status codes
 * - All components are properly escaped and formatted
 * - Handles optional parameters appropriately
 * - Integrates with Hono's createRoute function
 */

export function route(path: string, method: string, operation: Operation): string {
  const { tags, operationId, summary, description, security, parameters, requestBody, responses } =
    operation
  const tagList = tags ? JSON.stringify(tags) : '[]'
  const requestParams = requestParameter(parameters, requestBody)

  const create_args = {
    routeName: routeName(method, path),
    tags: tags ? `tags:${tagList},` : '',
    method: `method:'${method}',`,
    path: `path:'${path}',`,
    operationId: operationId ? `operationId:'${operationId}',` : '',
    summary: summary ? `summary:'${escapeStringLiteral(summary)}',` : '',
    description: description ? `description:'${escapeStringLiteral(description)}',` : '',
    security: security ? `security:${JSON.stringify(security)},` : '',
    requestParams: requestParams ? `${requestParams}` : '',
    responses: responses ? `responses:{${response(responses)}}` : '',
  }
  return createRoute(create_args)
}
