import { z } from '@hono/zod-openapi'
import { TraceIdSchema } from './schemas'

import { z } from '@hono/zod-openapi'

export const TraceIdHeaderHeaderSchema = TraceIdSchema.exactOptional().openapi({
  description: 'Trace id header component (same concept as parameter)',
  example: 'trace-01J1K9N3E6R6ZK7Z6B0Q9Q3H3J',
})

export type TraceIdHeaderHeader = z.infer<typeof TraceIdHeaderHeaderSchema>

export const WwwAuthenticateHeaderHeaderSchema = z
  .string()
  .exactOptional()
  .openapi({
    description: 'WWW-Authenticate for Bearer',
    example: 'Bearer realm="inferno", error="invalid_token"',
  })

export type WwwAuthenticateHeaderHeader = z.infer<typeof WwwAuthenticateHeaderHeaderSchema>

export const RateLimitLimitHeaderHeaderSchema = z
  .int()
  .exactOptional()
  .openapi({ description: 'Rate limit total', example: 1000 })

export type RateLimitLimitHeaderHeader = z.infer<typeof RateLimitLimitHeaderHeaderSchema>

export const RateLimitRemainingHeaderHeaderSchema = z
  .int()
  .exactOptional()
  .openapi({ description: 'Rate limit remaining', example: 998 })

export type RateLimitRemainingHeaderHeader = z.infer<typeof RateLimitRemainingHeaderHeaderSchema>

export const RateLimitResetHeaderHeaderSchema = z
  .int()
  .exactOptional()
  .openapi({ description: 'Rate limit reset epoch seconds', example: 1735689600 })

export type RateLimitResetHeaderHeader = z.infer<typeof RateLimitResetHeaderHeaderSchema>
