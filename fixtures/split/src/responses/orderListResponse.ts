import { z } from '@hono/zod-openapi'
import { OrderListExample } from '../examples'
import { TraceIdHeaderHeaderSchema } from '../headers'
import { ListOrdersNextPageLink } from '../links'
import { CursorSchema, MetaSchema, OrderSchema } from '../schemas'

export const OrderListResponse = {
  description: 'Orders list (paged)',
  headers: z.object({ 'x-trace-id': TraceIdHeaderHeaderSchema }),
  content: {
    'application/json': {
      schema: z
        .object({
          items: z.array(OrderSchema),
          nextCursor: CursorSchema.exactOptional(),
          meta: MetaSchema.exactOptional(),
        })
        .openapi({ required: ['items'] }),
      examples: { list: OrderListExample },
    },
  },
  links: { next: ListOrdersNextPageLink },
}
