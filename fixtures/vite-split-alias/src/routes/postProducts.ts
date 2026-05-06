import { createRoute } from '@hono/zod-openapi'
import { ProductSchema } from '~/components/schemas'

export const postProductsRoute = createRoute({
  method: 'post',
  path: '/products',
  operationId: 'createProduct',
  request: { body: { content: { 'application/json': { schema: ProductSchema } }, required: true } },
  responses: {
    201: { description: 'Created', content: { 'application/json': { schema: ProductSchema } } },
  },
})
