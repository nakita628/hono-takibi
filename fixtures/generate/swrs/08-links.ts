import useSWR from 'swr'
import type { Key, SWRConfiguration } from 'swr'
import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/08-links'

/**
 * Generates SWR mutation key for POST /orders
 * Returns key [method, path] to avoid collisions between different methods on same path
 */
export function getPostOrdersMutationKey() {
  return ['POST', '/orders'] as const
}

/**
 * POST /orders
 */
export function usePostOrders(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.orders.$post>>>>>,
    Error,
    Key,
    InferRequestType<typeof client.orders.$post>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostOrdersMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.orders.$post> }) =>
        parseResponse(client.orders.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /orders/{orderId}
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetOrdersOrderIdKey(
  args: InferRequestType<(typeof client.orders)[':orderId']['$get']>,
) {
  return [`/orders/${args.param.orderId}`, args] as const
}

/**
 * GET /orders/{orderId}
 */
export function useGetOrdersOrderId(
  args: InferRequestType<(typeof client.orders)[':orderId']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetOrdersOrderIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.orders[':orderId'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /orders/{orderId}
 * Returns key [method, path] to avoid collisions between different methods on same path
 */
export function getDeleteOrdersOrderIdMutationKey() {
  return ['DELETE', '/orders/:orderId'] as const
}

/**
 * DELETE /orders/{orderId}
 */
export function useDeleteOrdersOrderId(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client.orders)[':orderId']['$delete']>>>
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.orders)[':orderId']['$delete']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteOrdersOrderIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.orders)[':orderId']['$delete']> },
      ) => parseResponse(client.orders[':orderId'].$delete(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /orders/{orderId}/items
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetOrdersOrderIdItemsKey(
  args: InferRequestType<(typeof client.orders)[':orderId']['items']['$get']>,
) {
  return [`/orders/${args.param.orderId}/items`, args] as const
}

/**
 * GET /orders/{orderId}/items
 */
export function useGetOrdersOrderIdItems(
  args: InferRequestType<(typeof client.orders)[':orderId']['items']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetOrdersOrderIdItemsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.orders[':orderId'].items.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /customers/{customerId}
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetCustomersCustomerIdKey(
  args: InferRequestType<(typeof client.customers)[':customerId']['$get']>,
) {
  return [`/customers/${args.param.customerId}`, args] as const
}

/**
 * GET /customers/{customerId}
 */
export function useGetCustomersCustomerId(
  args: InferRequestType<(typeof client.customers)[':customerId']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetCustomersCustomerIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.customers[':customerId'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /customers/{customerId}/orders
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetCustomersCustomerIdOrdersKey(
  args: InferRequestType<(typeof client.customers)[':customerId']['orders']['$get']>,
) {
  return [`/customers/${args.param.customerId}/orders`, args] as const
}

/**
 * GET /customers/{customerId}/orders
 */
export function useGetCustomersCustomerIdOrders(
  args: InferRequestType<(typeof client.customers)[':customerId']['orders']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetCustomersCustomerIdOrdersKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.customers[':customerId'].orders.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /payments/{paymentId}
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetPaymentsPaymentIdKey(
  args: InferRequestType<(typeof client.payments)[':paymentId']['$get']>,
) {
  return [`/payments/${args.param.paymentId}`, args] as const
}

/**
 * GET /payments/{paymentId}
 */
export function useGetPaymentsPaymentId(
  args: InferRequestType<(typeof client.payments)[':paymentId']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetPaymentsPaymentIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.payments[':paymentId'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}
