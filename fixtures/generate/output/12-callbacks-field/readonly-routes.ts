import { createRoute, z } from '@hono/zod-openapi'

const OrderRequestSchema = z
  .object({ item: z.string(), quantity: z.int(), callbackUrl: z.url() })
  .readonly()
  .openapi({ required: ['item', 'quantity', 'callbackUrl'] })
  .openapi('OrderRequest')

const OrderSchema = z
  .object({ id: z.string(), item: z.string(), quantity: z.int(), status: z.string() })
  .readonly()
  .openapi({ required: ['id', 'item', 'quantity', 'status'] })
  .openapi('Order')

const OrderEventSchema = z
  .object({
    orderId: z.string(),
    event: z.enum(['created', 'confirmed', 'shipped']),
    timestamp: z.iso.datetime(),
  })
  .readonly()
  .openapi({ required: ['orderId', 'event', 'timestamp'] })
  .openapi('OrderEvent')

const PaymentRequestSchema = z
  .object({ amount: z.number(), currency: z.string(), successUrl: z.url(), failureUrl: z.url() })
  .readonly()
  .openapi({ required: ['amount', 'currency', 'successUrl', 'failureUrl'] })
  .openapi('PaymentRequest')

const PaymentSchema = z
  .object({ id: z.string(), amount: z.number(), currency: z.string(), status: z.string() })
  .readonly()
  .openapi({ required: ['id', 'amount', 'currency', 'status'] })
  .openapi('Payment')

const PaymentEventSchema = z
  .object({
    paymentId: z.string(),
    status: z.enum(['success', 'failure']),
    timestamp: z.iso.datetime(),
  })
  .readonly()
  .openapi({ required: ['paymentId', 'status', 'timestamp'] })
  .openapi('PaymentEvent')

export const postOrdersRoute = createRoute({
  method: 'post',
  path: '/orders',
  summary: 'Create an order with callback',
  operationId: 'createOrder',
  request: {
    body: { content: { 'application/json': { schema: OrderRequestSchema } }, required: true },
  },
  responses: {
    201: { description: 'Order created', content: { 'application/json': { schema: OrderSchema } } },
  },
  callbacks: {
    onOrderCreated: {
      '{$request.body#/callbackUrl}': {
        post: {
          summary: 'Order created notification',
          operationId: 'onOrderCreated',
          requestBody: { content: { 'application/json': { schema: OrderEventSchema } } },
          responses: { 200: { description: 'Callback received' } },
        },
      },
    },
  },
} as const)

export const postPaymentsRoute = createRoute({
  method: 'post',
  path: '/payments',
  summary: 'Create a payment with multiple callbacks',
  operationId: 'createPayment',
  request: {
    body: { content: { 'application/json': { schema: PaymentRequestSchema } }, required: true },
  },
  responses: {
    201: {
      description: 'Payment created',
      content: { 'application/json': { schema: PaymentSchema } },
    },
  },
  callbacks: {
    onPaymentSuccess: {
      '{$request.body#/successUrl}': {
        post: {
          operationId: 'onPaymentSuccess',
          requestBody: { content: { 'application/json': { schema: PaymentEventSchema } } },
          responses: { 200: { description: 'OK' } },
        },
      },
    },
    onPaymentFailure: {
      '{$request.body#/failureUrl}': {
        post: {
          operationId: 'onPaymentFailure',
          requestBody: { content: { 'application/json': { schema: PaymentEventSchema } } },
          responses: { 200: { description: 'OK' } },
        },
      },
    },
  },
} as const)

export const getItemsRoute = createRoute({
  method: 'get',
  path: '/items',
  summary: 'List items (no callbacks)',
  operationId: 'listItems',
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z.array(
            z.object({ id: z.string(), name: z.string() }).openapi({ required: ['id', 'name'] }),
          ),
        },
      },
    },
  },
} as const)
