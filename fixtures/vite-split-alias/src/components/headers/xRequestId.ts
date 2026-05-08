import { z } from '@hono/zod-openapi'

export const XRequestIdHeaderSchema = z
  .uuid()
  .exactOptional()
  .openapi({ description: 'Unique request identifier' })

export type XRequestIdHeader = z.infer<typeof XRequestIdHeaderSchema>
