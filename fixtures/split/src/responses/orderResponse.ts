import { z } from '@hono/zod-openapi'
import { OrderSchema } from '../schemas'
import { TraceIdHeaderHeaderSchema } from '../headers'
import { OrderExample } from '../examples'
import { GetOrderLink, GetUserFromOrderLink } from '../links'

export const OrderResponse = {
  description: 'An order',
  headers: z.object({ 'x-trace-id': TraceIdHeaderHeaderSchema }),
  content: { 'application/json': { schema: OrderSchema, examples: { order: OrderExample } } },
  links: { self: GetOrderLink, buyer: GetUserFromOrderLink },
}
