import { z } from '@hono/zod-openapi'
import { EntitySchema, type Entity } from './entity'
import { UserSchema, type User } from './user'
import { OrderStatusSchema, type OrderStatus } from './orderStatus'
import { OrderItemSchema, type OrderItem } from './orderItem'
import { AddressSchema, type Address } from './address'
import { AuditLogSchema, type AuditLog } from './auditLog'
import { ResourceLinksSchema, type ResourceLinks } from './resourceLinks'

type OrderType = Entity & {
  buyer: User
  status: OrderStatus
  items: OrderItem[]
  shippingAddress?: Address
  billingAddress?: Address
  auditTrail?: AuditLog[]
  links?: ResourceLinks
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
