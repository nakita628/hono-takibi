import { WebhookEventSchema } from '../schemas'
import { WebhookEventExampleExample } from '../examples'

export const WebhookEventRequestRequestBody = {
  content: {
    'application/json': {
      schema: WebhookEventSchema,
      examples: { event: WebhookEventExampleExample },
    },
  },
  required: true,
}
