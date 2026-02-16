import { createRoute, z } from '@hono/zod-openapi'

const NullableFieldsSchema = z
  .object({
    name: z.string(),
    nickname: z.string().nullable().exactOptional(),
    age: z.int().nullable().exactOptional(),
    tags: z.array(z.string()).nullable().exactOptional(),
  })
  .openapi({ required: ['name'] })
  .openapi('NullableFields')

const CircleSchema = z
  .object({ kind: z.literal('circle'), radius: z.number() })
  .openapi({ required: ['kind', 'radius'] })
  .openapi('Circle')

const RectangleSchema = z
  .object({ kind: z.literal('rectangle'), width: z.number(), height: z.number() })
  .openapi({ required: ['kind', 'width', 'height'] })
  .openapi('Rectangle')

const ShapeSchema = z
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
  .openapi('Shape')

const BaseSchema = z
  .object({ id: z.int(), createdAt: z.iso.datetime() })
  .openapi({ required: ['id', 'createdAt'] })
  .openapi('Base')

const ExtendedSchema = z
  .object({ name: z.string(), description: z.string().exactOptional() })
  .openapi({ required: ['name'] })
  .openapi('Extended')

const ComposedObjectSchema = BaseSchema.and(ExtendedSchema)
  .and(z.object({ extra: z.boolean().exactOptional() }))
  .openapi('ComposedObject')

const Level1Schema = z
  .object({
    level2: z
      .object({ level3: z.object({ value: z.string() }).openapi({ required: ['value'] }) })
      .openapi({ required: ['level3'] }),
  })
  .openapi({ required: ['level2'] })
  .openapi('Level1')

const DynamicMapSchema = z.record(z.string(), z.string()).openapi('DynamicMap')

const AnyOfExampleSchema = z.union([z.string(), z.int(), z.boolean()]).openapi('AnyOfExample')

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
})

export const postDiscriminatedRoute = createRoute({
  method: 'post',
  path: '/discriminated',
  operationId: 'postDiscriminated',
  request: { body: { content: { 'application/json': { schema: ShapeSchema } }, required: true } },
  responses: {
    200: { description: 'OK', content: { 'application/json': { schema: ShapeSchema } } },
  },
})

export const getComposedRoute = createRoute({
  method: 'get',
  path: '/composed',
  operationId: 'getComposed',
  responses: {
    200: { description: 'OK', content: { 'application/json': { schema: ComposedObjectSchema } } },
  },
})

export const getDeepNestedRoute = createRoute({
  method: 'get',
  path: '/deep-nested',
  operationId: 'getDeepNested',
  responses: {
    200: { description: 'OK', content: { 'application/json': { schema: Level1Schema } } },
  },
})

export const getAdditionalPropsRoute = createRoute({
  method: 'get',
  path: '/additional-props',
  operationId: 'getAdditionalProps',
  responses: {
    200: { description: 'OK', content: { 'application/json': { schema: DynamicMapSchema } } },
  },
})
