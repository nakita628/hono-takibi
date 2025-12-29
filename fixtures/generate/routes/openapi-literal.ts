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
              tuna_literal: z.literal('tuna').openapi({ type: 'string', enum: ['tuna'] }),
              twelve_literal: z.literal(12).openapi({ type: 'number', enum: [12] }),
              twobig_literal: z.literal(2).openapi({ type: 'bigint', enum: [2] }),
              true_literal: z.literal(true).openapi({ type: 'boolean', enum: [true] }),
            })
            .openapi({
              type: 'object',
              properties: {
                tuna_literal: { type: 'string', enum: ['tuna'] },
                twelve_literal: { type: 'number', enum: [12] },
                twobig_literal: { type: 'bigint', enum: [2] },
                true_literal: { type: 'boolean', enum: [true] },
              },
              required: ['tuna_literal', 'twelve_literal', 'twobig_literal', 'true_literal'],
            }),
        },
      },
    },
  },
})
