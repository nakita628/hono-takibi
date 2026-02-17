import { swaggerUI } from '@hono/swagger-ui'
import { OpenAPIHono } from '@hono/zod-openapi'
import { apiReference } from '@scalar/hono-api-reference'
import { createMarkdownFromOpenApi } from '@scalar/openapi-to-markdown'
import {
  deleteTasksTaskIdRouteHandler,
  getRouteHandler,
  getTasksRouteHandler,
  getTasksTaskIdRouteHandler,
  postTasksRouteHandler,
  putTasksTaskIdRouteHandler,
} from './handlers'
import {
  deleteTasksTaskIdRoute,
  getRoute,
  getTasksRoute,
  getTasksTaskIdRoute,
  postTasksRoute,
  putTasksTaskIdRoute,
} from './routes'

const app = new OpenAPIHono()

export const api = app
  .openapi(getRoute, getRouteHandler)
  .openapi(getTasksRoute, getTasksRouteHandler)
  .openapi(postTasksRoute, postTasksRouteHandler)
  .openapi(getTasksTaskIdRoute, getTasksTaskIdRouteHandler)
  .openapi(putTasksTaskIdRoute, putTasksTaskIdRouteHandler)
  .openapi(deleteTasksTaskIdRoute, deleteTasksTaskIdRouteHandler)

if (process.env.NODE_ENV === 'development') {
  app
    .doc('/doc', {
      openapi: '3.1.0',
      info: { title: 'Crude CRUD API', version: '1.0.0' },
    })
    .get('/ui', swaggerUI({ url: '/api/doc' }))
    .get('/scalar', apiReference({ url: '/api/doc' }))
    .get('/md', async (c) => {
      const spec = app.getOpenAPI31Document({
        openapi: '3.1.0',
        info: { title: 'Crude CRUD API', version: '1.0.0' },
      })
      const markdown = await createMarkdownFromOpenApi(JSON.stringify(spec))
      return c.text(markdown)
    })
}

export default app
