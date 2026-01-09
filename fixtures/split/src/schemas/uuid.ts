import { z } from '@hono/zod-openapi'

export const UuidSchema = z
  .uuid()
  .openapi({ examples: ['f3b1b6d8-4c8c-4f1a-9b6f-1c7e6d8b9a01'] })
  .openapi('Uuid')

export type Uuid = z.infer<typeof UuidSchema>
