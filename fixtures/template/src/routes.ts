import { createRoute, z } from '@hono/zod-openapi'

export const getHealthRoute = createRoute({
  method: 'get',
  path: '/health',
  operationId: 'getHealth',
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z.object({ status: z.string() }).openapi({ required: ['status'] }),
        },
      },
    },
  },
})

export const getHealthTestRoute = createRoute({
  method: 'get',
  path: '/health/test',
  operationId: 'getHealthTest',
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z.object({ status: z.string() }).openapi({ required: ['status'] }),
        },
      },
    },
  },
})

export const postHealthTest2Route = createRoute({
  method: 'post',
  path: '/health/test2',
  operationId: 'postHealthTest2',
  request: {
    body: {
      content: {
        'application/json': {
          schema: z.object({
            status: z.string().exactOptional(),
            required: z.any().exactOptional().openapi({ '0': 'status' }),
          }),
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
          schema: z.object({ status: z.string() }).openapi({ required: ['status'] }),
        },
      },
    },
  },
})

export const getHealthIdRoute = createRoute({
  method: 'get',
  path: '/health/{id}',
  operationId: 'getHealthById',
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
          schema: z.object({ status: z.string() }).openapi({ required: ['status'] }),
        },
      },
    },
  },
})
