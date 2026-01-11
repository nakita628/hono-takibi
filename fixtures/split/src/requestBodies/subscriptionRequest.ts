import { SubscriptionExample } from '../examples'
import { WebhookSubscriptionSchema } from '../schemas'

export const SubscriptionRequestRequestBody = {
  content: {
    'application/json': {
      schema: WebhookSubscriptionSchema,
      examples: { create: SubscriptionExample },
    },
  },
  required: true,
}
