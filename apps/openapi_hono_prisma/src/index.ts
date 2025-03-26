import { OpenAPIHono } from '@hono/zod-openapi'
import { swaggerUI } from '@hono/swagger-ui'
import { apiReference } from '@scalar/hono-api-reference'
import {
  getRoute,
  postPostsRoute,
  getPostsRoute,
  putPostsIdRoute,
  deletePostsIdRoute,
} from './route.ts'
import { getRouteHandler } from './handler/index_handler.ts'
import {
  postPostsRouteHandler,
  getPostsRouteHandler,
  putPostsIdRouteHandler,
  deletePostsIdRouteHandler,
} from './handler/posts_handler.ts'
import { logger } from 'hono/logger'
import { serve } from '@hono/node-server'

const app = new OpenAPIHono()

app.use('*', logger())
app.use('*', (c, next) => {
  console.log(`${c.req.method} ${c.req.url}`)
  return next()
})

app.use('*', async (c, next) => {
  try {
    await next()
  } catch (e) {
    return c.json({ error: (e as Error).message }, 500)
  }
})

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

if (process.env.NODE_ENV === 'development') {
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

const port = 3000
console.log(`Server is running on http://localhost:${port}`)

if (process.env.NODE_ENV !== 'test') {
  serve({
    fetch: app.fetch,
    port,
  })
}
