import { z } from '@hono/zod-openapi'
import { WebhookSubscriptionSchema } from '../schemas'
import { TraceIdHeaderHeaderSchema } from '../headers'
import { SubscriptionExample } from '../examples'

export const SubscriptionResponse = {
  description: 'A webhook subscription',
  headers: z.object({ 'x-trace-id': TraceIdHeaderHeaderSchema }),
  content: {
    'application/json': {
      schema: WebhookSubscriptionSchema,
      examples: { subscription: SubscriptionExample },
    },
  },
}
