import { useQuery, useMutation } from '@tanstack/react-query'
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
    mutationFn: async (args: InferRequestType<typeof client.orders.$post>) =>
      parseResponse(client.orders.$post(args, clientOptions)),
    ...mutationOptions,
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
      placeholderData?:
        | InferResponseType<(typeof client.orders)[':orderId']['$get']>
        | (() => InferResponseType<(typeof client.orders)[':orderId']['$get']>)
      initialData?:
        | InferResponseType<(typeof client.orders)[':orderId']['$get']>
        | (() => InferResponseType<(typeof client.orders)[':orderId']['$get']>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetOrdersOrderIdQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.orders[':orderId'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /orders/{orderId}
 */
export function getGetOrdersOrderIdQueryKey(
  args: InferRequestType<(typeof client.orders)[':orderId']['$get']>,
) {
  return ['/orders/:orderId', args] as const
}

/**
 * Returns TanStack Query query options for GET /orders/{orderId}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetOrdersOrderIdQueryOptions(
  args: InferRequestType<(typeof client.orders)[':orderId']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetOrdersOrderIdQueryKey(args),
    queryFn: async () => parseResponse(client.orders[':orderId'].$get(args, clientOptions)),
  }
}

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
    mutationFn: async (args: InferRequestType<(typeof client.orders)[':orderId']['$delete']>) =>
      parseResponse(client.orders[':orderId'].$delete(args, clientOptions)),
    ...mutationOptions,
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
      placeholderData?:
        | InferResponseType<(typeof client.orders)[':orderId']['items']['$get']>
        | (() => InferResponseType<(typeof client.orders)[':orderId']['items']['$get']>)
      initialData?:
        | InferResponseType<(typeof client.orders)[':orderId']['items']['$get']>
        | (() => InferResponseType<(typeof client.orders)[':orderId']['items']['$get']>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetOrdersOrderIdItemsQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.orders[':orderId'].items.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /orders/{orderId}/items
 */
export function getGetOrdersOrderIdItemsQueryKey(
  args: InferRequestType<(typeof client.orders)[':orderId']['items']['$get']>,
) {
  return ['/orders/:orderId/items', args] as const
}

/**
 * Returns TanStack Query query options for GET /orders/{orderId}/items
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetOrdersOrderIdItemsQueryOptions(
  args: InferRequestType<(typeof client.orders)[':orderId']['items']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetOrdersOrderIdItemsQueryKey(args),
    queryFn: async () => parseResponse(client.orders[':orderId'].items.$get(args, clientOptions)),
  }
}

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
      placeholderData?:
        | InferResponseType<(typeof client.customers)[':customerId']['$get']>
        | (() => InferResponseType<(typeof client.customers)[':customerId']['$get']>)
      initialData?:
        | InferResponseType<(typeof client.customers)[':customerId']['$get']>
        | (() => InferResponseType<(typeof client.customers)[':customerId']['$get']>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetCustomersCustomerIdQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.customers[':customerId'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /customers/{customerId}
 */
export function getGetCustomersCustomerIdQueryKey(
  args: InferRequestType<(typeof client.customers)[':customerId']['$get']>,
) {
  return ['/customers/:customerId', args] as const
}

/**
 * Returns TanStack Query query options for GET /customers/{customerId}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetCustomersCustomerIdQueryOptions(
  args: InferRequestType<(typeof client.customers)[':customerId']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetCustomersCustomerIdQueryKey(args),
    queryFn: async () => parseResponse(client.customers[':customerId'].$get(args, clientOptions)),
  }
}

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
      placeholderData?:
        | InferResponseType<(typeof client.customers)[':customerId']['orders']['$get']>
        | (() => InferResponseType<(typeof client.customers)[':customerId']['orders']['$get']>)
      initialData?:
        | InferResponseType<(typeof client.customers)[':customerId']['orders']['$get']>
        | (() => InferResponseType<(typeof client.customers)[':customerId']['orders']['$get']>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetCustomersCustomerIdOrdersQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.customers[':customerId'].orders.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /customers/{customerId}/orders
 */
export function getGetCustomersCustomerIdOrdersQueryKey(
  args: InferRequestType<(typeof client.customers)[':customerId']['orders']['$get']>,
) {
  return ['/customers/:customerId/orders', args] as const
}

/**
 * Returns TanStack Query query options for GET /customers/{customerId}/orders
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetCustomersCustomerIdOrdersQueryOptions(
  args: InferRequestType<(typeof client.customers)[':customerId']['orders']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetCustomersCustomerIdOrdersQueryKey(args),
    queryFn: async () =>
      parseResponse(client.customers[':customerId'].orders.$get(args, clientOptions)),
  }
}

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
      placeholderData?:
        | InferResponseType<(typeof client.payments)[':paymentId']['$get']>
        | (() => InferResponseType<(typeof client.payments)[':paymentId']['$get']>)
      initialData?:
        | InferResponseType<(typeof client.payments)[':paymentId']['$get']>
        | (() => InferResponseType<(typeof client.payments)[':paymentId']['$get']>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetPaymentsPaymentIdQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.payments[':paymentId'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /payments/{paymentId}
 */
export function getGetPaymentsPaymentIdQueryKey(
  args: InferRequestType<(typeof client.payments)[':paymentId']['$get']>,
) {
  return ['/payments/:paymentId', args] as const
}

/**
 * Returns TanStack Query query options for GET /payments/{paymentId}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetPaymentsPaymentIdQueryOptions(
  args: InferRequestType<(typeof client.payments)[':paymentId']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetPaymentsPaymentIdQueryKey(args),
    queryFn: async () => parseResponse(client.payments[':paymentId'].$get(args, clientOptions)),
  }
}
