import { createRoute, z } from '@hono/zod-openapi'

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
} as const)

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
} as const)

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
} as const)

export const postTextRoute = createRoute({
  method: 'post',
  path: '/text',
  operationId: 'postText',
  request: { body: { content: { 'text/plain': { schema: z.string() } }, required: true } },
  responses: { 200: { description: 'OK', content: { 'text/plain': { schema: z.string() } } } },
} as const)

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
        'application/x-www-form-urlencoded': {
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
} as const)
