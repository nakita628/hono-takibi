import { z } from '@hono/zod-openapi'
import { OrderExample } from '../examples'
import { TraceIdHeaderHeaderSchema } from '../headers'
import { GetOrderLink, GetUserFromOrderLink } from '../links'
import { OrderSchema } from '../schemas'

export const OrderResponse = {
  description: 'An order',
  headers: z.object({ 'x-trace-id': TraceIdHeaderHeaderSchema }),
  content: { 'application/json': { schema: OrderSchema, examples: { order: OrderExample } } },
  links: { self: GetOrderLink, buyer: GetUserFromOrderLink },
}
