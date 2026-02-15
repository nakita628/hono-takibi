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

export const getUsersRoute = createRoute({
  method: 'get',
  path: '/users',
  operationId: 'getUsers',
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z
            .array(
              z.object({ id: z.string(), name: z.string() }).openapi({ required: ['id', 'name'] }),
            )
            .openapi({}),
        },
      },
    },
  },
})
