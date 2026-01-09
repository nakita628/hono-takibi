import { z } from '@hono/zod-openapi'
import { WebhookSubscriptionSchema } from './webhookSubscription'
import { EventSchema } from './event'

export const WebhookEventSchema = z
  .object({ subscription: WebhookSubscriptionSchema, event: EventSchema })
  .openapi({ required: ['subscription', 'event'] })
  .openapi('WebhookEvent')

export type WebhookEvent = z.infer<typeof WebhookEventSchema>
