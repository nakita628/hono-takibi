import { z } from '@hono/zod-openapi'
import { ProductSchema } from '~/components/schemas'

export const ProductsItemPathItem = {
  get: {
    operationId: 'listProducts',
    responses: {
      200: {
        description: 'OK',
        content: { 'application/json': { schema: z.array(ProductSchema) } },
      },
    },
  },
  post: {
    operationId: 'createProduct',
    requestBody: { content: { 'application/json': { schema: ProductSchema } }, required: true },
    responses: {
      201: { description: 'Created', content: { 'application/json': { schema: ProductSchema } } },
    },
  },
}
