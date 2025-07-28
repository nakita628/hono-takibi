import { createRoute, z } from '@hono/zod-openapi'

export const getNumberRoute = createRoute({
  method: 'get',
  path: '/number',
  summary: 'zod number',
  description: 'zod number',
  responses: {
    200: {
      description: 'zod number',
      content: {
        'application/json': {
          schema: z.object({
            gt5_number: z.number().gt(5),
            gte5_number: z.number().min(5),
            lt5_number: z.number().lt(5),
            lte5_number: z.number().max(5),
            int_number: z.int(),
            positive_number: z.number().positive(),
            nonnegative_number: z.number(),
            negative_number: z.number().negative(),
            nonpositive_number: z.number(),
            multipleOf5_number: z.int(),
            finite_number: z.number(),
            safe_number: z.number().min(-9007199254740991).max(9007199254740991),
            message_number: z.number().max(5),
          }),
        },
      },
    },
  },
})
