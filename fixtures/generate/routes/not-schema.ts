import { createRoute, z } from '@hono/zod-openapi'

const NotSchemaTestSchema = z
  .object({
    notSpecificValue: z
      .any()
      .refine((v) => v !== 'forbidden')
      .exactOptional()
      .openapi({ not: { const: 'forbidden' } }),
    notString: z
      .any()
      .refine((v) => typeof v !== 'string')
      .exactOptional()
      .openapi({ not: { type: 'string' } }),
    notNumber: z
      .any()
      .refine((v) => typeof v !== 'number')
      .exactOptional()
      .openapi({ not: { type: 'number' } }),
    notNull: z
      .any()
      .refine((v) => v !== null)
      .exactOptional()
      .openapi({ not: { type: 'null' } }),
    notArray: z
      .any()
      .refine((v) => !Array.isArray(v))
      .exactOptional()
      .openapi({ not: { type: 'array' } }),
    notObject: z
      .any()
      .refine((v) => typeof v !== 'object' || v === null || Array.isArray(v))
      .exactOptional()
      .openapi({ not: { type: 'object' } }),
    notInList: z
      .any()
      .refine((v) => !['apple', 'banana', 'cherry'].includes(v))
      .exactOptional()
      .openapi({ not: { enum: ['apple', 'banana', 'cherry'] } }),
    notBoolean: z
      .any()
      .refine((v) => typeof v !== 'boolean')
      .exactOptional()
      .openapi({ not: { type: 'boolean' } }),
    notInteger: z
      .any()
      .refine((v) => typeof v !== 'number' || !Number.isInteger(v))
      .exactOptional()
      .openapi({ not: { type: 'integer' } }),
  })
  .openapi({
    type: 'object',
    properties: {
      notSpecificValue: { not: { const: 'forbidden' } },
      notString: { not: { type: 'string' } },
      notNumber: { not: { type: 'number' } },
      notNull: { not: { type: 'null' } },
      notArray: { not: { type: 'array' } },
      notObject: { not: { type: 'object' } },
      notInList: { not: { enum: ['apple', 'banana', 'cherry'] } },
      notBoolean: { not: { type: 'boolean' } },
      notInteger: { not: { type: 'integer' } },
    },
  })
  .openapi('NotSchemaTest')

export const postValidateRoute = createRoute({
  method: 'post',
  path: '/validate',
  operationId: 'validateNotSchema',
  request: { body: { content: { 'application/json': { schema: NotSchemaTestSchema } } } },
  responses: { 200: { description: 'OK' } },
})
