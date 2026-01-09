import { z } from '@hono/zod-openapi'

export const ErrorSchema = z
  .strictObject({
    message: z.string(),
    code: z.string().exactOptional().openapi({ example: 'BAD_REQUEST' }),
  })
  .openapi({ required: ['message'] })
  .openapi('Error')

export type Error = z.infer<typeof ErrorSchema>
