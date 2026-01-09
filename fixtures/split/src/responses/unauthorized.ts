import { z } from '@hono/zod-openapi'
import { ProblemDetailsSchema } from '../schemas'
import { TraceIdHeaderHeaderSchema, WwwAuthenticateHeaderHeaderSchema } from '../headers'
import { ProblemUnauthorizedExample } from '../examples'

export const UnauthorizedResponse = {
  description: 'Unauthorized',
  headers: z.object({
    'x-trace-id': TraceIdHeaderHeaderSchema,
    'www-authenticate': WwwAuthenticateHeaderHeaderSchema,
  }),
  content: {
    'application/problem+json': {
      schema: ProblemDetailsSchema,
      examples: { unauthorized: ProblemUnauthorizedExample },
    },
  },
}
