import { client } from '../clients/08-links'

/**
 * POST /orders
 */
export async function postOrders(arg: {
  json: { customerId: string; items: { productId: string; quantity: number }[] }
}) {
  return await client.orders.$post(arg)
}

/**
 * GET /orders/{orderId}
 */
export async function getOrdersOrderId(arg: { param: { orderId: string } }) {
  return await client['orders'][':orderId']['$get'](arg)
}

/**
 * DELETE /orders/{orderId}
 */
export async function deleteOrdersOrderId(arg: { param: { orderId: string } }) {
  return await client['orders'][':orderId']['$delete'](arg)
}

/**
 * GET /orders/{orderId}/items
 */
export async function getOrdersOrderIdItems(arg: { param: { orderId: string } }) {
  return await client['orders'][':orderId']['items']['$get'](arg)
}

/**
 * GET /customers/{customerId}
 */
export async function getCustomersCustomerId(arg: { param: { customerId: string } }) {
  return await client['customers'][':customerId']['$get'](arg)
}

/**
 * GET /customers/{customerId}/orders
 */
export async function getCustomersCustomerIdOrders(arg: { param: { customerId: string } }) {
  return await client['customers'][':customerId']['orders']['$get'](arg)
}

/**
 * GET /payments/{paymentId}
 */
export async function getPaymentsPaymentId(arg: { param: { paymentId: string } }) {
  return await client['payments'][':paymentId']['$get'](arg)
}
