import { OpenAPIHono } from '@hono/zod-openapi'
import {
  deleteTodoIdRouteHandler,
  getRouteHandler,
  getTodoIdRouteHandler,
  getTodoRouteHandler,
  postTodoRouteHandler,
  putTodoIdRouteHandler,
} from '@/api/handlers/todo'
import {
  deleteTodoIdRoute,
  getRoute,
  getTodoIdRoute,
  getTodoRoute,
  postTodoRoute,
  putTodoIdRoute,
} from '@/api/routes'

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
}>()

/**
 * Configured API router with all Todo endpoints.
 *
 * @remarks
 * All routes are prefixed with `/api` and follow RESTful conventions.
 */
const api = app
  .basePath('/api')
  .openapi(getRoute, getRouteHandler)
  .openapi(getTodoRoute, getTodoRouteHandler)
  .openapi(postTodoRoute, postTodoRouteHandler)
  .openapi(getTodoIdRoute, getTodoIdRouteHandler)
  .openapi(putTodoIdRoute, putTodoIdRouteHandler)
  .openapi(deleteTodoIdRoute, deleteTodoIdRouteHandler)

/**
 * Type representing the full API application with all routes.
 *
 * @remarks
 * Used by the RPC client to infer request/response types.
 */
export type AppType = typeof api

export default app
