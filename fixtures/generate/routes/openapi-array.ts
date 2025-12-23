import { createRoute, z } from '@hono/zod-openapi'

export const getArrayRoute = createRoute({
  method: 'get',
  path: '/array',
  summary: 'zod array',
  description: 'zod array',
  responses: {
    200: {
      description: 'zod array',
      content: {
        'application/json': {
          schema: z
            .object({
              string_array: z
                .array(z.string().optional().openapi({ type: 'string' }))
                .optional()
                .openapi({ type: 'array', items: { type: 'string' } }),
              equivalent: z
                .array(z.string().optional().openapi({ type: 'string' }))
                .optional()
                .openapi({ type: 'array', items: { type: 'string' } }),
              string_optional_array: z
                .array(z.string().optional().openapi({ type: 'string' }))
                .optional()
                .openapi({ type: 'array', items: { type: 'string' } }),
              string_array_optional: z
                .array(z.string().optional().openapi({ type: 'string' }))
                .optional()
                .openapi({ type: 'array', items: { type: 'string' } }),
              nonempty: z
                .array(z.string().optional().openapi({ type: 'string' }))
                .min(1)
                .optional()
                .openapi({ type: 'array', items: { type: 'string' }, minItems: 1 }),
              min5: z
                .array(z.string().optional().openapi({ type: 'string' }))
                .min(5)
                .optional()
                .openapi({ type: 'array', items: { type: 'string' }, minItems: 5 }),
              max5: z
                .array(z.string().optional().openapi({ type: 'string' }))
                .max(5)
                .optional()
                .openapi({ type: 'array', items: { type: 'string' }, maxItems: 5 }),
              length5: z
                .array(z.string().optional().openapi({ type: 'string' }))
                .optional()
                .openapi({ type: 'array', items: { type: 'string' } }),
            })
            .optional()
            .openapi({
              type: 'object',
              properties: {
                string_array: { type: 'array', items: { type: 'string' } },
                equivalent: { type: 'array', items: { type: 'string' } },
                string_optional_array: { type: 'array', items: { type: 'string' } },
                string_array_optional: { type: 'array', items: { type: 'string' } },
                nonempty: { type: 'array', items: { type: 'string' }, minItems: 1 },
                min5: { type: 'array', items: { type: 'string' }, minItems: 5 },
                max5: { type: 'array', items: { type: 'string' }, maxItems: 5 },
                length5: { type: 'array', items: { type: 'string' } },
              },
            }),
        },
      },
    },
  },
})
