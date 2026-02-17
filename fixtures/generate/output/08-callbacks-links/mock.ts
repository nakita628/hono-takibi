import { OpenAPIHono, createRoute, z, type RouteHandler } from '@hono/zod-openapi'
import { faker } from '@faker-js/faker'

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

const GetSubscriptionLink = {
  operationId: 'getSubscription',
  parameters: { id: '$response.body#/id' },
  description: 'Get the created subscription',
}

const DeleteSubscriptionLink = {
  operationId: 'deleteSubscription',
  parameters: { id: '$request.path.id' },
  description: 'Delete this subscription',
}

const SubscriptionEventCallback = {
  '{$request.body#/callbackUrl}': {
    post: {
      operationId: 'subscriptionEventCallback',
      requestBody: { content: { 'application/json': { schema: EventPayloadSchema } } },
      responses: { 200: { description: 'Event processed' } },
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

function mockSubscription() {
  return {
    id: faker.string.alpha({ length: { min: 5, max: 20 } }),
    callbackUrl: faker.internet.url(),
    events: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () =>
      faker.string.alpha({ length: { min: 5, max: 20 } }),
    ),
    status: faker.helpers.arrayElement(['active', 'paused', 'cancelled'] as const),
  }
}

const postSubscriptionsRouteHandler: RouteHandler<typeof postSubscriptionsRoute> = async (c) => {
  return c.json(mockSubscription(), 201)
}

const getSubscriptionsIdRouteHandler: RouteHandler<typeof getSubscriptionsIdRoute> = async (c) => {
  return c.json(mockSubscription(), 200)
}

const deleteSubscriptionsIdRouteHandler: RouteHandler<typeof deleteSubscriptionsIdRoute> = async (
  _c,
) => {
  return new Response(null, { status: 204 })
}

const postWebhooksTestRouteHandler: RouteHandler<typeof postWebhooksTestRoute> = async (c) => {
  return c.json(
    {
      sent: faker.datatype.boolean(),
    },
    200,
  )
}

const app = new OpenAPIHono().basePath('undefined')

export const api = app
  .openapi(postSubscriptionsRoute, postSubscriptionsRouteHandler)
  .openapi(getSubscriptionsIdRoute, getSubscriptionsIdRouteHandler)
  .openapi(deleteSubscriptionsIdRoute, deleteSubscriptionsIdRouteHandler)
  .openapi(postWebhooksTestRoute, postWebhooksTestRouteHandler)

export default app
