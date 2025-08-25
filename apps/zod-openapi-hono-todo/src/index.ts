import { swaggerUI } from '@hono/swagger-ui'
import { OpenAPIHono } from '@hono/zod-openapi'
import { getIndexRouteHandler } from './handlers/indexHandler.ts'
import {
  getTodoRouteHandler,
  postTodoRouteHandler,
  getTodoIdRouteHandler,
  putTodoIdRouteHandler,
  deleteTodoIdRouteHandler,
} from './handlers/todoHandler.ts'
import {
  getIndexRoute,
  getTodoRoute,
  postTodoRoute,
  getTodoIdRoute,
  putTodoIdRoute,
  deleteTodoIdRoute,
} from './routes.ts'

const app = new OpenAPIHono()

export const api = app
  .openapi(getIndexRoute, getIndexRouteHandler)
  .openapi(getTodoRoute, getTodoRouteHandler)
  .openapi(postTodoRoute, postTodoRouteHandler)
  .openapi(getTodoIdRoute, getTodoIdRouteHandler)
  .openapi(putTodoIdRoute, putTodoIdRouteHandler)
  .openapi(deleteTodoIdRoute, deleteTodoIdRouteHandler)

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
