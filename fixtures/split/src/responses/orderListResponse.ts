import { z } from '@hono/zod-openapi'
import { CursorSchema, MetaSchema, OrderSchema } from '../schemas'
import { TraceIdHeaderHeaderSchema } from '../headers'
import { OrderListExampleExample } from '../examples'
import { ListOrdersNextPageLinkLink } from '../links'

export const OrderListResponseResponse = {
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
      examples: { list: OrderListExampleExample },
    },
  },
  links: { next: ListOrdersNextPageLinkLink },
}
