import { z } from '@hono/zod-openapi'
import { EntityRefSchema, type EntityRef } from './entityRef'
import { EventSchema, type Event } from './event'
import { MetaSchema, type Meta } from './meta'

type AuditLogType = { entity: EntityRef; event: Event; meta?: Meta }

export const AuditLogSchema: z.ZodType<AuditLogType> = z
  .lazy(() =>
    z
      .object({ entity: EntityRefSchema, event: EventSchema, meta: MetaSchema.exactOptional() })
      .openapi({ required: ['entity', 'event'] }),
  )
  .openapi('AuditLog')

export type AuditLog = z.infer<typeof AuditLogSchema>
