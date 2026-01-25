import { createQuery, createMutation } from '@tanstack/svelte-query'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/08-links'

/**
 * POST /orders
 */
export function createPostOrders(options?: {
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
  return createMutation({
    mutationFn: async (args: InferRequestType<typeof client.orders.$post>) =>
      parseResponse(client.orders.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /orders/{orderId}
 */
export function createGetOrdersOrderId(
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
      select?: (
        data: InferResponseType<(typeof client.orders)[':orderId']['$get']>,
      ) => InferResponseType<(typeof client.orders)[':orderId']['$get']>
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetOrdersOrderIdQueryKey(args),
    queryFn: async () => parseResponse(client.orders[':orderId'].$get(args, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /orders/{orderId
 */
export function getGetOrdersOrderIdQueryKey(
  args: InferRequestType<(typeof client.orders)[':orderId']['$get']>,
) {
  return ['/orders/:orderId', args] as const
}

/**
 * DELETE /orders/{orderId}
 */
export function createDeleteOrdersOrderId(options?: {
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
  return createMutation({
    mutationFn: async (args: InferRequestType<(typeof client.orders)[':orderId']['$delete']>) =>
      parseResponse(client.orders[':orderId'].$delete(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /orders/{orderId}/items
 */
export function createGetOrdersOrderIdItems(
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
      select?: (
        data: InferResponseType<(typeof client.orders)[':orderId']['items']['$get']>,
      ) => InferResponseType<(typeof client.orders)[':orderId']['items']['$get']>
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetOrdersOrderIdItemsQueryKey(args),
    queryFn: async () => parseResponse(client.orders[':orderId'].items.$get(args, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /orders/{orderId/items
 */
export function getGetOrdersOrderIdItemsQueryKey(
  args: InferRequestType<(typeof client.orders)[':orderId']['items']['$get']>,
) {
  return ['/orders/:orderId/items', args] as const
}

/**
 * GET /customers/{customerId}
 */
export function createGetCustomersCustomerId(
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
      select?: (
        data: InferResponseType<(typeof client.customers)[':customerId']['$get']>,
      ) => InferResponseType<(typeof client.customers)[':customerId']['$get']>
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetCustomersCustomerIdQueryKey(args),
    queryFn: async () => parseResponse(client.customers[':customerId'].$get(args, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /customers/{customerId
 */
export function getGetCustomersCustomerIdQueryKey(
  args: InferRequestType<(typeof client.customers)[':customerId']['$get']>,
) {
  return ['/customers/:customerId', args] as const
}

/**
 * GET /customers/{customerId}/orders
 */
export function createGetCustomersCustomerIdOrders(
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
      select?: (
        data: InferResponseType<(typeof client.customers)[':customerId']['orders']['$get']>,
      ) => InferResponseType<(typeof client.customers)[':customerId']['orders']['$get']>
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetCustomersCustomerIdOrdersQueryKey(args),
    queryFn: async () =>
      parseResponse(client.customers[':customerId'].orders.$get(args, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /customers/{customerId/orders
 */
export function getGetCustomersCustomerIdOrdersQueryKey(
  args: InferRequestType<(typeof client.customers)[':customerId']['orders']['$get']>,
) {
  return ['/customers/:customerId/orders', args] as const
}

/**
 * GET /payments/{paymentId}
 */
export function createGetPaymentsPaymentId(
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
      select?: (
        data: InferResponseType<(typeof client.payments)[':paymentId']['$get']>,
      ) => InferResponseType<(typeof client.payments)[':paymentId']['$get']>
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetPaymentsPaymentIdQueryKey(args),
    queryFn: async () => parseResponse(client.payments[':paymentId'].$get(args, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /payments/{paymentId
 */
export function getGetPaymentsPaymentIdQueryKey(
  args: InferRequestType<(typeof client.payments)[':paymentId']['$get']>,
) {
  return ['/payments/:paymentId', args] as const
}
