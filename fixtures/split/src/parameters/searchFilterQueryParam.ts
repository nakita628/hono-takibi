import { z } from '@hono/zod-openapi'
import { OrderFilterExample, UserFilterExample } from '../examples'
import { SearchFilterSchema } from '../schemas'

export const SearchFilterQueryParamParamsSchema = SearchFilterSchema.exactOptional().openapi({
  param: {
    name: 'filter',
    in: 'query',
    required: false,
    description:
      'JSON-encoded filter object in query param (content-based parameter).\n参照地獄: content -> schema -> unions -> full objects -> recursion\n',
    content: {
      'application/json': {
        schema: { $ref: '#/components/schemas/SearchFilter' },
        examples: {
          userFilter: { $ref: '#/components/examples/UserFilterExample' },
          orderFilter: { $ref: '#/components/examples/OrderFilterExample' },
        },
      },
    },
  },
})

export type SearchFilterQueryParamParams = z.infer<typeof SearchFilterQueryParamParamsSchema>
