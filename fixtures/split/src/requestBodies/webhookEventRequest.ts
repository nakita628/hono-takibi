import { WebhookEventSchema } from '../schemas'
import { WebhookEventExample } from '../examples'

export const WebhookEventRequestRequestBody = {
  content: {
    'application/json': { schema: WebhookEventSchema, examples: { event: WebhookEventExample } },
  },
  required: true,
}
