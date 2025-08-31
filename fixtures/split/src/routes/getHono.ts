import { createRoute } from '@hono/zod-openapi'
import { HonoSchema } from '../schemas'

export const getHonoRoute = createRoute({
  tags: ['Hono'],
  method: 'get',
  path: '/hono',
  operationId: 'HonoService_hono',
  responses: {
    200: {
      description: 'The request has succeeded.',
      content: { 'application/json': { schema: HonoSchema } },
    },
  },
})
