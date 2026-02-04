import { z } from '@hono/zod-openapi'
import { EventTypeSchema } from './eventType'
import { OrderEventPayloadSchema } from './orderEventPayload'
import { SystemEventPayloadSchema } from './systemEventPayload'
import { TraceContextSchema } from './traceContext'
import { UserEventPayloadSchema } from './userEventPayload'

type EventType = {
  type: z.infer<typeof EventTypeSchema>
  payload:
    | z.infer<typeof UserEventPayloadSchema>
    | z.infer<typeof OrderEventPayloadSchema>
    | z.infer<typeof SystemEventPayloadSchema>
  causedBy?: EventType[]
  trace?: z.infer<typeof TraceContextSchema>
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
