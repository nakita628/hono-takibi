import { createQuery, createMutation, queryOptions } from '@tanstack/svelte-query'
import type {
  CreateQueryOptions,
  QueryFunctionContext,
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
export function getPostOrdersMutationOptions(clientOptions?: ClientRequestOptions) {
  return {
    mutationKey: getPostOrdersMutationKey(),
    async mutationFn(args: Parameters<typeof postOrders>[0]) {
      return postOrders(args, clientOptions)
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
      Parameters<typeof postOrders>[0]
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    return { ...getPostOrdersMutationOptions(opts?.client), ...opts?.mutation }
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
export function getPostPaymentsMutationOptions(clientOptions?: ClientRequestOptions) {
  return {
    mutationKey: getPostPaymentsMutationKey(),
    async mutationFn(args: Parameters<typeof postPayments>[0]) {
      return postPayments(args, clientOptions)
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
      Parameters<typeof postPayments>[0]
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    return { ...getPostPaymentsMutationOptions(opts?.client), ...opts?.mutation }
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
export function getGetItemsQueryOptions(clientOptions?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getGetItemsQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getItems({ ...clientOptions, init: { ...clientOptions?.init, signal } })
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
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    return { ...getGetItemsQueryOptions(opts?.client), ...opts?.query }
  })
}
