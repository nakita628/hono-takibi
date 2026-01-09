import type { z } from '@hono/zod-openapi'
import { TraceIdSchema } from '../schemas'

export const TraceIdHeaderParamParamsSchema = TraceIdSchema.exactOptional().openapi({
  param: {
    name: 'x-trace-id',
    in: 'header',
    required: false,
    description: 'Correlation id (parameter) - schema refs TraceId',
    schema: { $ref: '#/components/schemas/TraceId' },
    example: { $ref: '#/components/examples/TraceIdExample/value' },
  },
})

export type TraceIdHeaderParamParams = z.infer<typeof TraceIdHeaderParamParamsSchema>
