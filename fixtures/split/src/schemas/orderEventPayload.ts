import { z } from '@hono/zod-openapi'
import { OrderSchema } from './order'
import { OrderStatusSchema } from './orderStatus'

type OrderEventPayloadType = {
  order: z.infer<typeof OrderSchema>
  previousStatus?: z.infer<typeof OrderStatusSchema>
}

export const OrderEventPayloadSchema: z.ZodType<OrderEventPayloadType> = z
  .lazy(() =>
    z
      .object({ order: OrderSchema, previousStatus: OrderStatusSchema.exactOptional() })
      .openapi({ required: ['order'] }),
  )
  .openapi('OrderEventPayload')

export type OrderEventPayload = z.infer<typeof OrderEventPayloadSchema>
