import { createRoute, z } from '@hono/zod-openapi'

const OrderSchema = z
  .object({
    id: z.uuid().openapi({ type: 'string', format: 'uuid' }),
    customerId: z.uuid().openapi({ type: 'string', format: 'uuid' }),
    paymentId: z.uuid().optional().openapi({ type: 'string', format: 'uuid' }),
    status: z
      .enum(['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'])
      .openapi({
        type: 'string',
        enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
      }),
    total: z.float64().openapi({ type: 'number', format: 'float64' }),
    createdAt: z.iso.datetime().optional().openapi({ type: 'string', format: 'date-time' }),
  })
  .openapi({
    type: 'object',
    required: ['id', 'customerId', 'status', 'total'],
    properties: {
      id: { type: 'string', format: 'uuid' },
      customerId: { type: 'string', format: 'uuid' },
      paymentId: { type: 'string', format: 'uuid' },
      status: {
        type: 'string',
        enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
      },
      total: { type: 'number', format: 'float64' },
      createdAt: { type: 'string', format: 'date-time' },
    },
  })
  .openapi('Order')

const OrderItemSchema = z
  .object({
    id: z.uuid().openapi({ type: 'string', format: 'uuid' }),
    productId: z.uuid().openapi({ type: 'string', format: 'uuid' }),
    productName: z.string().optional().openapi({ type: 'string' }),
    quantity: z.int32().openapi({ type: 'integer', format: 'int32' }),
    price: z.float64().openapi({ type: 'number', format: 'float64' }),
  })
  .openapi({
    type: 'object',
    required: ['id', 'productId', 'quantity', 'price'],
    properties: {
      id: { type: 'string', format: 'uuid' },
      productId: { type: 'string', format: 'uuid' },
      productName: { type: 'string' },
      quantity: { type: 'integer', format: 'int32' },
      price: { type: 'number', format: 'float64' },
    },
  })
  .openapi('OrderItem')

const CustomerSchema = z
  .object({
    id: z.uuid().openapi({ type: 'string', format: 'uuid' }),
    email: z.email().openapi({ type: 'string', format: 'email' }),
    name: z.string().optional().openapi({ type: 'string' }),
  })
  .openapi({
    type: 'object',
    required: ['id', 'email'],
    properties: {
      id: { type: 'string', format: 'uuid' },
      email: { type: 'string', format: 'email' },
      name: { type: 'string' },
    },
  })
  .openapi('Customer')

const PaymentSchema = z
  .object({
    id: z.uuid().openapi({ type: 'string', format: 'uuid' }),
    orderId: z.uuid().openapi({ type: 'string', format: 'uuid' }),
    amount: z.float64().openapi({ type: 'number', format: 'float64' }),
    status: z
      .enum(['pending', 'completed', 'failed', 'refunded'])
      .openapi({ type: 'string', enum: ['pending', 'completed', 'failed', 'refunded'] }),
    method: z
      .enum(['credit_card', 'debit_card', 'paypal', 'bank_transfer'])
      .optional()
      .openapi({ type: 'string', enum: ['credit_card', 'debit_card', 'paypal', 'bank_transfer'] }),
  })
  .openapi({
    type: 'object',
    required: ['id', 'orderId', 'amount', 'status'],
    properties: {
      id: { type: 'string', format: 'uuid' },
      orderId: { type: 'string', format: 'uuid' },
      amount: { type: 'number', format: 'float64' },
      status: { type: 'string', enum: ['pending', 'completed', 'failed', 'refunded'] },
      method: { type: 'string', enum: ['credit_card', 'debit_card', 'paypal', 'bank_transfer'] },
    },
  })
  .openapi('Payment')

const CreateOrderInputSchema = z
  .object({
    customerId: z.uuid().openapi({ type: 'string', format: 'uuid' }),
    items: z
      .array(
        z
          .object({
            productId: z.uuid().openapi({ type: 'string', format: 'uuid' }),
            quantity: z.int().min(1).openapi({ type: 'integer', minimum: 1 }),
          })
          .openapi({
            type: 'object',
            required: ['productId', 'quantity'],
            properties: {
              productId: { type: 'string', format: 'uuid' },
              quantity: { type: 'integer', minimum: 1 },
            },
          }),
      )
      .min(1)
      .openapi({
        type: 'array',
        minItems: 1,
        items: {
          type: 'object',
          required: ['productId', 'quantity'],
          properties: {
            productId: { type: 'string', format: 'uuid' },
            quantity: { type: 'integer', minimum: 1 },
          },
        },
      }),
  })
  .openapi({
    type: 'object',
    required: ['customerId', 'items'],
    properties: {
      customerId: { type: 'string', format: 'uuid' },
      items: {
        type: 'array',
        minItems: 1,
        items: {
          type: 'object',
          required: ['productId', 'quantity'],
          properties: {
            productId: { type: 'string', format: 'uuid' },
            quantity: { type: 'integer', minimum: 1 },
          },
        },
      },
    },
  })
  .openapi('CreateOrderInput')

