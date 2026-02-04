import { z } from '@hono/zod-openapi'
import { DefaultErrorResponse } from '../responses'
import { OrderEventPayloadSchema } from '../schemas'

export const orderStatusChangedPostWebhook = {
  method: 'post',
  path: '/orderStatusChanged',
  tags: ['Webhooks'],
  summary: 'Order status changed webhook',
  operationId: 'onOrderStatusChanged',
  request: {
    body: {
      content: {
        'application/json': {
          schema: OrderEventPayloadSchema,
          examples: {
            orderShipped: {
              value: {
                order: {
                  id: '01J1K9N3E6R6ZK7Z6B0Q9Q3H3J',
                  meta: { createdAt: '2026-01-04T00:00:00Z' },
                  buyer: {
                    id: '01J1K9N3E6R6ZK7Z6B0Q9Q3H3J',
                    meta: { createdAt: '2026-01-04T00:00:00Z' },
                    name: 'Minimal User',
                    email: 'min@example.com',
                  },
                  status: 'shipped',
                  items: [],
                },
                previousStatus: 'paid',
              },
            },
          },
        },
      },
      required: true,
    },
  },
  responses: {
    200: {
      description: 'Webhook acknowledged',
      content: {
        'application/json': {
          schema: z.object({
            received: z.boolean().exactOptional(),
            processedAt: z.iso.datetime().exactOptional(),
          }),
        },
      },
    },
    default: DefaultErrorResponse,
  },
}
