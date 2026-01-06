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
        }),
      details: z
        .stringbool()
        .exactOptional()
        .openapi({
          param: { schema: { type: 'boolean' }, required: false, name: 'details', in: 'query' },
        }),
    }),
  },
  responses: {
    200: {
      description: 'FizzBuzz result',
      content: {
        'application/json': {
          schema: z.object({ result: z.string() }).openapi({ required: ['result'] }),
        },
      },
    },
    400: {
      description: 'Invalid input',
      content: { 'application/json': { schema: z.object({ error: z.string().exactOptional() }) } },
    },
  },
})
