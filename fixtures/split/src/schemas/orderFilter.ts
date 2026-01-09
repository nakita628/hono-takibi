import { z } from '@hono/zod-openapi'
import { MoneySchema } from './money'
import { OrderStatusSchema } from './orderStatus'
import { UserSchema } from './user'

export const OrderFilterSchema = z
  .object({
    kind: z.literal('order'),
    status: OrderStatusSchema.exactOptional(),
    buyer: UserSchema.exactOptional(),
    minTotal: MoneySchema.exactOptional(),
  })
  .openapi({ required: ['kind'] })
  .openapi('OrderFilter')

export type OrderFilter = z.infer<typeof OrderFilterSchema>
