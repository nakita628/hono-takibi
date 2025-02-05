import { serve } from '@hono/node-server'
import { OpenAPIHono } from '@hono/zod-openapi'
import { swaggerUI } from '@hono/swagger-ui'
import { apiReference } from '@scalar/hono-api-reference'
import {
  deletePostsIdRoute,
  getPostsRoute,
  getRoute,
  postPostsRoute,
  putPostsIdRoute,
} from './openapi'
import { getHandler } from './handler/hono_handler'
import {
  postPostsRouteHandler,
  getPostsRouteHandler,
  putPostsIdRouteHandler,
  deletePostsIdRouteHandler,
} from './handler/posts_handler'

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

const isDev = process.env.NODE_ENV === 'development'

if (isDev) {
  // swagger
  app
    .doc('/doc', {
      openapi: '3.0.0',
      info: {
        title: 'Hono Sample API',
        version: 'v1',
      },
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

  // scalar
  app.get(
    '/docs',
    apiReference({
      theme: 'saturn',
      spec: {
        url: '/doc',
      },
    }),
  )
}

const port = 3000
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port,
})

export default api
