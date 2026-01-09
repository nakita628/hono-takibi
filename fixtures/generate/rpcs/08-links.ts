import type { ClientRequestOptions } from 'hono/client'
import { client } from '../clients/08-links'

/**
 * POST /orders
 */
export async function postOrders(
  args: { json: { customerId: string; items: { productId: string; quantity: number }[] } },
  options?: ClientRequestOptions,
) {
  return await client.orders.$post(args, options)
}

/**
 * GET /orders/{orderId}
 */
export async function getOrdersOrderId(
  args: { param: { orderId: string } },
  options?: ClientRequestOptions,
) {
  return await client['orders'][':orderId']['$get'](args, options)
}

/**
 * DELETE /orders/{orderId}
 */
export async function deleteOrdersOrderId(
  args: { param: { orderId: string } },
  options?: ClientRequestOptions,
) {
  return await client['orders'][':orderId']['$delete'](args, options)
}

/**
 * GET /orders/{orderId}/items
 */
export async function getOrdersOrderIdItems(
  args: { param: { orderId: string } },
  options?: ClientRequestOptions,
) {
  return await client['orders'][':orderId']['items']['$get'](args, options)
}

/**
 * GET /customers/{customerId}
 */
export async function getCustomersCustomerId(
  args: { param: { customerId: string } },
  options?: ClientRequestOptions,
) {
  return await client['customers'][':customerId']['$get'](args, options)
}

/**
 * GET /customers/{customerId}/orders
 */
export async function getCustomersCustomerIdOrders(
  args: { param: { customerId: string } },
  options?: ClientRequestOptions,
) {
  return await client['customers'][':customerId']['orders']['$get'](args, options)
}

/**
 * GET /payments/{paymentId}
 */
export async function getPaymentsPaymentId(
  args: { param: { paymentId: string } },
  options?: ClientRequestOptions,
) {
  return await client['payments'][':paymentId']['$get'](args, options)
}
