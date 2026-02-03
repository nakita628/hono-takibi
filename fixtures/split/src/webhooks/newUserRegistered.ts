import { createRoute, z } from '@hono/zod-openapi'

const UserEventPayloadSchema = z
  .object({ user: UserSchema, previous: UserSchema.exactOptional() })
  .openapi({ required: ['user'] })
  .openapi('UserEventPayload')

export const newUserRegisteredPostWebhook = {
  method: 'post',
  path: '/newUserRegistered',
  tags: ['Webhooks'],
  summary: 'New user registered webhook',
  operationId: 'onNewUserRegistered',
  request: {
    body: {
      content: {
        'application/json': {
          schema: UserEventPayloadSchema,
          examples: { userCreated: UserFullExample },
        },
      },
      required: true,
    },
  },
  responses: {
    200: {
      description: 'Webhook acknowledged',
      content: {
        'application/json': { schema: z.object({ received: z.boolean().exactOptional() }) },
      },
    },
    default: DefaultErrorResponse,
  },
}
