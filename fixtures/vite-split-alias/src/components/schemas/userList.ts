import { z } from '@hono/zod-openapi'
import { UserSchema } from './user'

export const UserListSchema = z.array(UserSchema).openapi('UserList')

export type UserList = z.infer<typeof UserListSchema>
