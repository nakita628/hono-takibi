import { createRoute, z } from '@hono/zod-openapi'

export const getHonoXRoute = createRoute({
  method: 'get',
  path: '/hono-x',
  tags: ['HonoX'],
  summary: 'HonoX',
  description: 'Simple ping for HonoX',
  operationId: 'getHonoX',
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z
            .strictObject({ message: z.string().openapi({ example: 'HonoX🔥' }) })
            .openapi({ required: ['message'] }),
        },
      },
    },
  },
})
