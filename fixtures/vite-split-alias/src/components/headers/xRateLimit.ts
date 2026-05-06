import { z } from '@hono/zod-openapi'

export const XRateLimitHeaderSchema = z
  .int()
  .exactOptional()
  .openapi({ description: 'Remaining quota' })

export type XRateLimitHeader = z.infer<typeof XRateLimitHeaderSchema>
