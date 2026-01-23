import { useQuery, useMutation } from '@tanstack/react-query'
import type { QueryClient, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/08-links'

/**
 * POST /orders
 */
export function usePostOrders(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<typeof client.orders.$post> | undefined,
      Error,
      InferRequestType<typeof client.orders.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<typeof client.orders.$post> | undefined,
    Error,
    InferRequestType<typeof client.orders.$post>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) => parseResponse(client.orders.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /orders/{orderId}
 */
export function useGetOrdersOrderId(
  args: InferRequestType<(typeof client.orders)[':orderId']['$get']>,
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<(typeof client.orders)[':orderId']['$get']>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetOrdersOrderIdQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.orders[':orderId'].$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /orders/{orderId}
 */
export function getGetOrdersOrderIdQueryKey(
  args?: InferRequestType<(typeof client.orders)[':orderId']['$get']>,
) {
  return ['/orders/:orderId', ...(args ? [args] : [])] as const
}

/**
 * DELETE /orders/{orderId}
 */
export function useDeleteOrdersOrderId(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.orders)[':orderId']['$delete']> | undefined,
      Error,
      InferRequestType<(typeof client.orders)[':orderId']['$delete']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.orders)[':orderId']['$delete']> | undefined,
    Error,
    InferRequestType<(typeof client.orders)[':orderId']['$delete']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.orders[':orderId'].$delete(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /orders/{orderId}/items
 */
export function useGetOrdersOrderIdItems(
  args: InferRequestType<(typeof client.orders)[':orderId']['items']['$get']>,
  options?: {
    query?: Omit<
      UseQueryOptions<
        InferResponseType<(typeof client.orders)[':orderId']['items']['$get']>,
        Error
      >,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetOrdersOrderIdItemsQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.orders[':orderId'].items.$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /orders/{orderId}/items
 */
export function getGetOrdersOrderIdItemsQueryKey(
  args?: InferRequestType<(typeof client.orders)[':orderId']['items']['$get']>,
) {
  return ['/orders/:orderId/items', ...(args ? [args] : [])] as const
}

/**
 * GET /customers/{customerId}
 */
export function useGetCustomersCustomerId(
  args: InferRequestType<(typeof client.customers)[':customerId']['$get']>,
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<(typeof client.customers)[':customerId']['$get']>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetCustomersCustomerIdQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.customers[':customerId'].$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /customers/{customerId}
 */
export function getGetCustomersCustomerIdQueryKey(
  args?: InferRequestType<(typeof client.customers)[':customerId']['$get']>,
) {
  return ['/customers/:customerId', ...(args ? [args] : [])] as const
}

/**
 * GET /customers/{customerId}/orders
 */
export function useGetCustomersCustomerIdOrders(
  args: InferRequestType<(typeof client.customers)[':customerId']['orders']['$get']>,
  options?: {
    query?: Omit<
      UseQueryOptions<
        InferResponseType<(typeof client.customers)[':customerId']['orders']['$get']>,
        Error
      >,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetCustomersCustomerIdOrdersQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () =>
        parseResponse(client.customers[':customerId'].orders.$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /customers/{customerId}/orders
 */
export function getGetCustomersCustomerIdOrdersQueryKey(
  args?: InferRequestType<(typeof client.customers)[':customerId']['orders']['$get']>,
) {
  return ['/customers/:customerId/orders', ...(args ? [args] : [])] as const
}

/**
 * GET /payments/{paymentId}
 */
export function useGetPaymentsPaymentId(
  args: InferRequestType<(typeof client.payments)[':paymentId']['$get']>,
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<(typeof client.payments)[':paymentId']['$get']>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetPaymentsPaymentIdQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.payments[':paymentId'].$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /payments/{paymentId}
 */
export function getGetPaymentsPaymentIdQueryKey(
  args?: InferRequestType<(typeof client.payments)[':paymentId']['$get']>,
) {
  return ['/payments/:paymentId', ...(args ? [args] : [])] as const
}
