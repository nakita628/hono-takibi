import { z } from '@hono/zod-openapi'
import { ProblemDetailsSchema } from './problemDetails'

type FieldErrorType = {
  path: string
  message: string
  nested?: FieldErrorType
  problem?: z.infer<typeof ProblemDetailsSchema>
}

export const FieldErrorSchema: z.ZodType<FieldErrorType> = z
  .lazy(() =>
    z
      .object({
        path: z.string(),
        message: z.string(),
        nested: FieldErrorSchema.exactOptional(),
        problem: ProblemDetailsSchema.exactOptional(),
      })
      .openapi({ required: ['path', 'message'] }),
  )
  .openapi('FieldError')

export type FieldError = z.infer<typeof FieldErrorSchema>
