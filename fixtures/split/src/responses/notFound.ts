import { z } from '@hono/zod-openapi'
import { ProblemNotFoundExample } from '../examples'
import { TraceIdHeaderHeaderSchema } from '../headers'
import { ProblemDetailsSchema } from '../schemas'

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
