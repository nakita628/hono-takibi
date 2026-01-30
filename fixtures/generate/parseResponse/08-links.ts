import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/08-links'

/**
 * POST /orders
 */
export async function postOrders(
  args: InferRequestType<typeof client.orders.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.orders.$post(args, options))
}

/**
 * GET /orders/{orderId}
 */
export async function getOrdersOrderId(
  args: InferRequestType<(typeof client.orders)[':orderId']['$get']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.orders[':orderId'].$get(args, options))
}

/**
 * DELETE /orders/{orderId}
 */
export async function deleteOrdersOrderId(
  args: InferRequestType<(typeof client.orders)[':orderId']['$delete']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.orders[':orderId'].$delete(args, options))
}

/**
 * GET /orders/{orderId}/items
 */
export async function getOrdersOrderIdItems(
  args: InferRequestType<(typeof client.orders)[':orderId']['items']['$get']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.orders[':orderId'].items.$get(args, options))
}

/**
 * GET /customers/{customerId}
 */
export async function getCustomersCustomerId(
  args: InferRequestType<(typeof client.customers)[':customerId']['$get']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.customers[':customerId'].$get(args, options))
}

/**
 * GET /customers/{customerId}/orders
 */
export async function getCustomersCustomerIdOrders(
  args: InferRequestType<(typeof client.customers)[':customerId']['orders']['$get']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.customers[':customerId'].orders.$get(args, options))
}

/**
 * GET /payments/{paymentId}
 */
export async function getPaymentsPaymentId(
  args: InferRequestType<(typeof client.payments)[':paymentId']['$get']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.payments[':paymentId'].$get(args, options))
}
