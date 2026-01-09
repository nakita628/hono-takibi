import { z } from '@hono/zod-openapi'

type EventTypeType =
  | 'user.created'
  | 'user.updated'
  | 'order.created'
  | 'order.shipped'
  | 'system.alert'

export const EventTypeSchema: z.ZodType<EventTypeType> = z
  .enum(['user.created', 'user.updated', 'order.created', 'order.shipped', 'system.alert'])
  .openapi('EventType')

export type EventType = z.infer<typeof EventTypeSchema>
