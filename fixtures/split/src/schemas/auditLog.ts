import { z } from '@hono/zod-openapi'
import { EntityRefSchema } from './entityRef'
import { EventSchema } from './event'
import { MetaSchema } from './meta'

type AuditLogType = {
  entity: z.infer<typeof EntityRefSchema>
  event: z.infer<typeof EventSchema>
  meta?: z.infer<typeof MetaSchema>
}

export const AuditLogSchema: z.ZodType<AuditLogType> = z
  .lazy(() =>
    z
      .object({ entity: EntityRefSchema, event: EventSchema, meta: MetaSchema.exactOptional() })
      .openapi({ required: ['entity', 'event'] }),
  )
  .openapi('AuditLog')

export type AuditLog = z.infer<typeof AuditLogSchema>
