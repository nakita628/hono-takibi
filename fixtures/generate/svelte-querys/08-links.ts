import { createQuery, createMutation } from '@tanstack/svelte-query'
import type {
  CreateQueryOptions,
  QueryFunctionContext,
  CreateMutationOptions,
} from '@tanstack/svelte-query'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/08-links'

/**
 * POST /orders
 */
export function createPostOrders(options?: {
  mutation?: CreateMutationOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.orders.$post>>>>>,
    Error,
    InferRequestType<typeof client.orders.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.orders.$post>) =>
      parseResponse(client.orders.$post(args, clientOptions)),
  }))
}

/**
 * Generates Svelte Query cache key for GET /orders/{orderId}
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetOrdersOrderIdQueryKey(
  args: InferRequestType<(typeof client.orders)[':orderId']['$get']>,
) {
  return ['orders', '/orders/:orderId', args] as const
}

/**
 * Returns Svelte Query query options for GET /orders/{orderId}
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
export function createGetOrdersOrderId(
  args: InferRequestType<(typeof client.orders)[':orderId']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.orders)[':orderId']['$get']>>>
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetOrdersOrderIdQueryOptions(
      args,
      opts?.client,
    )
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * DELETE /orders/{orderId}
 */
export function createDeleteOrdersOrderId(options?: {
  mutation?: CreateMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client.orders)[':orderId']['$delete']>>>
      >
    >,
    Error,
    InferRequestType<(typeof client.orders)[':orderId']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<(typeof client.orders)[':orderId']['$delete']>) =>
      parseResponse(client.orders[':orderId'].$delete(args, clientOptions)),
  }))
}

/**
 * Generates Svelte Query cache key for GET /orders/{orderId}/items
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetOrdersOrderIdItemsQueryKey(
  args: InferRequestType<(typeof client.orders)[':orderId']['items']['$get']>,
) {
  return ['orders', '/orders/:orderId/items', args] as const
}

/**
 * Returns Svelte Query query options for GET /orders/{orderId}/items
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
export function createGetOrdersOrderIdItems(
  args: InferRequestType<(typeof client.orders)[':orderId']['items']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.orders)[':orderId']['items']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetOrdersOrderIdItemsQueryOptions(
      args,
      opts?.client,
    )
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /customers/{customerId}
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetCustomersCustomerIdQueryKey(
  args: InferRequestType<(typeof client.customers)[':customerId']['$get']>,
) {
  return ['customers', '/customers/:customerId', args] as const
}

/**
 * Returns Svelte Query query options for GET /customers/{customerId}
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
export function createGetCustomersCustomerId(
  args: InferRequestType<(typeof client.customers)[':customerId']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.customers)[':customerId']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetCustomersCustomerIdQueryOptions(
      args,
      opts?.client,
    )
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /customers/{customerId}/orders
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetCustomersCustomerIdOrdersQueryKey(
  args: InferRequestType<(typeof client.customers)[':customerId']['orders']['$get']>,
) {
  return ['customers', '/customers/:customerId/orders', args] as const
}

/**
 * Returns Svelte Query query options for GET /customers/{customerId}/orders
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
export function createGetCustomersCustomerIdOrders(
  args: InferRequestType<(typeof client.customers)[':customerId']['orders']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.customers)[':customerId']['orders']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetCustomersCustomerIdOrdersQueryOptions(
      args,
      opts?.client,
    )
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /payments/{paymentId}
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetPaymentsPaymentIdQueryKey(
  args: InferRequestType<(typeof client.payments)[':paymentId']['$get']>,
) {
  return ['payments', '/payments/:paymentId', args] as const
}

/**
 * Returns Svelte Query query options for GET /payments/{paymentId}
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
export function createGetPaymentsPaymentId(
  args: InferRequestType<(typeof client.payments)[':paymentId']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.payments)[':paymentId']['$get']>>>
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetPaymentsPaymentIdQueryOptions(
      args,
      opts?.client,
    )
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}
