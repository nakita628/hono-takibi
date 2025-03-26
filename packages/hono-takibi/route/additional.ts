import { createRoute, z } from '@hono/zod-openapi'

export const getPassthroughRoute = createRoute({
  method: 'get',
  path: '/passthrough',
  operationId: 'undefined',
  summary: 'zod passthrough',
  description: 'zod passthrough',
  responses: {
    200: {
      description: 'zod passthrough',
      content: { 'application/json': { schema: z.object({ test: z.string() }).passthrough() } },
    },
  },
})
