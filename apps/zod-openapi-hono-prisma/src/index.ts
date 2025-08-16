import { serve } from '@hono/node-server'
import { swaggerUI } from '@hono/swagger-ui'
import { OpenAPIHono, z } from '@hono/zod-openapi'
import { apiReference } from '@scalar/hono-api-reference'
import { hc } from 'hono/client'
import { logger } from 'hono/logger'
import { customError } from './custom-error'
import { getIndexRouteHandler } from './handlers/indexHandler'
import {
  deletePostsIdRouteHandler,
  getPostsRouteHandler,
  postPostsRouteHandler,
  putPostsIdRouteHandler,
} from './handlers/postsHandler'
import {
  deletePostsIdRoute,
  getIndexRoute,
  getPostsRoute,
  postPostsRoute,
  putPostsIdRoute,
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

app.use('*', logger())
app.use('*', (c, next) => {
  console.log(`${c.req.method} ${c.req.url}`)
  return next()
})

app.use('*', async (c, next) => {
  try {
    await next()
  } catch (e) {
    return c.json({ error: e instanceof Error ? e.message : String(e) }, 500)
  }
})

export const api = app
  .openapi(getIndexRoute, getIndexRouteHandler)
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

export const client = hc<typeof api>('/')

const port = 3000

if (process.env.NODE_ENV !== 'test') {
  serve({
    fetch: app.fetch,
    port,
  })
}

// custom error
customError()
