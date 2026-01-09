import { createRoute, z } from '@hono/zod-openapi'

export const getHonoRoute = createRoute({
  method: 'get',
  path: '/hono',
  tags: ['Hono'],
  summary: 'Hono',
  description: 'Simple ping for Hono',
  operationId: 'getHono',
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z
            .strictObject({ message: z.string().openapi({ example: 'Hono🔥' }) })
            .openapi({ required: ['message'] }),
        },
      },
    },
  },
})
