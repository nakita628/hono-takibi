import { swaggerUI } from '@hono/swagger-ui'
import { OpenAPIHono, z } from '@hono/zod-openapi'
import { customError } from './custom-error'
import {
  deleteTodoIdRouteHandler,
  getHandler,
  getTodoIdRouteHandler,
  getTodoRouteHandler,
  postTodoRouteHandler,
  putTodoIdRouteHandler,
} from './handlers'
import {
  deleteTodoIdRoute,
  getRoute,
  getTodoIdRoute,
  getTodoRoute,
  postTodoRoute,
  putTodoIdRoute,
} from './routes'

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
  .openapi(getRoute, getHandler)
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
