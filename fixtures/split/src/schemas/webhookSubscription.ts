import { z } from '@hono/zod-openapi'
import { EntitySchema } from './entity'
import { EventSchema } from './event'
import { EventTypeSchema } from './eventType'
import { SecretRefSchema } from './secretRef'

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
