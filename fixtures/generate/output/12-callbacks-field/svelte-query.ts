import {
  createQuery,
  createInfiniteQuery,
  createMutation,
  queryOptions,
} from '@tanstack/svelte-query'
import type {
  CreateQueryOptions,
  QueryFunctionContext,
  CreateInfiniteQueryOptions,
  CreateMutationOptions,
} from '@tanstack/svelte-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from './client'

/**
 * Generates Svelte Query mutation key for POST /orders
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
 * Returns Svelte Query mutation options for POST /orders
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getPostOrdersMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: getPostOrdersMutationKey(),
    async mutationFn(args: InferRequestType<typeof client.orders.$post>) {
      return postOrders(args, options)
    },
  }
}

/**
 * POST /orders
 *
 * Create an order with callback
 */
export function createPostOrders(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof postOrders>>,
      Error,
      InferRequestType<typeof client.orders.$post>
    >
    options?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const { mutation, options: clientOptions } = options?.() ?? {}
    return { ...getPostOrdersMutationOptions(clientOptions), ...mutation }
  })
}

/**
 * Generates Svelte Query mutation key for POST /payments
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
 * Returns Svelte Query mutation options for POST /payments
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getPostPaymentsMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: getPostPaymentsMutationKey(),
    async mutationFn(args: InferRequestType<typeof client.payments.$post>) {
      return postPayments(args, options)
    },
  }
}

/**
 * POST /payments
 *
 * Create a payment with multiple callbacks
 */
export function createPostPayments(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof postPayments>>,
      Error,
      InferRequestType<typeof client.payments.$post>
    >
    options?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const { mutation, options: clientOptions } = options?.() ?? {}
    return { ...getPostPaymentsMutationOptions(clientOptions), ...mutation }
  })
}

/**
 * Generates Svelte Query cache key for GET /items
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
 * Returns Svelte Query query options for GET /items
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
export function createGetItems(
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getItems>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getGetItemsQueryOptions(clientOptions), ...query }
  })
}

/**
 * Generates Svelte Query infinite query cache key for GET /items
 * Returns structured key ['prefix', 'method', 'path', 'infinite'] for filtering
 */
export function getGetItemsInfiniteQueryKey() {
  return ['items', 'GET', '/items', 'infinite'] as const
}

/**
 * Returns Svelte Query infinite query options for GET /items
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
export function createInfiniteGetItems(
  options: () => {
    query: CreateInfiniteQueryOptions<Awaited<ReturnType<typeof getItems>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...getGetItemsInfiniteQueryOptions(clientOptions), ...query }
  })
}
