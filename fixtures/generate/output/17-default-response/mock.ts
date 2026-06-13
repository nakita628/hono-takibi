import { OpenAPIHono, createRoute, z, type RouteHandler } from '@hono/zod-openapi'
import { faker } from '@faker-js/faker'

const ItemSchema = z
  .object({ id: z.string(), name: z.string() })
  .openapi({ required: ['id', 'name'] })
  .openapi('Item')

export const postItemsRoute = createRoute({
  method: 'post',
  path: '/items',
  operationId: 'createItem',
  request: { body: { content: { 'application/json': { schema: ItemSchema } }, required: true } },
  responses: {
    default: {
      description: 'successful operation',
      content: { 'application/json': { schema: ItemSchema } },
    },
  },
})

export const getPingRoute = createRoute({
  method: 'get',
  path: '/ping',
  operationId: 'ping',
  responses: { '2XX': { description: 'ok', content: { 'text/plain': { schema: z.string() } } } },
})

function mockItem() {
  return { id: faker.string.alpha({ length: { min: 5, max: 20 } }), name: faker.person.fullName() }
}

const postItemsRouteHandler: RouteHandler<typeof postItemsRoute> = async (c) => {
  return c.json(mockItem(), 200)
}

const getPingRouteHandler: RouteHandler<typeof getPingRoute> = async (c) => {
  return c.text(faker.string.alpha({ length: { min: 5, max: 20 } }), 200)
}

const app = new OpenAPIHono()

export const api = app
  .openapi(postItemsRoute, postItemsRouteHandler)
  .openapi(getPingRoute, getPingRouteHandler)

export default app
