import {
  makeCallbacks,
  makeOperationResponses,
  makeRequest,
} from '../../../../helper/index.js'
import type {  Operation } from '../../../../openapi/index.js'
import { methodPath } from '../../../../utils/index.js'

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
export function createRoute(path: string, method: string, operation: Operation): string {
  const properties = [
    `method:'${method}'`,
    `path:'${path}'`,
    operation.tags ? `tags:${JSON.stringify(operation.tags)}` : undefined,
    operation.summary ? `summary:${JSON.stringify(operation.summary)}` : undefined,
    operation.description ? `description:${JSON.stringify(operation.description)}` : undefined,
    operation.externalDocs ? `externalDocs:${JSON.stringify(operation.externalDocs)}` : undefined,
    operation.operationId ? `operationId:'${operation.operationId}'` : undefined,
    makeRequest(operation.parameters, operation.requestBody)
      ? `request:${makeRequest(operation.parameters, operation.requestBody)}`
      : undefined,
    operation.responses ? `responses:${makeOperationResponses(operation.responses)}` : undefined,
    operation.callbacks ? makeCallbacks(operation.callbacks) : undefined,
    operation.deprecated ? `deprecated:${JSON.stringify(operation.deprecated)}` : undefined,
    operation.security ? `security:${JSON.stringify(operation.security)}` : undefined,
    operation.servers ? `servers:${JSON.stringify(operation.servers)}` : undefined,
  ]
    .filter((v) => v !== undefined)
    .join(',')

  return `export const ${methodPath(method, path)}Route=createRoute({${properties}})`
}

// Test run
// pnpm vitest run ./packages/hono-takibi/src/generator/zod-openapi-hono/openapi/routes/create-route.ts
if (import.meta.vitest) {
  const { describe, expect, it } = import.meta.vitest

  describe('createRoute', () => {
    it.concurrent('createRoute Test', () => {
      const result = createRoute('/posts', 'post', {
        operationId: 'updatePost',
        tags: ['Hono'],
        responses: {
          '200': {
            description: 'Hono',
            content: {
              'application/json': {
                schema: {
                  name: 'root',
                  type: 'object',
                  properties: {
                    message: {
                      name: 'message',
                      type: 'string',
                      example: 'Hono',
                    },
                  },
                  required: ['message'],
                },
              },
            },
          },
        },
      })
      const expected = `export const postPostsRoute=createRoute({method:'post',path:'/posts',tags:["Hono"],operationId:'updatePost',responses:{200:{description:"Hono",content:{'application/json':{schema:z.object({message:z.string().openapi({"name":"message","example":"Hono"})}).openapi({"name":"root","required":["message"]})}}}}})`
      expect(result).toBe(expected)
    })
  })
}
