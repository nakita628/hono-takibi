import { createRoute, z } from '@hono/zod-openapi'

const CSchema = z
  .object({
    count: z.int().openapi({ description: 'Count value' }),
    flag: z.boolean().openapi({ description: 'A boolean flag' }),
  })
  .partial()
  .openapi('C')

const BSchema = z
  .object({
    id: z.string().openapi({ description: 'Identifier for schema B' }),
    message: z.string().openapi({ description: 'Message from schema B' }).optional(),
  })
  .openapi('B')

const ASchema = z.object({ b: BSchema, c: CSchema }).openapi('A')

export const getExampleRoute = createRoute({
  method: 'get',
  path: '/example',
  summary: 'Sample Endpoint',
  responses: {
    200: {
      description: 'Successful response',
      content: { 'application/json': { schema: ASchema } },
    },
  },
})
