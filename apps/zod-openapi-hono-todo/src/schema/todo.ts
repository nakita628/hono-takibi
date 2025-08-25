import { z } from '@hono/zod-openapi'

export const TodoSchema = z.object({
  id: z.uuid(),
  content: z.string().min(1).max(140),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
})

export type Todo = z.infer<typeof TodoSchema>
