import { z } from '@hono/zod-openapi'
import { ProblemDetailsSchema } from '../schemas'
import { ProblemUnauthorizedExample } from '../examples'
import { TraceIdHeaderHeaderSchema, WwwAuthenticateHeaderHeaderSchema } from '../headers'

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
