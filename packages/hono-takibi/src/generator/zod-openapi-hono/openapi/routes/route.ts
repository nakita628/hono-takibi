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
  const requestCode = makeRequest(operation.parameters, operation.requestBody)
  const properties = [
    `method:'${method}'`,
    `path:'${path}'`,
    operation.tags ? `tags:${JSON.stringify(operation.tags)}` : undefined,
    operation.summary ? `summary:${JSON.stringify(operation.summary)}` : undefined,
    operation.description ? `description:${JSON.stringify(operation.description)}` : undefined,
    operation.externalDocs ? `externalDocs:${JSON.stringify(operation.externalDocs)}` : undefined,
    operation.operationId ? `operationId:'${operation.operationId}'` : undefined,
    requestCode ? `request:${requestCode}` : undefined,
    operation.responses ? `responses:${makeOperationResponses(operation.responses)}` : undefined,
    operation.callbacks ? `callbacks:{${makeCallbacks(operation.callbacks)}}` : undefined,
    operation.deprecated ? `deprecated:${JSON.stringify(operation.deprecated)}` : undefined,
    operation.security ? `security:${JSON.stringify(operation.security)}` : undefined,
    operation.servers ? `servers:${JSON.stringify(operation.servers)}` : undefined,
  ]
    .filter((v) => v !== undefined)
    .join(',')

  return `export const ${methodPath(method, path)}Route=createRoute({${properties}})`
}
