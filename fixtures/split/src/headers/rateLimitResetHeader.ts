import { z } from '@hono/zod-openapi'

export const RateLimitResetHeaderHeaderSchema = z
  .int()
  .exactOptional()
  .openapi({ description: 'Rate limit reset epoch seconds', example: 1735689600 })

export type RateLimitResetHeaderHeader = z.infer<typeof RateLimitResetHeaderHeaderSchema>
