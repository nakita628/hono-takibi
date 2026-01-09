import { z } from '@hono/zod-openapi'
import { FieldErrorSchema } from './fieldError'
import { ProblemDetailsSchema } from './problemDetails'

export const ValidationProblemDetailsSchema = ProblemDetailsSchema.and(
  z.object({ errors: z.array(FieldErrorSchema) }).openapi({ required: ['errors'] }),
).openapi('ValidationProblemDetails')

export type ValidationProblemDetails = z.infer<typeof ValidationProblemDetailsSchema>
