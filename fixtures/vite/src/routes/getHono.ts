import { createRoute, z } from '@hono/zod-openapi'

export const getHonoRoute = createRoute({
  tags: ['Hono'],
  method: 'get',
  path: '/hono',
  operationId: 'getHono',
  summary: 'Hono',
  description: 'Simple ping for Hono',
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z.strictObject({ message: z.string().openapi({ example: 'Hono🔥' }) }),
        },
      },
    },
  },
})
