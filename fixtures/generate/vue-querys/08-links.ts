import { useQuery, useMutation } from '@tanstack/vue-query'
import type { UseQueryOptions, QueryFunctionContext, UseMutationOptions } from '@tanstack/vue-query'
import { unref } from 'vue'
import type { MaybeRef } from 'vue'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/08-links'

/**
 * Generates Vue Query mutation key for POST /orders
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getPostOrdersMutationKey() {
  return ['POST', '/orders'] as const
}

/**
 * Returns Vue Query mutation options for POST /orders
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostOrdersMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostOrdersMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.orders.$post>) =>
    parseResponse(client.orders.$post(args, clientOptions)),
})

/**
 * POST /orders
 */
export function usePostOrders(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.orders.$post>>>>>,
        Error,
        InferRequestType<typeof client.orders.$post>
      >,
      'mutationFn'
    >
  >
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
 * Generates Vue Query cache key for GET /orders/{orderId}
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetOrdersOrderIdQueryKey(
  args: MaybeRef<InferRequestType<(typeof client.orders)[':orderId']['$get']>>,
) {
  return ['orders', '/orders/:orderId', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /orders/{orderId}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetOrdersOrderIdQueryOptions = (
  args: InferRequestType<(typeof client.orders)[':orderId']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetOrdersOrderIdQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.orders[':orderId'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /orders/{orderId}
 */
export function useGetOrdersOrderId(
  args: InferRequestType<(typeof client.orders)[':orderId']['$get']>,
  options?: {
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<Awaited<ReturnType<(typeof client.orders)[':orderId']['$get']>>>
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetOrdersOrderIdQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query mutation key for DELETE /orders/{orderId}
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getDeleteOrdersOrderIdMutationKey() {
  return ['DELETE', '/orders/:orderId'] as const
}

/**
 * Returns Vue Query mutation options for DELETE /orders/{orderId}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getDeleteOrdersOrderIdMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getDeleteOrdersOrderIdMutationKey(),
  mutationFn: async (args: InferRequestType<(typeof client.orders)[':orderId']['$delete']>) =>
    parseResponse(client.orders[':orderId'].$delete(args, clientOptions)),
})

/**
 * DELETE /orders/{orderId}
 */
export function useDeleteOrdersOrderId(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<Awaited<ReturnType<(typeof client.orders)[':orderId']['$delete']>>>
          >
        >,
        Error,
        InferRequestType<(typeof client.orders)[':orderId']['$delete']>
      >,
      'mutationFn'
    >
  >
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
 * Generates Vue Query cache key for GET /orders/{orderId}/items
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetOrdersOrderIdItemsQueryKey(
  args: MaybeRef<InferRequestType<(typeof client.orders)[':orderId']['items']['$get']>>,
) {
  return ['orders', '/orders/:orderId/items', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /orders/{orderId}/items
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetOrdersOrderIdItemsQueryOptions = (
  args: InferRequestType<(typeof client.orders)[':orderId']['items']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetOrdersOrderIdItemsQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.orders[':orderId'].items.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /orders/{orderId}/items
 */
export function useGetOrdersOrderIdItems(
  args: InferRequestType<(typeof client.orders)[':orderId']['items']['$get']>,
  options?: {
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client.orders)[':orderId']['items']['$get']>>
              >
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetOrdersOrderIdItemsQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query cache key for GET /customers/{customerId}
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetCustomersCustomerIdQueryKey(
  args: MaybeRef<InferRequestType<(typeof client.customers)[':customerId']['$get']>>,
) {
  return ['customers', '/customers/:customerId', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /customers/{customerId}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetCustomersCustomerIdQueryOptions = (
  args: InferRequestType<(typeof client.customers)[':customerId']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetCustomersCustomerIdQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.customers[':customerId'].$get(args, {
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
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client.customers)[':customerId']['$get']>>
              >
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetCustomersCustomerIdQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query cache key for GET /customers/{customerId}/orders
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetCustomersCustomerIdOrdersQueryKey(
  args: MaybeRef<InferRequestType<(typeof client.customers)[':customerId']['orders']['$get']>>,
) {
  return ['customers', '/customers/:customerId/orders', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /customers/{customerId}/orders
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetCustomersCustomerIdOrdersQueryOptions = (
  args: InferRequestType<(typeof client.customers)[':customerId']['orders']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetCustomersCustomerIdOrdersQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.customers[':customerId'].orders.$get(args, {
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
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client.customers)[':customerId']['orders']['$get']>>
              >
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetCustomersCustomerIdOrdersQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query cache key for GET /payments/{paymentId}
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetPaymentsPaymentIdQueryKey(
  args: MaybeRef<InferRequestType<(typeof client.payments)[':paymentId']['$get']>>,
) {
  return ['payments', '/payments/:paymentId', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /payments/{paymentId}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetPaymentsPaymentIdQueryOptions = (
  args: InferRequestType<(typeof client.payments)[':paymentId']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetPaymentsPaymentIdQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.payments[':paymentId'].$get(args, {
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
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client.payments)[':paymentId']['$get']>>
              >
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetPaymentsPaymentIdQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}
