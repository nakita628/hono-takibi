import { z } from '@hono/zod-openapi'
import { ProblemUnauthorizedExample } from '../examples'
import { TraceIdHeaderHeaderSchema, WwwAuthenticateHeaderHeaderSchema } from '../headers'
import { ProblemDetailsSchema } from '../schemas'

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
