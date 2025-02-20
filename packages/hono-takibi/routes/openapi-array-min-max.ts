import { createRoute, z } from '@hono/zod-openapi'

export const getTupleRoute = createRoute({
  tags: [],
  method: 'get',
  path: '/tuple',
  summary: 'zod tuple',
  description: 'zod tuple',
  responses: {
    200: {
      description: 'Object with user data.',
      content: {
        'application/json': {
          schema: z
            .array(z.union([z.string(), z.number(), z.object({ pointsScored: z.number() })]))
            .max(3)
            .min(3),
        },
      },
    },
    204: { description: 'No content - successful operation' },
  },
})
