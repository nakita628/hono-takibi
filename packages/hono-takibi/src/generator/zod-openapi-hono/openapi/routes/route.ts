import { makeCallbacks, makeOperationResponses, makeRequest } from '../../../../helper/openapi.js'
import type { Operation } from '../../../../openapi/index.js'
import {
  methodPath,
} from '../../../../utils/index.js'

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
  const operationCode = {
    tags: operation.tags ? `tags:${JSON.stringify(operation.tags)},` : '',
    summary: operation.summary ? `summary:${JSON.stringify(operation.summary)},` : '',
    description: operation.description
      ? `description:${JSON.stringify(operation.description)},`
      : '',
    externalDocs: operation.externalDocs
      ? `externalDocs:${JSON.stringify(operation.externalDocs)},`
      : '',
    operationId: operation.operationId ? `operationId:'${operation.operationId}',` : '',
    request: makeRequest(operation.parameters, operation.requestBody) ? `request:${makeRequest(operation.parameters, operation.requestBody)},` : '',
    responses: operation.responses
      ? `responses:${makeOperationResponses(operation.responses)},`
      : '',
    callbacks: operation.callbacks ? `callbacks:{${makeCallbacks(operation.callbacks)}},` : '',
    deprecated: operation.deprecated ? `deprecated:${JSON.stringify(operation.deprecated)},` : '',
    security: operation.security ? `security:${JSON.stringify(operation.security)},` : '',
    servers: operation.servers ? `servers:${JSON.stringify(operation.servers)},` : '',
  }
  
  const properties = [
    `method:'${method}',`,
    `path:'${path}',`,
    ...Object.values(operationCode)
  ].join('')

  return `export const ${methodPath(method, path)}Route=createRoute({${properties}})`
}
