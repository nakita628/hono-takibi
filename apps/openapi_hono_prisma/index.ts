import { OpenAPIHono } from '@hono/zod-openapi'
import { swaggerUI } from '@hono/swagger-ui'
import { apiReference } from '@scalar/hono-api-reference'
import {
  getRoute,
  postPostsRoute,
  getPostsRoute,
  putPostsIdRoute,
  deletePostsIdRoute,
} from './src/route.ts'
import { getRouteHandler } from './src/handler/index_handler.ts'
import {
  postPostsRouteHandler,
  getPostsRouteHandler,
  putPostsIdRouteHandler,
  deletePostsIdRouteHandler,
} from './src/handler/posts_handler.ts'

const app = new OpenAPIHono()

export const api = app
  .openapi(getRoute, getRouteHandler)
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
      openapi: '3.1.0',
      info: { title: 'Hono API', version: 'v1' },
      tags: [
        { name: 'Hono', description: 'Endpoints related to general Hono operations' },
        {
          name: 'Post',
          description: 'Endpoints for creating, retrieving, updating, and deleting posts',
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

export default app
