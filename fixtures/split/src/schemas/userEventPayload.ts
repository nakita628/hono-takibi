import { z } from '@hono/zod-openapi'
import { UserSchema, type User } from './user'

type UserEventPayloadType = { user: User; previous?: User }

export const UserEventPayloadSchema: z.ZodType<UserEventPayloadType> = z
  .lazy(() =>
    z
      .object({ user: UserSchema, previous: UserSchema.exactOptional() })
      .openapi({ required: ['user'] }),
  )
  .openapi('UserEventPayload')

export type UserEventPayload = z.infer<typeof UserEventPayloadSchema>
