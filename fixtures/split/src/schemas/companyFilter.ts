import { z } from '@hono/zod-openapi'
import { CompanySchema } from './company'

export const CompanyFilterSchema = z
  .object({
    kind: z.literal('company'),
    name: z.string().exactOptional(),
    parent: CompanySchema.exactOptional(),
  })
  .openapi({ required: ['kind'] })
  .openapi('CompanyFilter')

export type CompanyFilter = z.infer<typeof CompanyFilterSchema>
