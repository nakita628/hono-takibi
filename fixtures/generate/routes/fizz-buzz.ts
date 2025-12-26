import { createRoute, z } from '@hono/zod-openapi'

export const getFizzbuzzRoute = createRoute({
  method: 'get',
  path: '/fizzbuzz',
  summary: 'Get FizzBuzz result',
  description: 'Returns the FizzBuzz result for the given number.',
  request: {
    query: z.object({
      number: z.coerce
        .number()
        .min(1)
        .openapi({
          param: { name: 'number', in: 'query', required: true },
          type: 'number',
          minimum: 1,
        }),
      details: z
        .stringbool()
        .optional()
        .openapi({ param: { name: 'details', in: 'query', required: false }, type: 'boolean' }),
    }),
  },
  responses: {
    200: {
      description: 'FizzBuzz result',
      content: {
        'application/json': {
          schema: z
            .object({ result: z.string().optional().openapi({ type: 'string' }) })
            .optional()
            .openapi({ type: 'object', properties: { result: { type: 'string' } } }),
        },
      },
    },
    400: {
      description: 'Invalid input',
      content: {
        'application/json': {
          schema: z
            .object({ error: z.string().openapi({ type: 'string' }) })
            .partial()
            .optional()
            .openapi({ type: 'object', properties: { error: { type: 'string' } } }),
        },
      },
    },
  },
})
