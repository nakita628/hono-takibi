import { WebhookSubscriptionSchema } from '../schemas'
import { SubscriptionExample } from '../examples'

export const SubscriptionRequestRequestBody = {
  content: {
    'application/json': {
      schema: WebhookSubscriptionSchema,
      examples: { create: SubscriptionExample },
    },
  },
  required: true,
}
