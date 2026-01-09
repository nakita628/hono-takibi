import { z } from '@hono/zod-openapi'
import { ProblemValidationExample } from '../examples'
import { TraceIdHeaderHeaderSchema } from '../headers'
import { ValidationProblemDetailsSchema } from '../schemas'

export const ValidationErrorResponse = {
  description: 'Validation error -> points to ValidationProblemDetails',
  headers: z.object({ 'x-trace-id': TraceIdHeaderHeaderSchema }),
  content: {
    'application/problem+json': {
      schema: ValidationProblemDetailsSchema,
      examples: { invalid: ProblemValidationExample },
    },
  },
}
