import { client } from '../index.ts'

/**
 * POST /orders
 */
export async function postOrders(body: {
  customerId: string
  items: { productId: string; quantity: number }[]
}) {
  return await client.orders.$post({ json: body })
}

/**
 * GET /orders/{orderId}
 */
export async function getOrdersOrderId(params: { path: { orderId: string } }) {
  return await client.orders[':orderId'].$get({ param: params.path })
}

/**
 * DELETE /orders/{orderId}
 */
export async function deleteOrdersOrderId(params: { path: { orderId: string } }) {
  return await client.orders[':orderId'].$delete({ param: params.path })
}

/**
 * GET /orders/{orderId}/items
 */
export async function getOrdersOrderIdItems(params: { path: { orderId: string } }) {
  return await client.orders[':orderId'].items.$get({ param: params.path })
}

/**
 * GET /customers/{customerId}
 */
export async function getCustomersCustomerId(params: { path: { customerId: string } }) {
  return await client.customers[':customerId'].$get({ param: params.path })
}

/**
 * GET /customers/{customerId}/orders
 */
export async function getCustomersCustomerIdOrders(params: { path: { customerId: string } }) {
  return await client.customers[':customerId'].orders.$get({ param: params.path })
}

/**
 * GET /payments/{paymentId}
 */
export async function getPaymentsPaymentId(params: { path: { paymentId: string } }) {
  return await client.payments[':paymentId'].$get({ param: params.path })
}
