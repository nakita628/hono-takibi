import { z } from '@hono/zod-openapi'
import { TraceIdSchema } from '../schemas'

export const TraceIdHeaderParamParamsSchema = TraceIdSchema.exactOptional().openapi({
  param: {
    name: 'x-trace-id',
    in: 'header',
    required: false,
    description: 'Correlation id (parameter) - schema refs TraceId',
    schema: { $ref: '#/components/schemas/TraceId' },
    example: 'trace-01J1K9N3E6R6ZK7Z6B0Q9Q3H3J',
  },
})

export type TraceIdHeaderParamParams = z.infer<typeof TraceIdHeaderParamParamsSchema>
