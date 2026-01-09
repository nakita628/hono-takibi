import type { z } from '@hono/zod-openapi'
import { IdSchema } from '../schemas'

export const BuyerIdQueryParamParamsSchema = IdSchema.exactOptional().openapi({
  param: {
    name: 'buyerId',
    in: 'query',
    required: false,
    schema: { $ref: '#/components/schemas/Id' },
  },
})

export type BuyerIdQueryParamParams = z.infer<typeof BuyerIdQueryParamParamsSchema>
