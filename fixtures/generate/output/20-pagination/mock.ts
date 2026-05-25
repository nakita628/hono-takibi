import { OpenAPIHono, createRoute, z, type RouteHandler } from '@hono/zod-openapi'
import { faker } from '@faker-js/faker'

const ItemSchema = z
  .object({ id: z.string(), name: z.string() })
  .openapi({ required: ['id', 'name'] })
  .openapi('Item')

const ItemsPageSchema = z
  .object({ items: z.array(ItemSchema), nextCursor: z.string().exactOptional() })
  .openapi({ required: ['items'] })
  .openapi('ItemsPage')

export const getItemsRoute = createRoute({
  method: 'get',
  path: '/items',
  summary: 'List items with pagination',
  operationId: 'listItems',
  request: {
    query: z.object({
      limit: z.coerce
        .number()
        .int()
        .exactOptional()
        .openapi({ param: { name: 'limit', in: 'query', schema: { type: 'integer' } } }),
      cursor: z
        .string()
        .exactOptional()
        .openapi({ param: { name: 'cursor', in: 'query', schema: { type: 'string' } } }),
    }),
  },
  responses: {
    200: { description: 'OK', content: { 'application/json': { schema: ItemsPageSchema } } },
  },
})

export const getFeedsRoute = createRoute({
  method: 'get',
  path: '/feeds',
  summary: 'Feed (paginated, no args)',
  operationId: 'listFeeds',
  responses: {
    200: { description: 'OK', content: { 'application/json': { schema: ItemsPageSchema } } },
  },
})

export const getUsersUserIdPostsRoute = createRoute({
  method: 'get',
  path: '/users/{userId}/posts',
  summary: "User's posts (paginated, path param)",
  operationId: 'listUserPosts',
  request: {
    params: z.object({
      userId: z
        .string()
        .openapi({
          param: { name: 'userId', in: 'path', required: true, schema: { type: 'string' } },
        }),
    }),
    query: z.object({
      cursor: z
        .string()
        .exactOptional()
        .openapi({ param: { name: 'cursor', in: 'query', schema: { type: 'string' } } }),
    }),
  },
  responses: {
    200: { description: 'OK', content: { 'application/json': { schema: ItemsPageSchema } } },
  },
})

function mockItem() {
  return { id: faker.string.alpha({ length: { min: 5, max: 20 } }), name: faker.person.fullName() }
}

function mockItemsPage() {
  return {
    items: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => mockItem()),
    nextCursor: faker.helpers.arrayElement([
      faker.string.alpha({ length: { min: 5, max: 20 } }),
      undefined,
    ]),
  }
}

const getItemsRouteHandler: RouteHandler<typeof getItemsRoute> = async (c) => {
  return c.json(mockItemsPage(), 200)
}

const getFeedsRouteHandler: RouteHandler<typeof getFeedsRoute> = async (c) => {
  return c.json(mockItemsPage(), 200)
}

const getUsersUserIdPostsRouteHandler: RouteHandler<typeof getUsersUserIdPostsRoute> = async (
  c,
) => {
  return c.json(mockItemsPage(), 200)
}

const app = new OpenAPIHono()

export const api = app
  .openapi(getItemsRoute, getItemsRouteHandler)
  .openapi(getFeedsRoute, getFeedsRouteHandler)
  .openapi(getUsersUserIdPostsRoute, getUsersUserIdPostsRouteHandler)

export default app
