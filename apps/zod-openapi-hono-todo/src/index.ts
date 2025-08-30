import { swaggerUI } from '@hono/swagger-ui'
import { OpenAPIHono, z } from '@hono/zod-openapi'
import { customError } from './custom-error'
import { getIndexRouteHandler } from './handlers/indexHandler.ts'
import {
  deleteTodoIdRouteHandler,
  getTodoIdRouteHandler,
  getTodoRouteHandler,
  postTodoRouteHandler,
  putTodoIdRouteHandler,
} from './handlers/todoHandler.ts'
import {
  deleteTodoIdRoute,
  getIndexRoute,
  getTodoIdRoute,
  getTodoRoute,
  postTodoRoute,
  putTodoIdRoute,
} from './routes.ts'

const app = new OpenAPIHono({
  defaultHook: (result, c) => {
    if (!result.success) {
      return c.json(
        {
          ok: false,
          errors: z.treeifyError(result.error),
        },
        422,
      )
    }
  },
})

export const api = app
  .openapi(getIndexRoute, getIndexRouteHandler)
  .openapi(getTodoRoute, getTodoRouteHandler)
  .openapi(postTodoRoute, postTodoRouteHandler)
  .openapi(getTodoIdRoute, getTodoIdRouteHandler)
  .openapi(putTodoIdRoute, putTodoIdRouteHandler)
  .openapi(deleteTodoIdRoute, deleteTodoIdRouteHandler)

customError()

if (process.env.NODE_ENV === 'development') {
  app
    .doc('/doc', {
      openapi: '3.0.0',
      info: { title: 'Hono Todo API', version: '0.0.0' },
      tags: [{ name: 'Health' }, { name: 'Todos' }],
    })
    .get('/ui', swaggerUI({ url: '/doc' }))
}

export type AddType = typeof api

export default app
