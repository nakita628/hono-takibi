import { swaggerUI } from '@hono/swagger-ui'
import { OpenAPIHono } from '@hono/zod-openapi'
import {
  deleteTodoIdRouteHandler,
  getTodoIdRouteHandler,
  getTodoRouteHandler,
  postTodoRouteHandler,
  putTodoIdRouteHandler,
} from '@/api/handlers/todo'
import { configureCustomErrors, makeProblemDetails, makeZodErrors } from '@/api/lib/error-config'
import {
  deleteTodoIdRoute,
  getTodoIdRoute,
  getTodoRoute,
  postTodoRoute,
  putTodoIdRoute,
} from '@/api/routes'

configureCustomErrors()

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

const api = app
  .basePath('/api')
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
