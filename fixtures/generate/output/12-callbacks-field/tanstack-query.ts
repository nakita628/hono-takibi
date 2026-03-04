import {
  useQuery,
  useSuspenseQuery,
  useInfiniteQuery,
  useSuspenseInfiniteQuery,
  useMutation,
  queryOptions,
  mutationOptions,
} from '@tanstack/react-query'
import type {
  UseQueryOptions,
  QueryFunctionContext,
  UseSuspenseQueryOptions,
  UseInfiniteQueryOptions,
  UseSuspenseInfiniteQueryOptions,
  UseMutationOptions,
} from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from './client'

/**
 * Generates TanStack Query mutation key for POST /orders
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostOrdersMutationKey() {
  return ['orders', 'POST', '/orders'] as const
}

/**
 * POST /orders
 *
 * Create an order with callback
 */
export async function postOrders(
  args: InferRequestType<typeof client.orders.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.orders.$post(args, options))
}

/**
 * Returns TanStack Query mutation options for POST /orders
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getPostOrdersMutationOptions(options?: ClientRequestOptions) {
  return mutationOptions({
    mutationKey: getPostOrdersMutationKey(),
    async mutationFn(args: InferRequestType<typeof client.orders.$post>) {
      return postOrders(args, options)
    },
  })
}

/**
 * POST /orders
 *
 * Create an order with callback
 */
export function usePostOrders(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postOrders>>,
    Error,
    InferRequestType<typeof client.orders.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({ ...getPostOrdersMutationOptions(clientOptions), ...mutationOptions })
}

/**
 * Generates TanStack Query mutation key for POST /payments
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostPaymentsMutationKey() {
  return ['payments', 'POST', '/payments'] as const
}

/**
 * POST /payments
 *
 * Create a payment with multiple callbacks
 */
export async function postPayments(
  args: InferRequestType<typeof client.payments.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.payments.$post(args, options))
}

/**
 * Returns TanStack Query mutation options for POST /payments
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getPostPaymentsMutationOptions(options?: ClientRequestOptions) {
  return mutationOptions({
    mutationKey: getPostPaymentsMutationKey(),
    async mutationFn(args: InferRequestType<typeof client.payments.$post>) {
      return postPayments(args, options)
    },
  })
}

/**
 * POST /payments
 *
 * Create a payment with multiple callbacks
 */
export function usePostPayments(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postPayments>>,
    Error,
    InferRequestType<typeof client.payments.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({ ...getPostPaymentsMutationOptions(clientOptions), ...mutationOptions })
}

/**
 * Generates TanStack Query cache key for GET /items
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetItemsQueryKey() {
  return ['items', 'GET', '/items'] as const
}

/**
 * GET /items
 *
 * List items (no callbacks)
 */
export async function getItems(options?: ClientRequestOptions) {
  return await parseResponse(client.items.$get(undefined, options))
}

/**
 * Returns TanStack Query query options for GET /items
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetItemsQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getGetItemsQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getItems({ ...options, init: { ...options?.init, signal } })
    },
  })
}

/**
 * GET /items
 *
 * List items (no callbacks)
 */
export function useGetItems(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getItems>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({ ...getGetItemsQueryOptions(clientOptions), ...queryOptions })
}

/**
 * GET /items
 *
 * List items (no callbacks)
 */
export function useSuspenseGetItems(options?: {
  query?: UseSuspenseQueryOptions<Awaited<ReturnType<typeof getItems>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({ ...getGetItemsQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query infinite query cache key for GET /items
 * Returns structured key ['prefix', 'method', 'path', 'infinite'] for filtering
 */
export function getGetItemsInfiniteQueryKey() {
  return ['items', 'GET', '/items', 'infinite'] as const
}

/**
 * Returns TanStack Query infinite query options for GET /items
 *
 * Use with prefetchInfiniteQuery, ensureInfiniteQueryData, or useInfiniteQuery.
 * Requires initialPageParam and getNextPageParam to be provided separately.
 */
export function getGetItemsInfiniteQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getGetItemsInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getItems({ ...options, init: { ...options?.init, signal } })
    },
  }
}

/**
 * GET /items
 *
 * List items (no callbacks)
 */
export function useInfiniteGetItems(options: {
  query: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getItems>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({ ...getGetItemsInfiniteQueryOptions(clientOptions), ...queryOptions })
}

/**
 * GET /items
 *
 * List items (no callbacks)
 */
export function useSuspenseInfiniteGetItems(options: {
  query: UseSuspenseInfiniteQueryOptions<Awaited<ReturnType<typeof getItems>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options
  return useSuspenseInfiniteQuery({
    ...getGetItemsInfiniteQueryOptions(clientOptions),
    ...queryOptions,
  })
}
