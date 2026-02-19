import { createRoute, z } from '@hono/zod-openapi'

export const FizzBuzzResultSchema = z
  .object({ result: z.string(), number: z.number().exactOptional() })
  .openapi({ required: ['result'] })
  .openapi('FizzBuzzResult')

export const ErrorResponseSchema = z
  .object({ error: z.string().exactOptional() })
  .openapi('ErrorResponse')

export const getFizzBuzzRoute = createRoute({
  method: 'get',
  path: '/fizzBuzz',
  summary: 'Get FizzBuzz result',
  description: 'Returns the FizzBuzz result for the given number.',
  operationId: 'getFizzBuzz',
  request: {
    query: z.object({
      number: z.coerce
        .number()
        .min(1)
        .openapi({
          param: {
            name: 'number',
            in: 'query',
            required: true,
            schema: { type: 'number', format: 'double', minimum: 1 },
            explode: false,
          },
        }),
      details: z
        .string()
        .exactOptional()
        .openapi({
          param: {
            name: 'details',
            in: 'query',
            required: false,
            schema: { type: 'string' },
            explode: false,
          },
        }),
    }),
  },
  responses: {
    200: {
      description: 'The request has succeeded.',
      content: { 'application/json': { schema: FizzBuzzResultSchema } },
    },
    400: {
      description: 'The server could not understand the request due to invalid syntax.',
      content: { 'application/json': { schema: ErrorResponseSchema } },
    },
  },
})
