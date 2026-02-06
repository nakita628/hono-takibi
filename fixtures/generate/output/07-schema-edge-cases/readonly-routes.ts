import { createRoute, z } from '@hono/zod-openapi'

export const NullableFieldsSchema = z
  .object({
    name: z.string(),
    nickname: z.string().nullable().exactOptional(),
    age: z.int().nullable().exactOptional(),
    tags: z.array(z.string()).nullable().exactOptional(),
  })
  .openapi({ required: ['name'] })
  .readonly()
  .openapi('NullableFields')

export type NullableFields = z.infer<typeof NullableFieldsSchema>

export const CircleSchema = z
  .object({ kind: z.literal('circle'), radius: z.number() })
  .openapi({ required: ['kind', 'radius'] })
  .readonly()
  .openapi('Circle')

export type Circle = z.infer<typeof CircleSchema>

export const RectangleSchema = z
  .object({ kind: z.literal('rectangle'), width: z.number(), height: z.number() })
  .openapi({ required: ['kind', 'width', 'height'] })
  .readonly()
  .openapi('Rectangle')

export type Rectangle = z.infer<typeof RectangleSchema>

export const ShapeSchema = z
  .xor([CircleSchema, RectangleSchema])
  .openapi({
    discriminator: {
      propertyName: 'kind',
      mapping: {
        circle: '#/components/schemas/Circle',
        rectangle: '#/components/schemas/Rectangle',
      },
    },
  })
  .readonly()
  .openapi('Shape')

export type Shape = z.infer<typeof ShapeSchema>

export const BaseSchema = z
  .object({ id: z.int(), createdAt: z.iso.datetime() })
  .openapi({ required: ['id', 'createdAt'] })
  .readonly()
  .openapi('Base')

export type Base = z.infer<typeof BaseSchema>

export const ExtendedSchema = z
  .object({ name: z.string(), description: z.string().exactOptional() })
  .openapi({ required: ['name'] })
  .readonly()
  .openapi('Extended')

export type Extended = z.infer<typeof ExtendedSchema>

export const ComposedObjectSchema = BaseSchema.and(ExtendedSchema)
  .and(z.object({ extra: z.boolean().exactOptional() }))
  .readonly()
  .openapi('ComposedObject')

export type ComposedObject = z.infer<typeof ComposedObjectSchema>

export const Level1Schema = z
  .object({
    level2: z
      .object({ level3: z.object({ value: z.string() }).openapi({ required: ['value'] }) })
      .openapi({ required: ['level3'] }),
  })
  .openapi({ required: ['level2'] })
  .readonly()
  .openapi('Level1')

export type Level1 = z.infer<typeof Level1Schema>

export const DynamicMapSchema = z.record(z.string(), z.string()).readonly().openapi('DynamicMap')

export type DynamicMap = z.infer<typeof DynamicMapSchema>

export const AnyOfExampleSchema = z
  .union([z.string(), z.int(), z.boolean()])
  .readonly()
  .openapi('AnyOfExample')

export type AnyOfExample = z.infer<typeof AnyOfExampleSchema>

export const postNullableRoute = createRoute({
  method: 'post',
  path: '/nullable',
  operationId: 'postNullable',
  request: {
    body: { content: { 'application/json': { schema: NullableFieldsSchema } }, required: true },
  },
  responses: {
    200: { description: 'OK', content: { 'application/json': { schema: NullableFieldsSchema } } },
  },
} as const)

export const postDiscriminatedRoute = createRoute({
  method: 'post',
  path: '/discriminated',
  operationId: 'postDiscriminated',
  request: { body: { content: { 'application/json': { schema: ShapeSchema } }, required: true } },
  responses: {
    200: { description: 'OK', content: { 'application/json': { schema: ShapeSchema } } },
  },
} as const)

export const getComposedRoute = createRoute({
  method: 'get',
  path: '/composed',
  operationId: 'getComposed',
  responses: {
    200: { description: 'OK', content: { 'application/json': { schema: ComposedObjectSchema } } },
  },
} as const)

export const getDeepNestedRoute = createRoute({
  method: 'get',
  path: '/deep-nested',
  operationId: 'getDeepNested',
  responses: {
    200: { description: 'OK', content: { 'application/json': { schema: Level1Schema } } },
  },
} as const)

export const getAdditionalPropsRoute = createRoute({
  method: 'get',
  path: '/additional-props',
  operationId: 'getAdditionalProps',
  responses: {
    200: { description: 'OK', content: { 'application/json': { schema: DynamicMapSchema } } },
  },
} as const)
