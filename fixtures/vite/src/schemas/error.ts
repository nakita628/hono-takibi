import { z } from '@hono/zod-openapi'

export const ErrorSchema = z
  .strictObject({
    message: z.string(),
    code: z.string().openapi({ example: 'BAD_REQUEST' }).optional(),
  })
  .openapi('Error')

export type Error = z.infer<typeof ErrorSchema>
