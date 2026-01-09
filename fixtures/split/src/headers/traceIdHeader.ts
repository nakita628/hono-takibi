import { z } from '@hono/zod-openapi'
import { TraceIdSchema } from '../schemas'
import { TraceIdExample } from '../examples'

export const TraceIdHeaderHeaderSchema = TraceIdSchema.exactOptional().openapi({
  description: 'Trace id header component (same concept as parameter)',
  example: { $ref: '#/components/examples/TraceIdExample/value' },
})

export type TraceIdHeaderHeader = z.infer<typeof TraceIdHeaderHeaderSchema>
