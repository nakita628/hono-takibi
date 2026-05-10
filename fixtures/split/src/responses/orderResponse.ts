import { z } from '@hono/zod-openapi'
import { OrderSchema } from '../schemas'
import { OrderExampleExample } from '../examples'
import { TraceIdHeaderHeaderSchema } from '../headers'
import { GetOrderLinkLink, GetUserFromOrderLinkLink } from '../links'

export const OrderResponseResponse = {
  description: 'An order',
  headers: z.object({ 'x-trace-id': TraceIdHeaderHeaderSchema }),
  content: {
    'application/json': { schema: OrderSchema, examples: { order: OrderExampleExample } },
  },
  links: { self: GetOrderLinkLink, buyer: GetUserFromOrderLinkLink },
}
