import { z } from '@hono/zod-openapi'
import { CursorSchema, MetaSchema, OrderSchema } from '../schemas'
import { TraceIdHeaderHeaderSchema } from '../headers'
import { OrderListExample } from '../examples'
import { ListOrdersNextPageLink } from '../links'

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
