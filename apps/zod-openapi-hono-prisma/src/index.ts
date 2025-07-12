import { OpenAPIHono, z } from '@hono/zod-openapi'
import { swaggerUI } from '@hono/swagger-ui'
import { apiReference } from '@scalar/hono-api-reference'
import {
  getRoute,
  postPostsRoute,
  getPostsRoute,
  putPostsIdRoute,
  deletePostsIdRoute,
} from './route.ts'
import { getRouteHandler } from './handler/indexHandler.ts'
import {
  postPostsRouteHandler,
  getPostsRouteHandler,
  putPostsIdRouteHandler,
  deletePostsIdRouteHandler,
} from './handler/postsHandler.ts'
import { logger } from 'hono/logger'
import { serve } from '@hono/node-server'
import { customError } from './custom-error'

// custom error
customError()

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

if (process.env.NODE_ENV !== 'test') {
  serve({
    fetch: app.fetch,
    port,
  })
}
