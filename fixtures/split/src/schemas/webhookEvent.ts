import { z } from '@hono/zod-openapi'
import { EventSchema } from './event'
import { WebhookSubscriptionSchema } from './webhookSubscription'

export const WebhookEventSchema = z
  .object({ subscription: WebhookSubscriptionSchema, event: EventSchema })
  .openapi({ required: ['subscription', 'event'] })
  .openapi('WebhookEvent')

export type WebhookEvent = z.infer<typeof WebhookEventSchema>
