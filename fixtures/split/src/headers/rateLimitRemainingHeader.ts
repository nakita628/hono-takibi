import { z } from '@hono/zod-openapi'

export const RateLimitRemainingHeaderHeaderSchema = z
  .int()
  .exactOptional()
  .openapi({ description: 'Rate limit remaining', example: 998 })

export type RateLimitRemainingHeaderHeader = z.infer<typeof RateLimitRemainingHeaderHeaderSchema>
