import { serve } from '@hono/node-server'
import { OpenAPIHono } from '@hono/zod-openapi'
import { swaggerUI } from '@hono/swagger-ui'
import { deletePostsIdRoute, getPostsRoute, getRoute, postPostsRoute, putPostsIdRoute } from './openapi/index.js'
import { getHandler } from './handler/hono-handler.js'
import {
  deletePostsIdRouteHandler,
  getPostsRouteHandler,
  postPostsRouteHandler,
  putPostsIdRouteHandler,
} from './handler/posts_handler.js'

const app = new OpenAPIHono()

const api = app
  .openapi(getRoute, getHandler)
  .openapi(postPostsRoute, postPostsRouteHandler)
  .openapi(getPostsRoute, getPostsRouteHandler)
  .openapi(putPostsIdRoute, putPostsIdRouteHandler)
  .openapi(deletePostsIdRoute, deletePostsIdRouteHandler)

api.use('*', async (c, next) => {
  try {
    await next()
  } catch (e) {
    return c.json({ error: (e as Error).message }, 500)
  }
})

app
  .doc('/doc', {
    info: {
      title: 'Hono🔥 Takibi API',
      version: 'v1',
    },
    openapi: '3.0.0',
    tags: [
      {
        name: 'Hono',
        description: 'Hono API',
      },
      {
        name: 'Post',
        description: 'Post API',
      },
    ],
  })
  .get('/ui', swaggerUI({ url: '/doc' }))

const port = 3000
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port,
})

export default api
