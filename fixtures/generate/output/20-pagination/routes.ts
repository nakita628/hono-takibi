import { createRoute, z } from '@hono/zod-openapi'

export const ItemSchema = z
  .object({ id: z.string(), name: z.string() })
  .openapi({ required: ['id', 'name'] })
  .openapi('Item')

export type Item = z.infer<typeof ItemSchema>

export const ItemsPageSchema = z
  .object({ items: z.array(ItemSchema), nextCursor: z.string().exactOptional() })
  .openapi({ required: ['items'] })
  .openapi('ItemsPage')

export type ItemsPage = z.infer<typeof ItemsPageSchema>

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
