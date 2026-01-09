import { z } from '@hono/zod-openapi'

export const TraceIdSchema = z
  .string()
  .min(8)
  .max(128)
  .openapi({ description: 'Correlation id for tracing; also appears as header/parameter/example' })
  .openapi('TraceId')

export type TraceId = z.infer<typeof TraceIdSchema>
