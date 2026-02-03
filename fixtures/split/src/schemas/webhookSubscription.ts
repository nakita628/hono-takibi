import { z } from '@hono/zod-openapi'
import { EntitySchema } from './entity'
import { EventTypeSchema } from './eventType'
import { SecretRefSchema } from './secretRef'
import { EventSchema } from './event'

export const WebhookSubscriptionSchema = EntitySchema.and(
  z
    .object({
      callbackUrl: z.url(),
      events: z.array(EventTypeSchema),
      secret: SecretRefSchema.exactOptional(),
      lastEvent: EventSchema.exactOptional(),
    })
    .openapi({ required: ['callbackUrl', 'events'] }),
).openapi('WebhookSubscription')

export type WebhookSubscription = z.infer<typeof WebhookSubscriptionSchema>
