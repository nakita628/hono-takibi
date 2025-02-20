import { createRoute, z } from '@hono/zod-openapi'

export const getBooleanRoute = createRoute({
  tags: [],
  method: 'get',
  path: '/boolean',
  summary: 'zod boolean',
  description: 'zod boolean',
  responses: {
    200: {
      description: 'zod boolean',
      content: { 'application/json': { schema: z.object({ isActive: z.boolean() }) } },
    },
  },
})
