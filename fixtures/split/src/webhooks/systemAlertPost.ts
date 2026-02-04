import { z } from '@hono/zod-openapi'
import { TraceIdHeaderHeaderSchema } from '../headers'
import { DefaultErrorResponse } from '../responses'
import { IdSchema, SystemEventPayloadSchema } from '../schemas'

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
