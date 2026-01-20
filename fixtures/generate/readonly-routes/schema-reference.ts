import { createRoute, z } from '@hono/zod-openapi'

const BSchema = z
  .object({
    id: z.string().openapi({ description: 'Identifier for schema B' }),
    message: z.string().exactOptional().openapi({ description: 'Message from schema B' }),
  })
  .openapi({ required: ['id'] })
  .readonly()
  .openapi('B')

const CSchema = z
  .object({
    count: z.int().exactOptional().openapi({ description: 'Count value' }),
    flag: z.boolean().exactOptional().openapi({ description: 'A boolean flag' }),
  })
  .readonly()
  .openapi('C')

const ASchema = z
  .object({ b: BSchema, c: CSchema })
  .openapi({ required: ['b', 'c'] })
  .readonly()
  .openapi('A')

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
} as const)
