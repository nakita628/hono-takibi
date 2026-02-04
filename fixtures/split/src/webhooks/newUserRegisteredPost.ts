import { z } from '@hono/zod-openapi'
import { UserEventPayloadSchema } from '../schemas'
import { DefaultErrorResponse } from '../responses'
import { UserFullExample } from '../examples'

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
