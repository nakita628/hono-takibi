import useSWR from 'swr'
import type { Key, SWRConfiguration } from 'swr'
import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/08-links'

/**
 * POST /orders
 */
export function usePostOrders(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.orders.$post>,
    Error,
    string,
    InferRequestType<typeof client.orders.$post>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.orders.$post>,
    Error,
    string,
    InferRequestType<typeof client.orders.$post>
  >(
    'POST /orders',
    async (_, { arg }) => parseResponse(client.orders.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * GET /orders/{orderId}
 */
export function useGetOrdersOrderId(
  args: InferRequestType<(typeof client.orders)[':orderId']['$get']>,
  options?: {
    swr?: SWRConfiguration<InferResponseType<(typeof client.orders)[':orderId']['$get']>, Error> & {
      swrKey?: Key
      enabled?: boolean
    }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetOrdersOrderIdKey(args) : null)
  const query = useSWR<InferResponseType<(typeof client.orders)[':orderId']['$get']>, Error>(
    swrKey,
    async () => parseResponse(client.orders[':orderId'].$get(args, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /orders/{orderId}
 */
export function getGetOrdersOrderIdKey(
  args: InferRequestType<(typeof client.orders)[':orderId']['$get']>,
) {
  return ['GET', '/orders/:orderId', args] as const
}

/**
 * DELETE /orders/{orderId}
 */
export function useDeleteOrdersOrderId(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.orders)[':orderId']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.orders)[':orderId']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.orders)[':orderId']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.orders)[':orderId']['$delete']>
  >(
    'DELETE /orders/:orderId',
    async (_, { arg }) => parseResponse(client.orders[':orderId'].$delete(arg, options?.client)),
    options?.swr,
  )
}

/**
 * GET /orders/{orderId}/items
 */
export function useGetOrdersOrderIdItems(
  args: InferRequestType<(typeof client.orders)[':orderId']['items']['$get']>,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<(typeof client.orders)[':orderId']['items']['$get']>,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetOrdersOrderIdItemsKey(args) : null)
  const query = useSWR<
    InferResponseType<(typeof client.orders)[':orderId']['items']['$get']>,
    Error
  >(
    swrKey,
    async () => parseResponse(client.orders[':orderId'].items.$get(args, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /orders/{orderId}/items
 */
export function getGetOrdersOrderIdItemsKey(
  args: InferRequestType<(typeof client.orders)[':orderId']['items']['$get']>,
) {
  return ['GET', '/orders/:orderId/items', args] as const
}

/**
 * GET /customers/{customerId}
 */
export function useGetCustomersCustomerId(
  args: InferRequestType<(typeof client.customers)[':customerId']['$get']>,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<(typeof client.customers)[':customerId']['$get']>,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetCustomersCustomerIdKey(args) : null)
  const query = useSWR<InferResponseType<(typeof client.customers)[':customerId']['$get']>, Error>(
    swrKey,
    async () => parseResponse(client.customers[':customerId'].$get(args, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /customers/{customerId}
 */
export function getGetCustomersCustomerIdKey(
  args: InferRequestType<(typeof client.customers)[':customerId']['$get']>,
) {
  return ['GET', '/customers/:customerId', args] as const
}

/**
 * GET /customers/{customerId}/orders
 */
export function useGetCustomersCustomerIdOrders(
  args: InferRequestType<(typeof client.customers)[':customerId']['orders']['$get']>,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<(typeof client.customers)[':customerId']['orders']['$get']>,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetCustomersCustomerIdOrdersKey(args) : null)
  const query = useSWR<
    InferResponseType<(typeof client.customers)[':customerId']['orders']['$get']>,
    Error
  >(
    swrKey,
    async () => parseResponse(client.customers[':customerId'].orders.$get(args, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /customers/{customerId}/orders
 */
export function getGetCustomersCustomerIdOrdersKey(
  args: InferRequestType<(typeof client.customers)[':customerId']['orders']['$get']>,
) {
  return ['GET', '/customers/:customerId/orders', args] as const
}

/**
 * GET /payments/{paymentId}
 */
export function useGetPaymentsPaymentId(
  args: InferRequestType<(typeof client.payments)[':paymentId']['$get']>,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<(typeof client.payments)[':paymentId']['$get']>,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetPaymentsPaymentIdKey(args) : null)
  const query = useSWR<InferResponseType<(typeof client.payments)[':paymentId']['$get']>, Error>(
    swrKey,
    async () => parseResponse(client.payments[':paymentId'].$get(args, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /payments/{paymentId}
 */
export function getGetPaymentsPaymentIdKey(
  args: InferRequestType<(typeof client.payments)[':paymentId']['$get']>,
) {
  return ['GET', '/payments/:paymentId', args] as const
}
