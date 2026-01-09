import { z } from '@hono/zod-openapi'
import { AddressSchema } from './address'
import { AuditLogSchema } from './auditLog'
import { EntitySchema } from './entity'
import { OrderItemSchema } from './orderItem'
import { OrderStatusSchema } from './orderStatus'
import { ResourceLinksSchema } from './resourceLinks'
import { UserSchema } from './user'

type OrderType = z.infer<typeof EntitySchema> & {
  buyer: z.infer<typeof UserSchema>
  status: z.infer<typeof OrderStatusSchema>
  items: z.infer<typeof OrderItemSchema>[]
  shippingAddress?: z.infer<typeof AddressSchema>
  billingAddress?: z.infer<typeof AddressSchema>
  auditTrail?: z.infer<typeof AuditLogSchema>[]
  links?: z.infer<typeof ResourceLinksSchema>
}

export const OrderSchema: z.ZodType<OrderType> = z
  .lazy(() =>
    EntitySchema.and(
      z
        .object({
          buyer: UserSchema,
          status: OrderStatusSchema,
          items: z.array(OrderItemSchema),
          shippingAddress: AddressSchema.exactOptional(),
          billingAddress: AddressSchema.exactOptional(),
          auditTrail: z.array(AuditLogSchema).exactOptional(),
          links: ResourceLinksSchema.exactOptional(),
        })
        .openapi({ required: ['buyer', 'status', 'items'] }),
    ),
  )
  .openapi('Order')

export type Order = z.infer<typeof OrderSchema>
