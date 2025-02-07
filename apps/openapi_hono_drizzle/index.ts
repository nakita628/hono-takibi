import { OpenAPIHono } from '@hono/zod-openapi'
import { swaggerUI } from '@hono/swagger-ui'
import {
  getRoute,
  postPostsRoute,
  getPostsRoute,
  putPostsIdRoute,
  deletePostsIdRoute,
} from './src/routes.ts'
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

const isDev = process.env.NODE_ENV === 'development'

if (isDev) {
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
}

export type AddType = typeof api

export default app
