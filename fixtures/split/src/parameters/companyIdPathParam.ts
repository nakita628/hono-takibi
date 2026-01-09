import type { z } from '@hono/zod-openapi'
import { IdSchema } from '../schemas'

export const CompanyIdPathParamParamsSchema = IdSchema.openapi({
  param: {
    name: 'companyId',
    in: 'path',
    required: true,
    schema: { $ref: '#/components/schemas/Id' },
  },
})

export type CompanyIdPathParamParams = z.infer<typeof CompanyIdPathParamParamsSchema>
