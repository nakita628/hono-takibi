import { createRoute, z } from '@hono/zod-openapi'

const CSchema = z
  .object({
    count: z.int().openapi({ type: 'integer', description: 'Count value' }),
    flag: z.boolean().openapi({ type: 'boolean', description: 'A boolean flag' }),
  })
  .partial()
  .openapi({
    type: 'object',
    properties: {
      count: { type: 'integer', description: 'Count value' },
      flag: { type: 'boolean', description: 'A boolean flag' },
    },
  })

const BSchema = z
  .object({
    id: z.string().openapi({ type: 'string', description: 'Identifier for schema B' }),
    message: z
      .string()
      .optional()
      .openapi({ type: 'string', description: 'Message from schema B' }),
  })
  .openapi({
    type: 'object',
    properties: {
      id: { type: 'string', description: 'Identifier for schema B' },
      message: { type: 'string', description: 'Message from schema B' },
    },
    required: ['id'],
  })

const ASchema = z
  .object({ b: BSchema, c: CSchema })
  .openapi({
    type: 'object',
    properties: { b: { $ref: '#/components/schemas/B' }, c: { $ref: '#/components/schemas/C' } },
    required: ['b', 'c'],
  })

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
