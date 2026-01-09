import { z } from '@hono/zod-openapi'
import { TraceIdSchema } from './traceId'

type TraceContextType = {
  traceId: z.infer<typeof TraceIdSchema>
  parent?: TraceContextType
  baggage?: { [key: string]: string }
}

export const TraceContextSchema: z.ZodType<TraceContextType> = z
  .lazy(() =>
    z
      .object({
        traceId: TraceIdSchema,
        parent: TraceContextSchema.exactOptional(),
        baggage: z.record(z.string(), z.string()).exactOptional(),
      })
      .openapi({ required: ['traceId'] }),
  )
  .openapi('TraceContext')

export type TraceContext = z.infer<typeof TraceContextSchema>
