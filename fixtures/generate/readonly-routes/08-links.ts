import { createRoute, z } from '@hono/zod-openapi'

const OrderSchema = z
  .object({
    id: z.uuid(),
    customerId: z.uuid(),
    paymentId: z.uuid().exactOptional(),
    status: z.enum(['pending', 'confirmed', 'shipped', 'delivered', 'cancelled']),
    total: z.float64(),
    createdAt: z.iso.datetime().exactOptional(),
  })
  .openapi({ required: ['id', 'customerId', 'status', 'total'] })
  .readonly()
  .openapi('Order')

const OrderItemSchema = z
  .object({
    id: z.uuid(),
    productId: z.uuid(),
    productName: z.string().exactOptional(),
    quantity: z.int32(),
    price: z.float64(),
  })
  .openapi({ required: ['id', 'productId', 'quantity', 'price'] })
  .readonly()
  .openapi('OrderItem')

const CustomerSchema = z
  .object({ id: z.uuid(), email: z.email(), name: z.string().exactOptional() })
  .openapi({ required: ['id', 'email'] })
  .readonly()
  .openapi('Customer')

const PaymentSchema = z
  .object({
    id: z.uuid(),
    orderId: z.uuid(),
    amount: z.float64(),
    status: z.enum(['pending', 'completed', 'failed', 'refunded']),
    method: z.enum(['credit_card', 'debit_card', 'paypal', 'bank_transfer']).exactOptional(),
  })
  .openapi({ required: ['id', 'orderId', 'amount', 'status'] })
  .readonly()
  .openapi('Payment')

const CreateOrderInputSchema = z
  .object({
    customerId: z.uuid(),
    items: z
      .array(
        z
          .object({ productId: z.uuid(), quantity: z.int().min(1) })
          .openapi({ required: ['productId', 'quantity'] }),
      )
      .min(1),
  })
  .openapi({ required: ['customerId', 'items'] })
  .readonly()
  .openapi('CreateOrderInput')

const GetOrderByIdLink = {
  operationId: 'getOrder',
  parameters: { orderId: '$response.body#/id' },
  description: 'Get the created/referenced order by ID',
} as const

const GetOrderItemsLink = {
  operationId: 'getOrderItems',
  parameters: { orderId: '$response.body#/id' },
  description: 'Get items for this order',
} as const

const GetCustomerLink = {
  operationId: 'getCustomer',
  parameters: { customerId: '$response.body#/customerId' },
  description: 'Get customer who placed this order',
} as const

const GetCustomerOrdersLink = {
  operationId: 'getCustomerOrders',
  parameters: { customerId: '$response.body#/id' },
  description: 'Get all orders for this customer',
} as const

const CancelOrderLink = {
  operationId: 'cancelOrder',
  parameters: { orderId: '$response.body#/id' },
  description: 'Cancel this order',
} as const

const GetPaymentLink = {
  operationId: 'getPayment',
  parameters: { paymentId: '$response.body#/paymentId' },
  description: 'Get payment details for this order',
} as const

export const postOrdersRoute = createRoute({
  method: 'post',
  path: '/orders',
  operationId: 'createOrder',
  request: { body: { content: { 'application/json': { schema: CreateOrderInputSchema } } } },
  responses: {
    201: {
      description: 'Order created',
      content: { 'application/json': { schema: OrderSchema } },
      links: {
        GetOrder: GetOrderByIdLink,
        GetOrderItems: GetOrderItemsLink,
        CancelOrder: CancelOrderLink,
      },
    },
  },
} as const)

export const getOrdersOrderIdRoute = createRoute({
  method: 'get',
  path: '/orders/{orderId}',
  operationId: 'getOrder',
  request: {
    params: z.object({
      orderId: z.uuid().openapi({
        param: {
          name: 'orderId',
          in: 'path',
          required: true,
          schema: { type: 'string', format: 'uuid' },
        },
      }),
    }),
  },
  responses: {
    200: {
      description: 'Order details',
      content: { 'application/json': { schema: OrderSchema } },
      links: {
        GetOrderItems: GetOrderItemsLink,
        GetCustomer: GetCustomerLink,
        CancelOrder: CancelOrderLink,
        GetPayment: GetPaymentLink,
      },
    },
  },
} as const)

export const deleteOrdersOrderIdRoute = createRoute({
  method: 'delete',
  path: '/orders/{orderId}',
  operationId: 'cancelOrder',
  request: {
    params: z.object({
      orderId: z.uuid().openapi({
        param: {
          name: 'orderId',
          in: 'path',
          required: true,
          schema: { type: 'string', format: 'uuid' },
        },
      }),
    }),
  },
  responses: { 200: { description: 'Order cancelled', links: { GetOrder: GetOrderByIdLink } } },
} as const)

export const getOrdersOrderIdItemsRoute = createRoute({
  method: 'get',
  path: '/orders/{orderId}/items',
  operationId: 'getOrderItems',
  request: {
    params: z.object({
      orderId: z.uuid().openapi({
        param: {
          name: 'orderId',
          in: 'path',
          required: true,
          schema: { type: 'string', format: 'uuid' },
        },
      }),
    }),
  },
  responses: {
    200: {
      description: 'Order items',
      content: { 'application/json': { schema: z.array(OrderItemSchema) } },
      links: { GetOrder: GetOrderByIdLink },
    },
  },
} as const)

export const getCustomersCustomerIdRoute = createRoute({
  method: 'get',
  path: '/customers/{customerId}',
  operationId: 'getCustomer',
  request: {
    params: z.object({
      customerId: z.uuid().openapi({
        param: {
          name: 'customerId',
          in: 'path',
          required: true,
          schema: { type: 'string', format: 'uuid' },
        },
      }),
    }),
  },
  responses: {
    200: {
      description: 'Customer details',
      content: { 'application/json': { schema: CustomerSchema } },
      links: { GetCustomerOrders: GetCustomerOrdersLink },
    },
  },
} as const)

export const getCustomersCustomerIdOrdersRoute = createRoute({
  method: 'get',
  path: '/customers/{customerId}/orders',
  operationId: 'getCustomerOrders',
  request: {
    params: z.object({
      customerId: z.uuid().openapi({
        param: {
          name: 'customerId',
          in: 'path',
          required: true,
          schema: { type: 'string', format: 'uuid' },
        },
      }),
    }),
  },
  responses: {
    200: {
      description: 'Customer orders',
      content: { 'application/json': { schema: z.array(OrderSchema) } },
    },
  },
} as const)

export const getPaymentsPaymentIdRoute = createRoute({
  method: 'get',
  path: '/payments/{paymentId}',
  operationId: 'getPayment',
  request: {
    params: z.object({
      paymentId: z.uuid().openapi({
        param: {
          name: 'paymentId',
          in: 'path',
          required: true,
          schema: { type: 'string', format: 'uuid' },
        },
      }),
    }),
  },
  responses: {
    200: {
      description: 'Payment details',
      content: { 'application/json': { schema: PaymentSchema } },
      links: {
        GetOrder: { operationId: 'getOrder', parameters: { orderId: '$response.body#/orderId' } },
      },
    },
  },
} as const)
