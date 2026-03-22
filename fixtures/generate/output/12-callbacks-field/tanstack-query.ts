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

/** Key prefix for /items */
export function getItemsKey() {
  return ['items'] as const
}

/** Key prefix for /orders */
export function getOrdersKey() {
  return ['orders'] as const
}

/** Key prefix for /payments */
export function getPaymentsKey() {
  return ['payments'] as const
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

/** POST /orders */
export function getPostOrdersMutationOptions(options?: ClientRequestOptions) {
  return mutationOptions({
    mutationKey: ['orders', '/orders'] as const,
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

/** POST /payments */
export function getPostPaymentsMutationOptions(options?: ClientRequestOptions) {
  return mutationOptions({
    mutationKey: ['payments', '/payments'] as const,
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

/** GET /items query key */
export function getItemsQueryKey() {
  return ['items', '/items'] as const
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
 * GET /items query options
 */
export function getItemsQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getItemsQueryKey(),
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
export function useItems(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getItems>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({ ...getItemsQueryOptions(clientOptions), ...queryOptions })
}

/**
 * GET /items
 *
 * List items (no callbacks)
 */
export function useSuspenseItems(options?: {
  query?: UseSuspenseQueryOptions<Awaited<ReturnType<typeof getItems>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({ ...getItemsQueryOptions(clientOptions), ...queryOptions })
}

/** GET /items infinite query key */
export function getItemsInfiniteQueryKey() {
  return ['items', '/items', 'infinite'] as const
}

/**
 * GET /items infinite query options
 */
export function getItemsInfiniteQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getItemsInfiniteQueryKey(),
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
export function useInfiniteItems(options: {
  query: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getItems>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({ ...getItemsInfiniteQueryOptions(clientOptions), ...queryOptions })
}

/**
 * GET /items
 *
 * List items (no callbacks)
 */
export function useSuspenseInfiniteItems(options: {
  query: UseSuspenseInfiniteQueryOptions<Awaited<ReturnType<typeof getItems>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options
  return useSuspenseInfiniteQuery({
    ...getItemsInfiniteQueryOptions(clientOptions),
    ...queryOptions,
  })
}
