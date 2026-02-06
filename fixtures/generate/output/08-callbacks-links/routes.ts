import { createRoute, z } from '@hono/zod-openapi'

const SubscriptionRequestSchema = z
  .object({ callbackUrl: z.url(), events: z.array(z.enum(['created', 'updated', 'deleted'])) })
  .openapi({ required: ['callbackUrl', 'events'] })
  .openapi('SubscriptionRequest')

const SubscriptionSchema = z
  .object({
    id: z.string(),
    callbackUrl: z.url(),
    events: z.array(z.string()),
    status: z.enum(['active', 'paused', 'cancelled']),
  })
  .openapi({ required: ['id', 'callbackUrl', 'events', 'status'] })
  .openapi('Subscription')

const EventPayloadSchema = z
  .object({
    event: z.string(),
    timestamp: z.iso.datetime(),
    data: z.looseObject({}).exactOptional(),
  })
  .openapi({ required: ['event', 'timestamp'] })
  .openapi('EventPayload')

export const GetSubscriptionLink = {
  operationId: 'getSubscription',
  parameters: { id: '$response.body#/id' },
  description: 'Get the created subscription',
}

export const DeleteSubscriptionLink = {
  operationId: 'deleteSubscription',
  parameters: { id: '$request.path.id' },
  description: 'Delete this subscription',
}

export const SubscriptionEventCallback = {
  '{$request.body#/callbackUrl}': {
    post: {
      operationId: 'subscriptionEventCallback',
      requestBody: {
        content: { 'application/json': { schema: { $ref: '#/components/schemas/EventPayload' } } },
      },
      responses: { '200': { description: 'Event processed' } },
    },
  },
}

export const postSubscriptionsRoute = createRoute({
  method: 'post',
  path: '/subscriptions',
  operationId: 'createSubscription',
  request: {
    body: {
      content: { 'application/json': { schema: SubscriptionRequestSchema } },
      required: true,
    },
  },
  responses: {
    201: {
      description: 'Created',
      content: { 'application/json': { schema: SubscriptionSchema } },
      links: { GetSubscription: GetSubscriptionLink },
    },
  },
  callbacks: { onEvent: SubscriptionEventCallback },
})

export const getSubscriptionsIdRoute = createRoute({
  method: 'get',
  path: '/subscriptions/{id}',
  operationId: 'getSubscription',
  request: {
    params: z.object({
      id: z
        .string()
        .openapi({ param: { name: 'id', in: 'path', required: true, schema: { type: 'string' } } }),
    }),
  },
  responses: {
    200: {
      description: 'OK',
      content: { 'application/json': { schema: SubscriptionSchema } },
      links: { DeleteSubscription: DeleteSubscriptionLink },
    },
  },
})

export const deleteSubscriptionsIdRoute = createRoute({
  method: 'delete',
  path: '/subscriptions/{id}',
  operationId: 'deleteSubscription',
  request: {
    params: z.object({
      id: z
        .string()
        .openapi({ param: { name: 'id', in: 'path', required: true, schema: { type: 'string' } } }),
    }),
  },
  responses: { 204: { description: 'Deleted' } },
})

export const postWebhooksTestRoute = createRoute({
  method: 'post',
  path: '/webhooks/test',
  operationId: 'testWebhook',
  request: {
    body: {
      content: {
        'application/json': { schema: z.object({ url: z.url() }).openapi({ required: ['url'] }) },
      },
      required: true,
    },
  },
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z.object({ sent: z.boolean() }).openapi({ required: ['sent'] }),
        },
      },
    },
  },
})
