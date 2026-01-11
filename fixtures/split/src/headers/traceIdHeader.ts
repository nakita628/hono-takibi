import { z } from '@hono/zod-openapi'
import { TraceIdSchema } from '../schemas'

export const TraceIdHeaderHeaderSchema = TraceIdSchema.exactOptional().openapi({
  description: 'Trace id header component (same concept as parameter)',
  example: 'trace-01J1K9N3E6R6ZK7Z6B0Q9Q3H3J',
})

export type TraceIdHeaderHeader = z.infer<typeof TraceIdHeaderHeaderSchema>
