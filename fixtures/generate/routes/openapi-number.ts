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
          schema: z
            .object({
              gt5_number: z
                .number()
                .gt(5)
                .optional()
                .openapi({ type: 'number', minimum: 5, exclusiveMinimum: true }),
              gte5_number: z.number().min(5).optional().openapi({ type: 'number', minimum: 5 }),
              lt5_number: z
                .number()
                .lt(5)
                .optional()
                .openapi({ type: 'number', maximum: 5, exclusiveMaximum: true }),
              lte5_number: z.number().max(5).optional().openapi({ type: 'number', maximum: 5 }),
              int_number: z.int().optional().openapi({ type: 'integer' }),
              positive_number: z
                .number()
                .positive()
                .optional()
                .openapi({ type: 'number', minimum: 0, exclusiveMinimum: true }),
              nonnegative_number: z
                .number()
                .min(0)
                .optional()
                .openapi({ type: 'number', minimum: 0 }),
              negative_number: z
                .number()
                .negative()
                .optional()
                .openapi({ type: 'number', maximum: 0, exclusiveMaximum: true }),
              nonpositive_number: z
                .number()
                .max(0)
                .optional()
                .openapi({ type: 'number', maximum: 0 }),
              multipleOf5_number: z.int().optional().openapi({ type: 'integer' }),
              finite_number: z.number().optional().openapi({ type: 'number' }),
              safe_number: z
                .number()
                .min(-9007199254740991)
                .max(9007199254740991)
                .optional()
                .openapi({ type: 'number', minimum: -9007199254740991, maximum: 9007199254740991 }),
              message_number: z.number().max(5).optional().openapi({ type: 'number', maximum: 5 }),
            })
            .optional()
            .openapi({
              type: 'object',
              properties: {
                gt5_number: { type: 'number', minimum: 5, exclusiveMinimum: true },
                gte5_number: { type: 'number', minimum: 5 },
                lt5_number: { type: 'number', maximum: 5, exclusiveMaximum: true },
                lte5_number: { type: 'number', maximum: 5 },
                int_number: { type: 'integer' },
                positive_number: { type: 'number', minimum: 0, exclusiveMinimum: true },
                nonnegative_number: { type: 'number', minimum: 0 },
                negative_number: { type: 'number', maximum: 0, exclusiveMaximum: true },
                nonpositive_number: { type: 'number', maximum: 0 },
                multipleOf5_number: { type: 'integer' },
                finite_number: { type: 'number' },
                safe_number: {
                  type: 'number',
                  minimum: -9007199254740991,
                  maximum: 9007199254740991,
                },
                message_number: { type: 'number', maximum: 5 },
              },
            }),
        },
      },
    },
  },
})
