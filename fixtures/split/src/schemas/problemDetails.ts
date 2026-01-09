import { z } from '@hono/zod-openapi'
import { TraceIdSchema } from './traceId'

type ProblemDetailsType = {
  type: string
  title: string
  status: number
  detail?: string
  instance?: string
  traceId?: z.infer<typeof TraceIdSchema>
  causes?: ProblemDetailsType[]
}

export const ProblemDetailsSchema: z.ZodType<ProblemDetailsType> = z
  .lazy(() =>
    z
      .object({
        type: z.url(),
        title: z.string(),
        status: z.int(),
        detail: z.string().exactOptional(),
        instance: z.string().exactOptional(),
        traceId: TraceIdSchema.exactOptional(),
        causes: z.array(ProblemDetailsSchema).exactOptional(),
      })
      .openapi({ required: ['type', 'title', 'status'] }),
  )
  .openapi('ProblemDetails')

export type ProblemDetails = z.infer<typeof ProblemDetailsSchema>
