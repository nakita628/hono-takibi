import { z } from '@hono/zod-openapi'

export const ErrorSchema = z
  .object({ code: z.int(), message: z.string() })
  .openapi({ required: ['code', 'message'] })
  .openapi('Error')

export type Error = z.infer<typeof ErrorSchema>
