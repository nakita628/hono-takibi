import { z } from '@hono/zod-openapi'

export const UserSchema = z
  .object({
    id: z.int64(),
    name: z.string().min(1).max(64),
    email: z.email(),
    role: z.enum(['admin', 'member']),
    createdAt: z.iso.datetime().exactOptional(),
  })
  .openapi({ required: ['id', 'name', 'email', 'role'] })
  .openapi('User')

export type User = z.infer<typeof UserSchema>
