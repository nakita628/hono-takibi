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
 * Generates Svelte Query mutation key for POST /subscriptions
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostSubscriptionsMutationKey() {
  return ['subscriptions', 'POST', '/subscriptions'] as const
}

/**
 * POST /subscriptions
 */
export async function postSubscriptions(
  args: InferRequestType<typeof client.subscriptions.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.subscriptions.$post(args, options))
}

/**
 * Returns Svelte Query mutation options for POST /subscriptions
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getPostSubscriptionsMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: getPostSubscriptionsMutationKey(),
    async mutationFn(args: InferRequestType<typeof client.subscriptions.$post>) {
      return postSubscriptions(args, options)
    },
  }
}

/**
 * POST /subscriptions
 */
export function createPostSubscriptions(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof postSubscriptions>>,
      Error,
      InferRequestType<typeof client.subscriptions.$post>
    >
    options?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const { mutation, options: clientOptions } = options?.() ?? {}
    return { ...getPostSubscriptionsMutationOptions(clientOptions), ...mutation }
  })
}

/**
 * Generates Svelte Query cache key for GET /subscriptions/{id}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetSubscriptionsIdQueryKey(
  args: InferRequestType<(typeof client.subscriptions)[':id']['$get']>,
) {
  return ['subscriptions', 'GET', '/subscriptions/:id', args] as const
}

/**
 * GET /subscriptions/{id}
 */
export async function getSubscriptionsId(
  args: InferRequestType<(typeof client.subscriptions)[':id']['$get']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.subscriptions[':id'].$get(args, options))
}

/**
 * Returns Svelte Query query options for GET /subscriptions/{id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetSubscriptionsIdQueryOptions(
  args: InferRequestType<(typeof client.subscriptions)[':id']['$get']>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getGetSubscriptionsIdQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getSubscriptionsId(args, { ...options, init: { ...options?.init, signal } })
    },
  })
}

/**
 * GET /subscriptions/{id}
 */
export function createGetSubscriptionsId(
  args: () => InferRequestType<(typeof client.subscriptions)[':id']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getSubscriptionsId>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getGetSubscriptionsIdQueryOptions(args(), clientOptions), ...query }
  })
}

/**
 * Generates Svelte Query infinite query cache key for GET /subscriptions/{id}
 * Returns structured key ['prefix', 'method', 'path', args, 'infinite'] for filtering
 */
export function getGetSubscriptionsIdInfiniteQueryKey(
  args: InferRequestType<(typeof client.subscriptions)[':id']['$get']>,
) {
  return ['subscriptions', 'GET', '/subscriptions/:id', args, 'infinite'] as const
}

/**
 * Returns Svelte Query infinite query options for GET /subscriptions/{id}
 *
 * Use with prefetchInfiniteQuery, ensureInfiniteQueryData, or useInfiniteQuery.
 * Requires initialPageParam and getNextPageParam to be provided separately.
 */
export function getGetSubscriptionsIdInfiniteQueryOptions(
  args: InferRequestType<(typeof client.subscriptions)[':id']['$get']>,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getGetSubscriptionsIdInfiniteQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getSubscriptionsId(args, { ...options, init: { ...options?.init, signal } })
    },
  }
}

/**
 * GET /subscriptions/{id}
 */
export function createInfiniteGetSubscriptionsId(
  args: () => InferRequestType<(typeof client.subscriptions)[':id']['$get']>,
  options: () => {
    query: CreateInfiniteQueryOptions<Awaited<ReturnType<typeof getSubscriptionsId>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...getGetSubscriptionsIdInfiniteQueryOptions(args(), clientOptions), ...query }
  })
}

/**
 * Generates Svelte Query mutation key for DELETE /subscriptions/{id}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getDeleteSubscriptionsIdMutationKey() {
  return ['subscriptions', 'DELETE', '/subscriptions/:id'] as const
}

/**
 * DELETE /subscriptions/{id}
 */
export async function deleteSubscriptionsId(
  args: InferRequestType<(typeof client.subscriptions)[':id']['$delete']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.subscriptions[':id'].$delete(args, options))
}

/**
 * Returns Svelte Query mutation options for DELETE /subscriptions/{id}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getDeleteSubscriptionsIdMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: getDeleteSubscriptionsIdMutationKey(),
    async mutationFn(args: InferRequestType<(typeof client.subscriptions)[':id']['$delete']>) {
      return deleteSubscriptionsId(args, options)
    },
  }
}

/**
 * DELETE /subscriptions/{id}
 */
export function createDeleteSubscriptionsId(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof deleteSubscriptionsId>> | undefined,
      Error,
      InferRequestType<(typeof client.subscriptions)[':id']['$delete']>
    >
    options?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const { mutation, options: clientOptions } = options?.() ?? {}
    return { ...getDeleteSubscriptionsIdMutationOptions(clientOptions), ...mutation }
  })
}

/**
 * Generates Svelte Query mutation key for POST /webhooks/test
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostWebhooksTestMutationKey() {
  return ['webhooks', 'POST', '/webhooks/test'] as const
}

/**
 * POST /webhooks/test
 */
export async function postWebhooksTest(
  args: InferRequestType<typeof client.webhooks.test.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.webhooks.test.$post(args, options))
}

/**
 * Returns Svelte Query mutation options for POST /webhooks/test
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getPostWebhooksTestMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: getPostWebhooksTestMutationKey(),
    async mutationFn(args: InferRequestType<typeof client.webhooks.test.$post>) {
      return postWebhooksTest(args, options)
    },
  }
}

/**
 * POST /webhooks/test
 */
export function createPostWebhooksTest(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof postWebhooksTest>>,
      Error,
      InferRequestType<typeof client.webhooks.test.$post>
    >
    options?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const { mutation, options: clientOptions } = options?.() ?? {}
    return { ...getPostWebhooksTestMutationOptions(clientOptions), ...mutation }
  })
}
