import { createRoute, z } from '@hono/zod-openapi'

const BSchema = z.object({ id: z.string(), message: z.string().optional() }).openapi('B')

const CSchema = z.object({ count: z.number().int(), flag: z.boolean() }).partial().openapi('C')

const ASchema = z.object({ b: BSchema, c: CSchema }).openapi('A')

export const getExampleRoute = createRoute({
  method: 'get',
  path: '/example',
  operationId: 'undefined',
  summary: 'Sample Endpoint',
  responses: {
    200: {
      description: 'Successful response',
      content: { 'application/json': { schema: ASchema } },
    },
  },
})
