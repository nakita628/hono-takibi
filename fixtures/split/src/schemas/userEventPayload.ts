import { z } from '@hono/zod-openapi'
import { UserSchema } from './user'

type UserEventPayloadType = {
  user: z.infer<typeof UserSchema>
  previous?: z.infer<typeof UserSchema>
}

export const UserEventPayloadSchema: z.ZodType<UserEventPayloadType> = z
  .lazy(() =>
    z
      .object({ user: UserSchema, previous: UserSchema.exactOptional() })
      .openapi({ required: ['user'] }),
  )
  .openapi('UserEventPayload')

export type UserEventPayload = z.infer<typeof UserEventPayloadSchema>
