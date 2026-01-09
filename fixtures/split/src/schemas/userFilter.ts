import { z } from '@hono/zod-openapi'
import { CompanySchema } from './company'
import { UserSchema } from './user'

export const UserFilterSchema = z
  .object({
    kind: z.literal('user'),
    email: z.email().exactOptional(),
    company: CompanySchema.exactOptional(),
    manager: UserSchema.exactOptional(),
  })
  .openapi({ required: ['kind'] })
  .openapi('UserFilter')

export type UserFilter = z.infer<typeof UserFilterSchema>
