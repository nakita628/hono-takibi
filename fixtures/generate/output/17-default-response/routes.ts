import { createRoute, z } from '@hono/zod-openapi'

export const ItemSchema = z
  .object({ id: z.string(), name: z.string() })
  .openapi({ required: ['id', 'name'] })
  .openapi('Item')

export type Item = z.infer<typeof ItemSchema>

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
