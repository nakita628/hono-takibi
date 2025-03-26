import { createRoute, z } from '@hono/zod-openapi'

export const getPrimitiveRoute = createRoute({
  method: 'get',
  path: '/primitive',
  summary: 'zod primitive',
  description: 'zod primitive',
  responses: {
    200: {
      description: 'zod literal',
      content: {
        'application/json': {
          schema: z.object({
            tuna_literal: z.enum(['tuna']),
            twelve_literal: z.literal(12),
            twobig_literal: z.literal(2n),
            true_literal: z.literal(true),
          }),
        },
      },
    },
  },
})
