import { z } from '@hono/zod-openapi'
import { ProblemRateLimitedExample } from '../examples'
import {
  RateLimitLimitHeaderHeaderSchema,
  RateLimitRemainingHeaderHeaderSchema,
  RateLimitResetHeaderHeaderSchema,
  TraceIdHeaderHeaderSchema,
} from '../headers'
import { ProblemDetailsSchema } from '../schemas'

export const RateLimitedResponse = {
  description: 'Too Many Requests',
  headers: z.object({
    'x-trace-id': TraceIdHeaderHeaderSchema,
    'x-ratelimit-limit': RateLimitLimitHeaderHeaderSchema,
    'x-ratelimit-remaining': RateLimitRemainingHeaderHeaderSchema,
    'x-ratelimit-reset': RateLimitResetHeaderHeaderSchema,
  }),
  content: {
    'application/problem+json': {
      schema: ProblemDetailsSchema,
      examples: { rateLimited: ProblemRateLimitedExample },
    },
  },
}
