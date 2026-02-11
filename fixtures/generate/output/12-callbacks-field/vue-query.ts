import { useQuery, useMutation } from '@tanstack/vue-query'
import type { UseQueryOptions, QueryFunctionContext, UseMutationOptions } from '@tanstack/vue-query'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from './client'

/**
 * Generates Vue Query mutation key for POST /orders
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostOrdersMutationKey() {
  return ['orders', 'POST', '/orders'] as const
}

/**
 * Returns Vue Query mutation options for POST /orders
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getPostOrdersMutationOptions(clientOptions?: ClientRequestOptions) {
  return {
    mutationKey: getPostOrdersMutationKey(),
    async mutationFn(args: InferRequestType<typeof client.orders.$post>) {
      return parseResponse(client.orders.$post(args, clientOptions))
    },
  }
}

/**
 * POST /orders
 *
 * Create an order with callback
 */
export function usePostOrders(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.orders.$post>>>>>,
        Error,
        InferRequestType<typeof client.orders.$post>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } = getPostOrdersMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for POST /payments
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostPaymentsMutationKey() {
  return ['payments', 'POST', '/payments'] as const
}

/**
 * Returns Vue Query mutation options for POST /payments
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getPostPaymentsMutationOptions(clientOptions?: ClientRequestOptions) {
  return {
    mutationKey: getPostPaymentsMutationKey(),
    async mutationFn(args: InferRequestType<typeof client.payments.$post>) {
      return parseResponse(client.payments.$post(args, clientOptions))
    },
  }
}

/**
 * POST /payments
 *
 * Create a payment with multiple callbacks
 */
export function usePostPayments(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.payments.$post>>>>
        >,
        Error,
        InferRequestType<typeof client.payments.$post>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } = getPostPaymentsMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query cache key for GET /items
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetItemsQueryKey() {
  return ['items', 'GET', '/items'] as const
}

/**
 * Returns Vue Query query options for GET /items
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetItemsQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetItemsQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.items.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  }
}

/**
 * GET /items
 *
 * List items (no callbacks)
 */
export function useGetItems(options?: {
  query?: Partial<
    Omit<
      UseQueryOptions<
        Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.items.$get>>>>>,
        Error
      >,
      'queryKey' | 'queryFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetItemsQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}
