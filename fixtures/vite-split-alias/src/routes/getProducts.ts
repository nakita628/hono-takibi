import { createRoute, z } from '@hono/zod-openapi'
import { ProductSchema } from '~/components/schemas'

export const getProductsRoute = createRoute({
  method: 'get',
  path: '/products',
  operationId: 'listProducts',
  responses: {
    200: { description: 'OK', content: { 'application/json': { schema: z.array(ProductSchema) } } },
  },
})
