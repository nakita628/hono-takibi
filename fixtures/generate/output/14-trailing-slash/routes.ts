import { createRoute, z } from '@hono/zod-openapi'

export const getApiReverseChibanIndexRoute = createRoute({
  method: 'get',
  path: '/api/reverseChiban/',
  summary: 'Reverse Chiban (trailing slash)',
  operationId: 'getApiReverseChibanIndex',
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z.object({ result: z.string() }).openapi({ required: ['result'] }),
        },
      },
    },
  },
})

export const getApiReverseChibanRoute = createRoute({
  method: 'get',
  path: '/api/reverseChiban',
  summary: 'Reverse Chiban (no trailing slash)',
  operationId: 'getApiReverseChiban',
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z.object({ result: z.string() }).openapi({ required: ['result'] }),
        },
      },
    },
  },
})

export const getPostsIndexRoute = createRoute({
  method: 'get',
  path: '/posts/',
  summary: 'List posts (trailing slash only)',
  operationId: 'getPostsIndex',
  request: {
    query: z.object({
      limit: z
        .int()
        .exactOptional()
        .openapi({
          param: { name: 'limit', in: 'query', required: false, schema: { type: 'integer' } },
        }),
    }),
  },
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z
            .object({ items: z.array(z.string()), total: z.int() })
            .openapi({ required: ['items', 'total'] }),
        },
      },
    },
  },
})

export const postPostsIndexRoute = createRoute({
  method: 'post',
  path: '/posts/',
  summary: 'Create post (trailing slash only)',
  operationId: 'postPostsIndex',
  request: {
    body: {
      content: {
        'application/json': {
          schema: z.object({ title: z.string() }).openapi({ required: ['title'] }),
        },
      },
      required: true,
    },
  },
  responses: {
    201: {
      description: 'Created',
      content: {
        'application/json': {
          schema: z
            .object({ id: z.int(), title: z.string() })
            .openapi({ required: ['id', 'title'] }),
        },
      },
    },
  },
})

export const getUsersIdIndexRoute = createRoute({
  method: 'get',
  path: '/users/{id}/',
  summary: 'Get user (trailing slash with path param)',
  operationId: 'getUsersIdIndex',
  request: {
    params: z.object({
      id: z
        .string()
        .openapi({ param: { name: 'id', in: 'path', required: true, schema: { type: 'string' } } }),
    }),
  },
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z
            .object({ id: z.string(), name: z.string() })
            .openapi({ required: ['id', 'name'] }),
        },
      },
    },
  },
})

export const getItemsIndexRoute = createRoute({
  method: 'get',
  path: '/items/',
  summary: 'List items (trailing slash only)',
  operationId: 'getItemsIndex',
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z.object({ items: z.array(z.string()) }).openapi({ required: ['items'] }),
        },
      },
    },
  },
})
