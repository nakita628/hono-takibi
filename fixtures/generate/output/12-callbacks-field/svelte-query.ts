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
  return {
    mutationKey: ['orders', '/orders'] as const,
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
  return {
    mutationKey: ['payments', '/payments'] as const,
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
export function createItems(
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getItems>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getItemsQueryOptions(clientOptions), ...query }
  })
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
export function createInfiniteItems(
  options: () => {
    query: CreateInfiniteQueryOptions<Awaited<ReturnType<typeof getItems>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...getItemsInfiniteQueryOptions(clientOptions), ...query }
  })
}
