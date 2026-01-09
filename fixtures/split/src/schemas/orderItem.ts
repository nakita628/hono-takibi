import { z } from '@hono/zod-openapi'
import { ProductSchema, type Product } from './product'
import { MoneySchema, type Money } from './money'

type OrderItemType = { product: Product; quantity: number; unitPrice?: Money }

export const OrderItemSchema: z.ZodType<OrderItemType> = z
  .lazy(() =>
    z
      .object({
        product: ProductSchema,
        quantity: z.int().min(1),
        unitPrice: MoneySchema.exactOptional(),
      })
      .openapi({ required: ['product', 'quantity'] }),
  )
  .openapi('OrderItem')

export type OrderItem = z.infer<typeof OrderItemSchema>
