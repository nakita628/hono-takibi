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
          schema: z
            .object({
              tuna_literal: z.literal('tuna'),
              twelve_literal: z.literal(12),
              twobig_literal: z.literal(2),
              true_literal: z.literal(true),
            })
            .openapi({
              required: ['tuna_literal', 'twelve_literal', 'twobig_literal', 'true_literal'],
            }),
        },
      },
    },
  },
})