const GetOrderByIdLink = {
  operationId: 'getOrder',
  parameters: { orderId: '$response.body#/id' },
  description: 'Get the created/referenced order by ID',
}

const GetOrderItemsLink = {
  operationId: 'getOrderItems',
  parameters: { orderId: '$response.body#/id' },
  description: 'Get items for this order',
}

const GetCustomerLink = {
  operationId: 'getCustomer',
  parameters: { customerId: '$response.body#/customerId' },
  description: 'Get customer who placed this order',
}

const GetCustomerOrdersLink = {
  operationId: 'getCustomerOrders',
  parameters: { customerId: '$response.body#/id' },
  description: 'Get all orders for this customer',
}

const CancelOrderLink = {
  operationId: 'cancelOrder',
  parameters: { orderId: '$response.body#/id' },
  description: 'Cancel this order',
}

const GetPaymentLink = {
  operationId: 'getPayment',
  parameters: { paymentId: '$response.body#/paymentId' },
  description: 'Get payment details for this order',
}

export const postOrdersRoute = createRoute({
  method: 'post',
  path: '/orders',
  operationId: 'createOrder',
  request: { body: { content: { 'application/json': { schema: CreateOrderInputSchema } } } },
  responses: {
    201: { description: 'Order created', content: { 'application/json': { schema: OrderSchema } } },
  },
})

export const getOrdersOrderIdRoute = createRoute({
  method: 'get',
  path: '/orders/{orderId}',
  operationId: 'getOrder',
  request: {
    params: z.object({
      orderId: z
        .uuid()
        .openapi({
          param: {
            name: 'orderId',
            in: 'path',
            required: true,
            schema: { type: 'string', format: 'uuid' },
          },
          type: 'string',
          format: 'uuid',
        }),
    }),
  },
  responses: {
    200: { description: 'Order details', content: { 'application/json': { schema: OrderSchema } } },
  },
})

export const deleteOrdersOrderIdRoute = createRoute({
  method: 'delete',
  path: '/orders/{orderId}',
  operationId: 'cancelOrder',
  request: {
    params: z.object({
      orderId: z
        .uuid()
        .openapi({
          param: {
            name: 'orderId',
            in: 'path',
            required: true,
            schema: { type: 'string', format: 'uuid' },
          },
          type: 'string',
          format: 'uuid',
        }),
    }),
  },
  responses: { 200: { description: 'Order cancelled' } },
})

export const getOrdersOrderIdItemsRoute = createRoute({
  method: 'get',
  path: '/orders/{orderId}/items',
  operationId: 'getOrderItems',
  request: {
    params: z.object({
      orderId: z
        .uuid()
        .openapi({
          param: {
            name: 'orderId',
            in: 'path',
            required: true,
            schema: { type: 'string', format: 'uuid' },
          },
          type: 'string',
          format: 'uuid',
        }),
    }),
  },
  responses: {
    200: {
      description: 'Order items',
      content: {
        'application/json': {
          schema: z
            .array(OrderItemSchema)
            .openapi({ type: 'array', items: { $ref: '#/components/schemas/OrderItem' } }),
        },
      },
    },
  },
})

export const getCustomersCustomerIdRoute = createRoute({
  method: 'get',
  path: '/customers/{customerId}',
  operationId: 'getCustomer',
  request: {
    params: z.object({
      customerId: z
        .uuid()
        .openapi({
          param: {
            name: 'customerId',
            in: 'path',
            required: true,
            schema: { type: 'string', format: 'uuid' },
          },
          type: 'string',
          format: 'uuid',
        }),
    }),
  },
  responses: {
    200: {
      description: 'Customer details',
      content: { 'application/json': { schema: CustomerSchema } },
    },
  },
})

export const getCustomersCustomerIdOrdersRoute = createRoute({
  method: 'get',
  path: '/customers/{customerId}/orders',
  operationId: 'getCustomerOrders',
  request: {
    params: z.object({
      customerId: z
        .uuid()
        .openapi({
          param: {
            name: 'customerId',
            in: 'path',
            required: true,
            schema: { type: 'string', format: 'uuid' },
          },
          type: 'string',
          format: 'uuid',
        }),
    }),
  },
  responses: {
    200: {
      description: 'Customer orders',
      content: {
        'application/json': {
          schema: z
            .array(OrderSchema)
            .openapi({ type: 'array', items: { $ref: '#/components/schemas/Order' } }),
        },
      },
    },
  },
})

export const getPaymentsPaymentIdRoute = createRoute({
  method: 'get',
  path: '/payments/{paymentId}',
  operationId: 'getPayment',
  request: {
    params: z.object({
      paymentId: z
        .uuid()
        .openapi({
          param: {
            name: 'paymentId',
            in: 'path',
            required: true,
            schema: { type: 'string', format: 'uuid' },
          },
          type: 'string',
          format: 'uuid',
        }),
    }),
  },
  responses: {
    200: {
      description: 'Payment details',
      content: { 'application/json': { schema: PaymentSchema } },
    },
  },
})
