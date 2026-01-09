import { WebhookEventExample } from '../examples'
import { WebhookEventSchema } from '../schemas'

export const WebhookEventRequestRequestBody = {
  content: {
    'application/json': { schema: WebhookEventSchema, examples: { event: WebhookEventExample } },
  },
  required: true,
}
