import type { z } from '@hono/zod-openapi'
import { IdSchema } from '../schemas'

export const OrderIdPathParamParamsSchema = IdSchema.openapi({
  param: {
    name: 'orderId',
    in: 'path',
    required: true,
    schema: { $ref: '#/components/schemas/Id' },
  },
})

export type OrderIdPathParamParams = z.infer<typeof OrderIdPathParamParamsSchema>
