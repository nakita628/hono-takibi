import { swaggerUI } from '@hono/swagger-ui'
import { OpenAPIHono } from '@hono/zod-openapi'
import {
  deleteTodoIdRouteHandler,
  getRouteHandler,
  getTodoIdRouteHandler,
  getTodoRouteHandler,
  postTodoRouteHandler,
  putTodoIdRouteHandler,
} from '@/api/handlers/todo'
import { configureCustomErrors, makeProblemDetails, makeZodErrors } from '@/api/lib/error-config'
import {
  deleteTodoIdRoute,
  getRoute,
  getTodoIdRoute,
  getTodoRoute,
  postTodoRoute,
  putTodoIdRoute,
} from '@/api/routes'

// Initialize custom error messages
configureCustomErrors()

/**
 * OpenAPI Hono application instance for the Todo API.
 *
 * ```mermaid
 * flowchart LR
 *   subgraph API["/api"]
 *     direction TB
 *     Health["GET /"]
 *     List["GET /todo"]
 *     Create["POST /todo"]
 *     Read["GET /todo/:id"]
 *     Update["PUT /todo/:id"]
 *     Delete["DELETE /todo/:id"]
 *   end
 * ```
 */
const app = new OpenAPIHono<{
  Bindings: {
    DB: D1Database
  }
}>({
  defaultHook: (result, c) => {
    if (!result.success) {
      const errors = makeZodErrors(result.error)
      return c.json(makeProblemDetails(errors), 422)
    }
  },
}).basePath('/api')

/**
 * Configured API router with all Todo endpoints.
 *
 * @remarks
 * All routes are prefixed with `/api` and follow RESTful conventions.
 */
const api = app
  .openapi(getRoute, getRouteHandler)
  .openapi(getTodoRoute, getTodoRouteHandler)
  .openapi(postTodoRoute, postTodoRouteHandler)
  .openapi(getTodoIdRoute, getTodoIdRouteHandler)
  .openapi(putTodoIdRoute, putTodoIdRouteHandler)
  .openapi(deleteTodoIdRoute, deleteTodoIdRouteHandler)

// Swagger UI (development only)
if (import.meta.env.DEV) {
  app.doc('/doc', {
    openapi: '3.0.0',
    info: {
      title: 'Takibi Todo API',
      version: '1.0.0',
    },
  })
  app.get('/swagger', swaggerUI({ url: '/api/doc' }))
}

/**
 * Type representing the full API application with all routes.
 *
 * @remarks
 * Used by the RPC client to infer request/response types.
 */
export type AppType = typeof api

export default app
