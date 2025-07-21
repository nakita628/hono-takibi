import type { Operation } from '../../../../openapi/index.js'
import { requestParameter } from './params/index.js'
import { createRoute } from './create-route.js'
import { response } from './response/index.js'
import { routeName } from './index.js'
import { escapeStringLiteral } from '../../../../core/utils/escape-string-literal.js'

/**
 * Generates TypeScript code for a Hono route from OpenAPI operation details.
 *
 * @param path - The route path (e.g., `/users/{id}`).
 * @param method - The HTTP method (e.g., `get`, `post`).
 * @param operation - The OpenAPI Operation object.
 * @returns A TypeScript code string defining the route via `createRoute`.
 *
 * @remarks
 * - Combines tags, method, path, operationId, summary, description, security, request, and response.
 * - Escapes all string literals.
 * - Produces a complete `.openapi()` route definition with validation.
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
