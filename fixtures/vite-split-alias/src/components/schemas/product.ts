import { z } from '@hono/zod-openapi'

export const ProductSchema = z
  .object({ sku: z.string(), price: z.number(), inStock: z.boolean() })
  .openapi({ required: ['sku', 'price', 'inStock'] })
  .openapi('Product')

export type Product = z.infer<typeof ProductSchema>
