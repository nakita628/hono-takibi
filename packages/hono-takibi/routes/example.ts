import { createRoute, z } from '@hono/zod-openapi'

const BasicStringSchema = z.string().openapi({ example: 'hono-takibi' }).openapi('BasicString')

const BasicNumberSchema = z.number().openapi({ example: 42.195 }).openapi('BasicNumber')

const BasicIntegerSchema = z.int64().openapi({ example: 9876543210 }).openapi('BasicInteger')

const BasicBooleanSchema = z.boolean().openapi({ example: true }).openapi('BasicBoolean')

const BasicArraySchema = z
  .array(z.string())
  .openapi({ example: ['foo', 'bar'] })
  .openapi('BasicArray')

const BasicObjectSchema = z
  .object({ key: z.string(), value: z.number() })
  .openapi({ example: { key: 'speed', value: 88.8 } })
  .openapi('BasicObject')

const NullableStringSchema = z
  .string()
  .nullable()
  .openapi({ example: null })
  .openapi('NullableString')

const ExampleModelSchema = z
  .object({
    id: BasicIntegerSchema,
    name: BasicStringSchema,
    price: BasicNumberSchema,
    createdAt: z.iso.datetime().openapi({ example: '2025-07-06T12:34:56Z' }).optional(),
    isActive: BasicBooleanSchema.optional(),
    tags: BasicArraySchema.optional(),
    metadata: BasicObjectSchema.optional(),
    optionalNote: NullableStringSchema.optional(),
  })
  .openapi('ExampleModel')

export const getExampleRoute = createRoute({
  method: 'get',
  path: '/example',
  summary: 'Returns a sample document containing every primitive type',
  responses: {
    200: { description: 'OK', content: { 'application/json': { schema: ExampleModelSchema } } },
  },
})
