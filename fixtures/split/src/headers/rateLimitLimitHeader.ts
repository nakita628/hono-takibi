import { z } from '@hono/zod-openapi'

export const RateLimitLimitHeaderHeaderSchema = z
  .int()
  .exactOptional()
  .openapi({ description: 'Rate limit total', example: 1000 })

export type RateLimitLimitHeaderHeader = z.infer<typeof RateLimitLimitHeaderHeaderSchema>
