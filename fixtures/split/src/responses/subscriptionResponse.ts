import { z } from '@hono/zod-openapi'
import { SubscriptionExample } from '../examples'
import { TraceIdHeaderHeaderSchema } from '../headers'
import { WebhookSubscriptionSchema } from '../schemas'

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
