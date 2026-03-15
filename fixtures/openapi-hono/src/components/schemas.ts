import { z } from '@hono/zod-openapi'

export const UserSchema = z
  .object({ id: z.int(), name: z.string(), email: z.email() })
  .openapi({ required: ['id', 'name', 'email'] })
  .openapi('User')

export type User = z.infer<typeof UserSchema>

export const UserListSchema = z.array(UserSchema).openapi('UserList')

export type UserList = z.infer<typeof UserListSchema>
