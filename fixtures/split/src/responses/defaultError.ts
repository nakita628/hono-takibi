import { z } from '@hono/zod-openapi'
import { ProblemGenericExample } from '../examples'
import { TraceIdHeaderHeaderSchema } from '../headers'
import { ProblemDetailsSchema } from '../schemas'

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
