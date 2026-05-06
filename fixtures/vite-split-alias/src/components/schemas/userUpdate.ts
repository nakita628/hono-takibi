import { z } from '@hono/zod-openapi'

export const UserUpdateSchema = z
  .object({
    name: z.string().exactOptional(),
    email: z.email().exactOptional(),
    role: z.enum(['admin', 'member']).exactOptional(),
  })
  .openapi('UserUpdate')

export type UserUpdate = z.infer<typeof UserUpdateSchema>
