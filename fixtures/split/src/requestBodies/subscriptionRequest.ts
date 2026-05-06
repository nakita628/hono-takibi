import { WebhookSubscriptionSchema } from '../schemas'
import { SubscriptionExampleExample } from '../examples'

export const SubscriptionRequestRequestBody = {
  content: {
    'application/json': {
      schema: WebhookSubscriptionSchema,
      examples: { create: SubscriptionExampleExample },
    },
  },
  required: true,
}
