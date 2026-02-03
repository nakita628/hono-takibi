import { createRoute, z } from '@hono/zod-openapi'

const SystemEventPayloadSchema = z
  .object({ message: z.string(), related: EntityRefSchema.exactOptional() })
  .openapi({ required: ['message'] })
  .openapi('SystemEventPayload')

const IdSchema = z
  .xor([UuidSchema, UlidSchema])
  .openapi({ description: 'Primary identifier (uuid or ulid) - used everywhere' })
  .openapi('Id')

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
