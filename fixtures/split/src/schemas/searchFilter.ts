import { z } from '@hono/zod-openapi'
import { CompanyFilterSchema } from './companyFilter'
import { OrderFilterSchema } from './orderFilter'
import { UserFilterSchema } from './userFilter'

export const SearchFilterSchema = z
  .xor([UserFilterSchema, OrderFilterSchema, CompanyFilterSchema])
  .openapi({
    description: 'Query filter represented as JSON in a query param (evil)',
    discriminator: {
      propertyName: 'kind',
      mapping: {
        user: '#/components/schemas/UserFilter',
        order: '#/components/schemas/OrderFilter',
        company: '#/components/schemas/CompanyFilter',
      },
    },
  })
  .openapi('SearchFilter')

export type SearchFilter = z.infer<typeof SearchFilterSchema>
