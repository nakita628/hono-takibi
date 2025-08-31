import { createRoute } from '@hono/zod-openapi'
import { HonoXSchema } from '../schemas'

export const getHonoxRoute = createRoute({
  tags: ['Hono'],
  method: 'get',
  path: '/honox',
  operationId: 'HonoXService_honox',
  responses: {
    200: {
      description: 'The request has succeeded.',
      content: { 'application/json': { schema: HonoXSchema } },
    },
  },
})
