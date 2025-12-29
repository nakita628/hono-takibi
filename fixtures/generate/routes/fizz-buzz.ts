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
          param: {
            schema: { type: 'number', minimum: 1 },
            required: true,
            name: 'number',
            in: 'query',
          },
          type: 'number',
          minimum: 1,
        }),
      details: z
        .stringbool()
        .optional()
        .openapi({
          param: { schema: { type: 'boolean' }, required: false, name: 'details', in: 'query' },
          type: 'boolean',
        }),
    }),
  },
  responses: {
    200: {
      description: 'FizzBuzz result',
      content: {
        'application/json': {
          schema: z
            .object({ result: z.string().openapi({ type: 'string' }) })
            .openapi({
              type: 'object',
              properties: { result: { type: 'string' } },
              required: ['result'],
            }),
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
            .openapi({ type: 'object', properties: { error: { type: 'string' } } }),
        },
      },
    },
  },
})
