import { swaggerUI } from '@hono/swagger-ui'
import { OpenAPIHono } from '@hono/zod-openapi'
import {
  deleteApiTodoIdRouteHandler,
  getApiRouteHandler,
  getApiTodoIdRouteHandler,
  getApiTodoRouteHandler,
  postApiTodoRouteHandler,
  putApiTodoIdRouteHandler,
} from '@/api/handlers/todo'
import { configureCustomErrors, makeProblemDetails, makeZodErrors } from '@/api/lib/error-config'
import {
  deleteApiTodoIdRoute,
  getApiRoute,
  getApiTodoIdRoute,
  getApiTodoRoute,
  postApiTodoRoute,
  putApiTodoIdRoute,
} from '@/api/routes'

// Initialize custom error messages
configureCustomErrors()

/**
 * OpenAPI Hono application instance for the Todo API.
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
})

/**
 * Configured API router with all Todo endpoints.
 */
const api = app
  .openapi(getApiRoute, getApiRouteHandler)
  .openapi(getApiTodoRoute, getApiTodoRouteHandler)
  .openapi(postApiTodoRoute, postApiTodoRouteHandler)
  .openapi(getApiTodoIdRoute, getApiTodoIdRouteHandler)
  .openapi(putApiTodoIdRoute, putApiTodoIdRouteHandler)
  .openapi(deleteApiTodoIdRoute, deleteApiTodoIdRouteHandler)

// Swagger UI (development only)
if (import.meta.env.DEV) {
  app.doc('/api/doc', {
    openapi: '3.0.0',
    info: {
      title: 'Takibi Vue Todo API',
      version: '1.0.0',
    },
  })
  app.get('/api/swagger', swaggerUI({ url: '/api/doc' }))
}

/**
 * Type representing the full API application with all routes.
 */
export type AppType = typeof api

export default app
