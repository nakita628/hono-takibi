import { z } from '@hono/zod-openapi'
import { WebhookEventSchema } from '../schemas'
import { DefaultErrorResponse } from '../responses'
import { WebhookEventRequestRequestBody } from '../requestBodies'

export const OrderCreatedCallbackCallback = {
  '{$request.body#/buyer/company/primaryContact/employer/meta/links/self/href}': {
    post: {
      summary: 'Order created callback (path expression is intentionally absurd)',
      operationId: 'onOrderCreatedEvent',
      requestBody: WebhookEventRequestRequestBody,
      responses: {
        200: {
          description: 'Ack',
          content: {
            'application/json': {
              schema: z.object({
                ok: z.boolean().exactOptional(),
                echo: WebhookEventSchema.exactOptional(),
              }),
            },
          },
        },
        default: DefaultErrorResponse,
      },
    },
  },
}
