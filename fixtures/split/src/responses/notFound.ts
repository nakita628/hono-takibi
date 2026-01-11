import { z } from '@hono/zod-openapi'
import { ProblemDetailsSchema } from '../schemas'
import { TraceIdHeaderHeaderSchema } from '../headers'
import { ProblemNotFoundExample } from '../examples'

export const NotFoundResponse = {
  description: 'Not Found',
  headers: z.object({ 'x-trace-id': TraceIdHeaderHeaderSchema }),
  content: {
    'application/problem+json': {
      schema: ProblemDetailsSchema,
      examples: { notFound: ProblemNotFoundExample },
    },
  },
}
