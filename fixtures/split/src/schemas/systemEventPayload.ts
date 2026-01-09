import { z } from '@hono/zod-openapi'
import { EntityRefSchema } from './entityRef'

type SystemEventPayloadType = { message: string; related?: z.infer<typeof EntityRefSchema> }

export const SystemEventPayloadSchema: z.ZodType<SystemEventPayloadType> = z
  .lazy(() =>
    z
      .object({ message: z.string(), related: EntityRefSchema.exactOptional() })
      .openapi({ required: ['message'] }),
  )
  .openapi('SystemEventPayload')

export type SystemEventPayload = z.infer<typeof SystemEventPayloadSchema>
