import { z } from '@hono/zod-openapi'

type OrderStatusType = 'pending' | 'paid' | 'shipped' | 'cancelled'

export const OrderStatusSchema: z.ZodType<OrderStatusType> = z
  .enum(['pending', 'paid', 'shipped', 'cancelled'])
  .openapi('OrderStatus')

export type OrderStatus = z.infer<typeof OrderStatusSchema>
