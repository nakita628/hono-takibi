import { createRoute, z } from '@hono/zod-openapi'

export const getFizzBuzzRoute = createRoute({
  method: 'get',
  path: '/fizzBuzz',
  summary: 'Get FizzBuzz result',
  description: 'Returns the FizzBuzz result for the given number.',
  request: {
    query: z.object({ number: z.coerce.number().min(1), details: z.stringbool().optional() }),
  },
  responses: {
    200: {
      description: 'FizzBuzz result',
      content: {
        'application/json': {
          schema: z.object({ result: z.string(), number: z.number().optional() }),
        },
      },
    },
    400: {
      description: 'Invalid input',
      content: { 'application/json': { schema: z.object({ error: z.string() }).partial() } },
    },
  },
})
