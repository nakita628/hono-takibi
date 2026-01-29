import { OpenAPIHono } from '@hono/zod-openapi'
import {
  deleteTodoIdRouteHandler,
  getTodoIdRouteHandler,
  getTodoRouteHandler,
  postTodoRouteHandler,
  putTodoIdRouteHandler,
} from '@/api/handlers/todo'
import { configureCustomErrors, formatZodErrors } from '@/api/lib/error-config'
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
      return c.json(formatZodErrors(result), 422)
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

export type AppType = typeof api

export default app
