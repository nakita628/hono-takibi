import { z } from '@hono/zod-openapi'
import { LinkSchema } from '../schemas'
import { TraceIdHeaderParamParamsSchema } from '../parameters'
import { WebhookEventRequestRequestBody } from '../requestBodies'
import { DefaultErrorResponse } from '../responses'
import { TraceIdHeaderHeaderSchema } from '../headers'

export const SubscriptionLifecycleCallback = {
  '{$request.body#/callbackUrl}': {
    post: {
      summary: 'Subscription lifecycle callback',
      operationId: 'onSubscriptionEvent',
      parameters: [TraceIdHeaderParamParamsSchema],
      requestBody: WebhookEventRequestRequestBody,
      responses: {
        200: {
          description: 'Ack',
          headers: z.object({ 'x-trace-id': TraceIdHeaderHeaderSchema }),
          content: {
            'application/json': {
              schema: z.object({
                ok: z.boolean().exactOptional(),
                next: LinkSchema.exactOptional(),
              }),
              examples: { ack: { value: { ok: true, next: { href: '/subscriptions' } } } },
            },
          },
        },
        default: DefaultErrorResponse,
      },
    },
  },
}
