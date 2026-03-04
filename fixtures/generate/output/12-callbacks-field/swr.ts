import useSWR from 'swr'
import useSWRImmutable from 'swr/immutable'
import type { Key, SWRConfiguration } from 'swr'
import useSWRInfinite from 'swr/infinite'
import type { SWRInfiniteConfiguration, SWRInfiniteKeyLoader } from 'swr/infinite'
import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from './client'

/**
 * Generates SWR mutation key for POST /orders
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
 * POST /orders
 *
 * Create an order with callback
 */
export function usePostOrders(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof postOrders>>,
    Error,
    Key,
    InferRequestType<typeof client.orders.$post>
  > & { swrKey?: Key }
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostOrdersMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.orders.$post> }) =>
        postOrders(arg, clientOptions),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /payments
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
 * POST /payments
 *
 * Create a payment with multiple callbacks
 */
export function usePostPayments(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof postPayments>>,
    Error,
    Key,
    InferRequestType<typeof client.payments.$post>
  > & { swrKey?: Key }
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostPaymentsMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.payments.$post> }) =>
        postPayments(arg, clientOptions),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /items
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetItemsKey() {
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
 * GET /items
 *
 * List items (no callbacks)
 */
export function useGetItems(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetItemsKey()) : null
  return { swrKey, ...useSWR(swrKey, async () => getItems(clientOptions), restSwrOptions) }
}

/**
 * GET /items
 *
 * List items (no callbacks)
 */
export function useImmutableGetItems(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetItemsKey()) : null
  return { swrKey, ...useSWRImmutable(swrKey, async () => getItems(clientOptions), restSwrOptions) }
}

/**
 * Generates SWR infinite query cache key for GET /items
 * Returns structured key ['prefix', 'method', 'path', 'infinite'] for filtering
 */
export function getGetItemsInfiniteKey() {
  return ['items', 'GET', '/items', 'infinite'] as const
}

/**
 * GET /items
 *
 * List items (no callbacks)
 */
export function useInfiniteGetItems(options: {
  swr?: SWRInfiniteConfiguration<Awaited<ReturnType<typeof getItems>>, Error> & {
    swrKey?: SWRInfiniteKeyLoader
  }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKeyLoader, ...restSwrOptions } = swrOptions ?? {}
  const keyLoader =
    customKeyLoader ?? ((index: number) => [...getGetItemsInfiniteKey(), index] as const)
  return useSWRInfinite(keyLoader, async () => getItems(clientOptions), restSwrOptions)
}
