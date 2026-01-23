import { useMutation, useQuery } from '@tanstack/vue-query'
import type { ClientRequestOptions, InferRequestType, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/08-links'

/**
 * POST /orders
 */
export function usePostOrders(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<typeof client.orders.$post> | undefined,
    Error,
    InferRequestType<typeof client.orders.$post>
  >({ mutationFn: async (args) => parseResponse(client.orders.$post(args, clientOptions)) })
}

/**
 * GET /orders/{orderId}
 */
export function useGetOrdersOrderId(
  args: InferRequestType<(typeof client.orders)[':orderId']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetOrdersOrderIdQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.orders[':orderId'].$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /orders/{orderId}
 */
export function getGetOrdersOrderIdQueryKey(
  args: InferRequestType<(typeof client.orders)[':orderId']['$get']>,
) {
  return ['/orders/:orderId', args] as const
}

/**
 * DELETE /orders/{orderId}
 */
export function useDeleteOrdersOrderId(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.orders)[':orderId']['$delete']> | undefined,
    Error,
    InferRequestType<(typeof client.orders)[':orderId']['$delete']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.orders[':orderId'].$delete(args, clientOptions)),
  })
}

/**
 * GET /orders/{orderId}/items
 */
export function useGetOrdersOrderIdItems(
  args: InferRequestType<(typeof client.orders)[':orderId']['items']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetOrdersOrderIdItemsQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.orders[':orderId'].items.$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /orders/{orderId}/items
 */
export function getGetOrdersOrderIdItemsQueryKey(
  args: InferRequestType<(typeof client.orders)[':orderId']['items']['$get']>,
) {
  return ['/orders/:orderId/items', args] as const
}

/**
 * GET /customers/{customerId}
 */
export function useGetCustomersCustomerId(
  args: InferRequestType<(typeof client.customers)[':customerId']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetCustomersCustomerIdQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.customers[':customerId'].$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /customers/{customerId}
 */
export function getGetCustomersCustomerIdQueryKey(
  args: InferRequestType<(typeof client.customers)[':customerId']['$get']>,
) {
  return ['/customers/:customerId', args] as const
}

/**
 * GET /customers/{customerId}/orders
 */
export function useGetCustomersCustomerIdOrders(
  args: InferRequestType<(typeof client.customers)[':customerId']['orders']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetCustomersCustomerIdOrdersQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () =>
      parseResponse(client.customers[':customerId'].orders.$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /customers/{customerId}/orders
 */
export function getGetCustomersCustomerIdOrdersQueryKey(
  args: InferRequestType<(typeof client.customers)[':customerId']['orders']['$get']>,
) {
  return ['/customers/:customerId/orders', args] as const
}

/**
 * GET /payments/{paymentId}
 */
export function useGetPaymentsPaymentId(
  args: InferRequestType<(typeof client.payments)[':paymentId']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetPaymentsPaymentIdQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.payments[':paymentId'].$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /payments/{paymentId}
 */
export function getGetPaymentsPaymentIdQueryKey(
  args: InferRequestType<(typeof client.payments)[':paymentId']['$get']>,
) {
  return ['/payments/:paymentId', args] as const
}
