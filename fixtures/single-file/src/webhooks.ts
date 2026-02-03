import { createRoute, z } from '@hono/zod-openapi'

const UserEventPayloadSchema = z
  .object({ user: UserSchema, previous: UserSchema.exactOptional() })
  .openapi({ required: ['user'] })
  .openapi('UserEventPayload')

const OrderEventPayloadSchema = z
  .object({ order: OrderSchema, previousStatus: OrderStatusSchema.exactOptional() })
  .openapi({ required: ['order'] })
  .openapi('OrderEventPayload')

const SystemEventPayloadSchema = z
  .object({ message: z.string(), related: EntityRefSchema.exactOptional() })
  .openapi({ required: ['message'] })
  .openapi('SystemEventPayload')

const IdSchema = z
  .xor([UuidSchema, UlidSchema])
  .openapi({ description: 'Primary identifier (uuid or ulid) - used everywhere' })
  .openapi('Id')

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

export const systemAlertPostWebhook = {
  method: 'post',
  path: '/systemAlert',
  tags: ['Webhooks'],
  summary: 'System alert webhook',
  operationId: 'onSystemAlert',
  request: {
    body: { content: { 'application/json': { schema: SystemEventPayloadSchema } }, required: true },
  },
  responses: {
    200: {
      description: 'Alert acknowledged',
      headers: z.object({ 'x-trace-id': TraceIdHeaderHeaderSchema }),
      content: {
        'application/json': {
          schema: z
            .object({ acknowledged: z.boolean(), alertId: IdSchema.exactOptional() })
            .openapi({ required: ['acknowledged'] }),
        },
      },
    },
    default: DefaultErrorResponse,
  },
}
