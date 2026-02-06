import { OpenAPIHono, createRoute, z, type RouteHandler } from '@hono/zod-openapi'
import { faker } from '@faker-js/faker'

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

function mockNullableFields() {
  return {
    name: faker.person.fullName(),
    nickname: faker.helpers.arrayElement([undefined, undefined]),
    age: faker.helpers.arrayElement([faker.number.int({ min: 1, max: 120 }), undefined]),
    tags: faker.helpers.arrayElement([undefined, undefined]),
  }
}

function mockCircle() {
  return {
    kind: 'circle' as const,
    radius: faker.number.float({ min: 1, max: 1000, fractionDigits: 2 }),
  }
}

function mockRectangle() {
  return {
    kind: 'rectangle' as const,
    width: faker.number.float({ min: 1, max: 1000, fractionDigits: 2 }),
    height: faker.number.float({ min: 1, max: 1000, fractionDigits: 2 }),
  }
}

function mockShape() {
  return faker.helpers.arrayElement([mockCircle(), mockRectangle()])
}

function mockBase() {
  return {
    id: faker.number.int({ min: 1, max: 99999 }),
    createdAt: faker.date.past().toISOString(),
  }
}

function mockExtended() {
  return {
    name: faker.person.fullName(),
    description: faker.helpers.arrayElement([faker.lorem.paragraph(), undefined]),
  }
}

function mockComposedObject() {
  return {
    ...mockBase(),
    ...mockExtended(),
    ...{
      extra: faker.helpers.arrayElement([faker.datatype.boolean(), undefined]),
    },
  }
}

function mockLevel1() {
  return {
    level2: {
      level3: {
        value: faker.string.alpha({ length: { min: 5, max: 20 } }),
      },
    },
  }
}

function mockDynamicMap() {
  return undefined
}

const postNullableRouteHandler: RouteHandler<typeof postNullableRoute> = async (c) => {
  return c.json(mockNullableFields(), 200)
}

const postDiscriminatedRouteHandler: RouteHandler<typeof postDiscriminatedRoute> = async (c) => {
  return c.json(mockShape(), 200)
}

const getComposedRouteHandler: RouteHandler<typeof getComposedRoute> = async (c) => {
  return c.json(mockComposedObject(), 200)
}

const getDeepNestedRouteHandler: RouteHandler<typeof getDeepNestedRoute> = async (c) => {
  return c.json(mockLevel1(), 200)
}

const getAdditionalPropsRouteHandler: RouteHandler<typeof getAdditionalPropsRoute> = async (c) => {
  return c.json(mockDynamicMap(), 200)
}

const app = new OpenAPIHono()

export const api = app
  .openapi(postNullableRoute, postNullableRouteHandler)
  .openapi(postDiscriminatedRoute, postDiscriminatedRouteHandler)
  .openapi(getComposedRoute, getComposedRouteHandler)
  .openapi(getDeepNestedRoute, getDeepNestedRouteHandler)
  .openapi(getAdditionalPropsRoute, getAdditionalPropsRouteHandler)

export type AppType = typeof api

export default app
