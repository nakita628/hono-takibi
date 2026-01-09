import { z } from '@hono/zod-openapi'
import { ProblemDetailsSchema } from './problemDetails'
import { FieldErrorSchema } from './fieldError'

export const ValidationProblemDetailsSchema = ProblemDetailsSchema.and(
  z.object({ errors: z.array(FieldErrorSchema) }).openapi({ required: ['errors'] }),
).openapi('ValidationProblemDetails')

export type ValidationProblemDetails = z.infer<typeof ValidationProblemDetailsSchema>
