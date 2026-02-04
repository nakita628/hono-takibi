import { createRoute, z } from '@hono/zod-openapi'

const ResourceSchema = z
  .object({
    id: z.uuid(),
    name: z.string(),
    description: z.string().exactOptional(),
    createdAt: z.iso.datetime().exactOptional(),
    updatedAt: z.iso.datetime().exactOptional(),
  })
  .openapi({ required: ['id', 'name'] })
  .openapi('Resource')

const ResourceUpdateSchema = z
  .object({ name: z.string().exactOptional(), description: z.string().exactOptional() })
  .openapi('ResourceUpdate')

const SubscriptionRequestSchema = z
  .object({ callbackUrl: z.url(), events: z.array(z.string()) })
  .openapi({ required: ['callbackUrl', 'events'] })
  .openapi('SubscriptionRequest')

const SubscriptionSchema = z
  .object({
    id: z.uuid(),
    callbackUrl: z.url(),
    events: z.array(z.string()),
    createdAt: z.iso.datetime().exactOptional(),
  })
  .openapi({ required: ['id', 'callbackUrl', 'events'] })
  .openapi('Subscription')

const OrderEventSchema = z
  .object({
    eventType: z.literal('order.created'),
    orderId: z.uuid(),
    customerId: z.uuid(),
    amount: z.number(),
    timestamp: z.iso.datetime(),
  })
  .openapi({ required: ['eventType', 'orderId', 'customerId', 'amount', 'timestamp'] })
  .openapi('OrderEvent')

const OrderStatusEventSchema = z
  .object({
    eventType: z.literal('order.status_changed'),
    orderId: z.uuid(),
    previousStatus: z.enum(['pending', 'processing', 'shipped', 'delivered']),
    newStatus: z.enum(['pending', 'processing', 'shipped', 'delivered']),
    timestamp: z.iso.datetime(),
  })
  .openapi({ required: ['eventType', 'orderId', 'previousStatus', 'newStatus', 'timestamp'] })
  .openapi('OrderStatusEvent')

const UserEventSchema = z
  .object({
    eventType: z.literal('user.created'),
    userId: z.uuid(),
    email: z.email(),
    timestamp: z.iso.datetime(),
  })
  .openapi({ required: ['eventType', 'userId', 'email', 'timestamp'] })
  .openapi('UserEvent')

const ResourceCrudPathItem = {
  parameters: [
    {
      name: 'id',
      in: 'path',
      required: true,
      schema: { type: 'string', format: 'uuid' },
    },
  ],
  get: {
    operationId: 'getResource',
    summary: 'Get a resource by ID',
    responses: {
      '200': {
        description: 'Resource found',
        content: { 'application/json': { schema: ResourceSchema } },
      },
    },
  },
}

export const getHealthRoute = createRoute({
  method: 'get',
  path: '/health',
  summary: 'Health check endpoint',
  operationId: 'healthCheck',
  responses: { 200: { description: 'OK' } },
})

export const getUsersIdRoute = createRoute({
  method: 'get',
  path: '/users/{id}',
  summary: 'Get a resource by ID',
  operationId: 'getResource',
  request: {
    params: z.object({
      id: z.uuid().openapi({
        param: {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'string', format: 'uuid' },
          description: 'Resource ID',
        },
      }),
    }),
  },
  responses: {
    200: {
      description: 'Resource found',
      content: { 'application/json': { schema: ResourceSchema } },
    },
    404: { description: 'Resource not found' },
  },
})

export const putUsersIdRoute = createRoute({
  method: 'put',
  path: '/users/{id}',
  summary: 'Update a resource',
  operationId: 'updateResource',
  request: {
    params: z.object({
      id: z.uuid().openapi({
        param: {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'string', format: 'uuid' },
          description: 'Resource ID',
        },
      }),
    }),
    body: { content: { 'application/json': { schema: ResourceUpdateSchema } }, required: true },
  },
  responses: {
    200: {
      description: 'Resource updated',
      content: { 'application/json': { schema: ResourceSchema } },
    },
  },
})

export const deleteUsersIdRoute = createRoute({
  method: 'delete',
  path: '/users/{id}',
  summary: 'Delete a resource',
  operationId: 'deleteResource',
  request: {
    params: z.object({
      id: z.uuid().openapi({
        param: {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'string', format: 'uuid' },
          description: 'Resource ID',
        },
      }),
    }),
  },
  responses: { 204: { description: 'Resource deleted' } },
})

export const getProductsIdRoute = createRoute({
  method: 'get',
  path: '/products/{id}',
  summary: 'Get a resource by ID',
  operationId: 'getResource',
  request: {
    params: z.object({
      id: z.uuid().openapi({
        param: {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'string', format: 'uuid' },
          description: 'Resource ID',
        },
      }),
    }),
  },
  responses: {
    200: {
      description: 'Resource found',
      content: { 'application/json': { schema: ResourceSchema } },
    },
    404: { description: 'Resource not found' },
  },
})

export const putProductsIdRoute = createRoute({
  method: 'put',
  path: '/products/{id}',
  summary: 'Update a resource',
  operationId: 'updateResource',
  request: {
    params: z.object({
      id: z.uuid().openapi({
        param: {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'string', format: 'uuid' },
          description: 'Resource ID',
        },
      }),
    }),
    body: { content: { 'application/json': { schema: ResourceUpdateSchema } }, required: true },
  },
  responses: {
    200: {
      description: 'Resource updated',
      content: { 'application/json': { schema: ResourceSchema } },
    },
  },
})

export const deleteProductsIdRoute = createRoute({
  method: 'delete',
  path: '/products/{id}',
  summary: 'Delete a resource',
  operationId: 'deleteResource',
  request: {
    params: z.object({
      id: z.uuid().openapi({
        param: {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'string', format: 'uuid' },
          description: 'Resource ID',
        },
      }),
    }),
  },
  responses: { 204: { description: 'Resource deleted' } },
})

export const postSubscriptionsRoute = createRoute({
  method: 'post',
  path: '/subscriptions',
  summary: 'Create a webhook subscription',
  operationId: 'createSubscription',
  request: {
    body: {
      content: { 'application/json': { schema: SubscriptionRequestSchema } },
      required: true,
    },
  },
  responses: {
    201: {
      description: 'Subscription created',
      content: { 'application/json': { schema: SubscriptionSchema } },
    },
  },
})

export const newOrderPostWebhook = {
  method: 'post',
  path: '/newOrder',
  summary: 'Webhook fired when a new order is created',
  operationId: 'newOrderWebhook',
  request: {
    body: { content: { 'application/json': { schema: OrderEventSchema } }, required: true },
  },
  responses: { 200: { description: 'Webhook processed successfully' } },
}

export const orderStatusChangedPostWebhook = {
  method: 'post',
  path: '/orderStatusChanged',
  summary: 'Webhook fired when order status changes',
  operationId: 'orderStatusChangedWebhook',
  request: {
    body: { content: { 'application/json': { schema: OrderStatusEventSchema } }, required: true },
  },
  responses: {
    200: { description: 'Webhook processed successfully' },
    400: { description: 'Invalid payload' },
  },
}

export const userCreatedPostWebhook = {
  method: 'post',
  path: '/userCreated',
  summary: 'Webhook fired when a new user is created',
  operationId: 'userCreatedWebhook',
  request: {
    body: { content: { 'application/json': { schema: UserEventSchema } }, required: true },
  },
  responses: { 200: { description: 'Webhook processed successfully' } },
}
