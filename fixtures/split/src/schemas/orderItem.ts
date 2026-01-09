import { z } from '@hono/zod-openapi'
import { MoneySchema } from './money'
import { ProductSchema } from './product'

type OrderItemType = {
  product: z.infer<typeof ProductSchema>
  quantity: number
  unitPrice?: z.infer<typeof MoneySchema>
}

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
