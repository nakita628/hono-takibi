import { createRoute, z } from '@hono/zod-openapi'

export const getHonoXRoute = createRoute({
  tags: ['HonoX'],
  method: 'get',
  path: '/hono-x',
  operationId: 'getHonoX',
  summary: 'HonoX',
  description: 'Simple ping for HonoX',
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z.strictObject({ message: z.string().openapi({ example: 'HonoX🔥' }) }),
        },
      },
    },
  },
})
