import { z } from '@hono/zod-openapi'
import { ValidationProblemDetailsSchema } from '../schemas'
import { TraceIdHeaderHeaderSchema } from '../headers'
import { ProblemValidationExample } from '../examples'

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
