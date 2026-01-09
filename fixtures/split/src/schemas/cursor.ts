import { z } from '@hono/zod-openapi'

export const CursorSchema = z
  .string()
  .openapi({ description: 'Pagination cursor (opaque)' })
  .openapi('Cursor')

export type Cursor = z.infer<typeof CursorSchema>
