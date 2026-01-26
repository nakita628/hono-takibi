import { useQuery, useMutation, queryOptions } from '@tanstack/vue-query'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/08-links'

/**
 * POST /orders
 */
export function usePostOrders(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.orders.$post>,
      variables: InferRequestType<typeof client.orders.$post>,
    ) => void
    onError?: (error: Error, variables: InferRequestType<typeof client.orders.$post>) => void
    onSettled?: (
      data: InferResponseType<typeof client.orders.$post> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.orders.$post>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.orders.$post>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.orders.$post>) =>
      parseResponse(client.orders.$post(args, clientOptions)),
  })
}

/**
 * GET /orders/{orderId}
 */
export function useGetOrdersOrderId(
  args: InferRequestType<(typeof client.orders)[':orderId']['$get']>,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetOrdersOrderIdQueryOptions(args, clientOptions), ...queryOptions })
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
 * Returns Vue Query query options for GET /orders/{orderId}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetOrdersOrderIdQueryOptions = (
  args: InferRequestType<(typeof client.orders)[':orderId']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetOrdersOrderIdQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.orders[':orderId'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * DELETE /orders/{orderId}
 */
export function useDeleteOrdersOrderId(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.orders)[':orderId']['$delete']>,
      variables: InferRequestType<(typeof client.orders)[':orderId']['$delete']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.orders)[':orderId']['$delete']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client.orders)[':orderId']['$delete']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.orders)[':orderId']['$delete']>,
    ) => void
    onMutate?: (variables: InferRequestType<(typeof client.orders)[':orderId']['$delete']>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<(typeof client.orders)[':orderId']['$delete']>) =>
      parseResponse(client.orders[':orderId'].$delete(args, clientOptions)),
  })
}

/**
 * GET /orders/{orderId}/items
 */
export function useGetOrdersOrderIdItems(
  args: InferRequestType<(typeof client.orders)[':orderId']['items']['$get']>,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetOrdersOrderIdItemsQueryOptions(args, clientOptions), ...queryOptions })
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
 * Returns Vue Query query options for GET /orders/{orderId}/items
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetOrdersOrderIdItemsQueryOptions = (
  args: InferRequestType<(typeof client.orders)[':orderId']['items']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetOrdersOrderIdItemsQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.orders[':orderId'].items.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * GET /customers/{customerId}
 */
export function useGetCustomersCustomerId(
  args: InferRequestType<(typeof client.customers)[':customerId']['$get']>,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    ...getGetCustomersCustomerIdQueryOptions(args, clientOptions),
    ...queryOptions,
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
 * Returns Vue Query query options for GET /customers/{customerId}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetCustomersCustomerIdQueryOptions = (
  args: InferRequestType<(typeof client.customers)[':customerId']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetCustomersCustomerIdQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.customers[':customerId'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * GET /customers/{customerId}/orders
 */
export function useGetCustomersCustomerIdOrders(
  args: InferRequestType<(typeof client.customers)[':customerId']['orders']['$get']>,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    ...getGetCustomersCustomerIdOrdersQueryOptions(args, clientOptions),
    ...queryOptions,
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
 * Returns Vue Query query options for GET /customers/{customerId}/orders
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetCustomersCustomerIdOrdersQueryOptions = (
  args: InferRequestType<(typeof client.customers)[':customerId']['orders']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetCustomersCustomerIdOrdersQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.customers[':customerId'].orders.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * GET /payments/{paymentId}
 */
export function useGetPaymentsPaymentId(
  args: InferRequestType<(typeof client.payments)[':paymentId']['$get']>,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetPaymentsPaymentIdQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query cache key for GET /payments/{paymentId}
 */
export function getGetPaymentsPaymentIdQueryKey(
  args: InferRequestType<(typeof client.payments)[':paymentId']['$get']>,
) {
  return ['/payments/:paymentId', args] as const
}

/**
 * Returns Vue Query query options for GET /payments/{paymentId}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetPaymentsPaymentIdQueryOptions = (
  args: InferRequestType<(typeof client.payments)[':paymentId']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetPaymentsPaymentIdQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.payments[':paymentId'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })
