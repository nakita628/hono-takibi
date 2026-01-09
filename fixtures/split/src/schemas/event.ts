import { z } from '@hono/zod-openapi'
import { EventTypeSchema, type EventType } from './eventType'
import { UserEventPayloadSchema, type UserEventPayload } from './userEventPayload'
import { OrderEventPayloadSchema, type OrderEventPayload } from './orderEventPayload'
import { SystemEventPayloadSchema, type SystemEventPayload } from './systemEventPayload'
import { TraceContextSchema, type TraceContext } from './traceContext'

type EventType = {
  type: EventType
  payload: UserEventPayload | OrderEventPayload | SystemEventPayload
  causedBy?: EventType[]
  trace?: TraceContext
}

export const EventSchema: z.ZodType<EventType> = z
  .lazy(() =>
    z
      .object({
        type: EventTypeSchema,
        payload: z.xor([UserEventPayloadSchema, OrderEventPayloadSchema, SystemEventPayloadSchema]),
        causedBy: z.array(EventSchema).exactOptional(),
        trace: TraceContextSchema.exactOptional(),
      })
      .openapi({ required: ['type', 'payload'] }),
  )
  .openapi('Event')

export type Event = z.infer<typeof EventSchema>
