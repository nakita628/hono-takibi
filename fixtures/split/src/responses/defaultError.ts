import { z } from '@hono/zod-openapi'
import { ProblemDetailsSchema } from '../schemas'
import { TraceIdHeaderHeaderSchema } from '../headers'
import { ProblemGenericExample } from '../examples'

export const DefaultErrorResponse = {
  description: 'Default error wrapper -> points to ProblemDetails',
  headers: z.object({ 'x-trace-id': TraceIdHeaderHeaderSchema }),
  content: {
    'application/problem+json': {
      schema: ProblemDetailsSchema,
      examples: { generic: ProblemGenericExample },
    },
  },
}
