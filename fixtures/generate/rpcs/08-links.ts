import type { InferRequestType } from 'hono/client'
import { client } from '../clients/08-links'

/**
 * POST /orders
 */
export async function postOrders(arg: InferRequestType<typeof client.orders.$post>) {
  return await client.orders.$post(arg)
}

/**
 * GET /orders/{orderId}
 */
export async function getOrdersOrderId(
  arg: InferRequestType<(typeof client)['orders'][':orderId']['$get']>,
) {
  return await client['orders'][':orderId']['$get'](arg)
}

/**
 * DELETE /orders/{orderId}
 */
export async function deleteOrdersOrderId(
  arg: InferRequestType<(typeof client)['orders'][':orderId']['$delete']>,
) {
  return await client['orders'][':orderId']['$delete'](arg)
}

/**
 * GET /orders/{orderId}/items
 */
export async function getOrdersOrderIdItems(
  arg: InferRequestType<(typeof client)['orders'][':orderId']['items']['$get']>,
) {
  return await client['orders'][':orderId']['items']['$get'](arg)
}

/**
 * GET /customers/{customerId}
 */
export async function getCustomersCustomerId(
  arg: InferRequestType<(typeof client)['customers'][':customerId']['$get']>,
) {
  return await client['customers'][':customerId']['$get'](arg)
}

/**
 * GET /customers/{customerId}/orders
 */
export async function getCustomersCustomerIdOrders(
  arg: InferRequestType<(typeof client)['customers'][':customerId']['orders']['$get']>,
) {
  return await client['customers'][':customerId']['orders']['$get'](arg)
}

/**
 * GET /payments/{paymentId}
 */
export async function getPaymentsPaymentId(
  arg: InferRequestType<(typeof client)['payments'][':paymentId']['$get']>,
) {
  return await client['payments'][':paymentId']['$get'](arg)
}
