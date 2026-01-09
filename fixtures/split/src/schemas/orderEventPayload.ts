import { z } from '@hono/zod-openapi'
import { OrderSchema, type Order } from './order'
import { OrderStatusSchema, type OrderStatus } from './orderStatus'

type OrderEventPayloadType = { order: Order; previousStatus?: OrderStatus }

export const OrderEventPayloadSchema: z.ZodType<OrderEventPayloadType> = z
  .lazy(() =>
    z
      .object({ order: OrderSchema, previousStatus: OrderStatusSchema.exactOptional() })
      .openapi({ required: ['order'] }),
  )
  .openapi('OrderEventPayload')

export type OrderEventPayload = z.infer<typeof OrderEventPayloadSchema>
