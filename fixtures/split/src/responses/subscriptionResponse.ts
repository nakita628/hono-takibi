import { z } from '@hono/zod-openapi'
import { WebhookSubscriptionSchema } from '../schemas'
import { SubscriptionExampleExample } from '../examples'
import { TraceIdHeaderHeaderSchema } from '../headers'

export const SubscriptionResponseResponse = {
  description: 'A webhook subscription',
  headers: z.object({ 'x-trace-id': TraceIdHeaderHeaderSchema }),
  content: {
    'application/json': {
      schema: WebhookSubscriptionSchema,
      examples: { subscription: SubscriptionExampleExample },
    },
  },
}
