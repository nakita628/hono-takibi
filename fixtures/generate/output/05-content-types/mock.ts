import { OpenAPIHono, createRoute, z, type RouteHandler } from '@hono/zod-openapi'
import { faker } from '@faker-js/faker'

export const postJsonRoute = createRoute({
  method: 'post',
  path: '/json',
  operationId: 'postJson',
  request: {
    body: {
      content: {
        'application/json': {
          schema: z
            .object({ name: z.string(), value: z.int() })
            .openapi({ required: ['name', 'value'] }),
        },
      },
      required: true,
    },
  },
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z.object({ id: z.int(), name: z.string() }).openapi({ required: ['id', 'name'] }),
        },
      },
    },
  },
})

export const postFormRoute = createRoute({
  method: 'post',
  path: '/form',
  operationId: 'postForm',
  request: {
    body: {
      content: {
        'application/x-www-form-urlencoded': {
          schema: z
            .object({ username: z.string(), password: z.string() })
            .openapi({ required: ['username', 'password'] }),
        },
      },
      required: true,
    },
  },
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z.object({ success: z.boolean() }).openapi({ required: ['success'] }),
        },
      },
    },
  },
})

export const postUploadRoute = createRoute({
  method: 'post',
  path: '/upload',
  operationId: 'uploadFile',
  request: {
    body: {
      content: {
        'multipart/form-data': {
          schema: z
            .object({ file: z.file(), description: z.string().exactOptional() })
            .openapi({ required: ['file'] }),
        },
      },
      required: true,
    },
  },
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z.object({ url: z.string() }).openapi({ required: ['url'] }),
        },
      },
    },
  },
})

export const postTextRoute = createRoute({
  method: 'post',
  path: '/text',
  operationId: 'postText',
  request: { body: { content: { 'text/plain': { schema: z.string() } }, required: true } },
  responses: { 200: { description: 'OK', content: { 'text/plain': { schema: z.string() } } } },
})

export const postMultiContentRoute = createRoute({
  method: 'post',
  path: '/multi-content',
  operationId: 'postMultiContent',
  request: {
    body: {
      content: {
        'application/json': {
          schema: z.object({ data: z.string() }).openapi({ required: ['data'] }),
        },
      },
      required: true,
    },
  },
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z.object({ received: z.boolean() }).openapi({ required: ['received'] }),
        },
      },
    },
  },
})

const postJsonRouteHandler: RouteHandler<typeof postJsonRoute> = async (c) => {
  return c.json(
    {
      id: faker.number.int({ min: 1, max: 99999 }),
      name: faker.person.fullName(),
    },
    200,
  )
}

const postFormRouteHandler: RouteHandler<typeof postFormRoute> = async (c) => {
  return c.json(
    {
      success: faker.datatype.boolean(),
    },
    200,
  )
}

const postUploadRouteHandler: RouteHandler<typeof postUploadRoute> = async (c) => {
  return c.json(
    {
      url: faker.internet.url(),
    },
    200,
  )
}

const postTextRouteHandler: RouteHandler<typeof postTextRoute> = async (c) => {
  return c.text(faker.string.alpha({ length: { min: 5, max: 20 } }), 200)
}

const postMultiContentRouteHandler: RouteHandler<typeof postMultiContentRoute> = async (c) => {
  return c.json(
    {
      received: faker.datatype.boolean(),
    },
    200,
  )
}

const app = new OpenAPIHono()

export const api = app
  .openapi(postJsonRoute, postJsonRouteHandler)
  .openapi(postFormRoute, postFormRouteHandler)
  .openapi(postUploadRoute, postUploadRouteHandler)
  .openapi(postTextRoute, postTextRouteHandler)
  .openapi(postMultiContentRoute, postMultiContentRouteHandler)

export type AppType = typeof api

export default app
