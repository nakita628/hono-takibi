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
 * Generates TanStack Query mutation key for POST /subscriptions
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
 * Returns TanStack Query mutation options for POST /subscriptions
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getPostSubscriptionsMutationOptions(options?: ClientRequestOptions) {
  return mutationOptions({
    mutationKey: getPostSubscriptionsMutationKey(),
    async mutationFn(args: InferRequestType<typeof client.subscriptions.$post>) {
      return postSubscriptions(args, options)
    },
  })
}

/**
 * POST /subscriptions
 */
export function usePostSubscriptions(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postSubscriptions>>,
    Error,
    InferRequestType<typeof client.subscriptions.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({ ...getPostSubscriptionsMutationOptions(clientOptions), ...mutationOptions })
}

/**
 * Generates TanStack Query cache key for GET /subscriptions/{id}
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
 * Returns TanStack Query query options for GET /subscriptions/{id}
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
export function useGetSubscriptionsId(
  args: InferRequestType<(typeof client.subscriptions)[':id']['$get']>,
  options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getSubscriptionsId>>, Error>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({ ...getGetSubscriptionsIdQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * GET /subscriptions/{id}
 */
export function useSuspenseGetSubscriptionsId(
  args: InferRequestType<(typeof client.subscriptions)[':id']['$get']>,
  options?: {
    query?: UseSuspenseQueryOptions<Awaited<ReturnType<typeof getSubscriptionsId>>, Error>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({
    ...getGetSubscriptionsIdQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query infinite query cache key for GET /subscriptions/{id}
 * Returns structured key ['prefix', 'method', 'path', args, 'infinite'] for filtering
 */
export function getGetSubscriptionsIdInfiniteQueryKey(
  args: InferRequestType<(typeof client.subscriptions)[':id']['$get']>,
) {
  return ['subscriptions', 'GET', '/subscriptions/:id', args, 'infinite'] as const
}

/**
 * Returns TanStack Query infinite query options for GET /subscriptions/{id}
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
export function useInfiniteGetSubscriptionsId(
  args: InferRequestType<(typeof client.subscriptions)[':id']['$get']>,
  options: {
    query: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getSubscriptionsId>>, Error>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({
    ...getGetSubscriptionsIdInfiniteQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * GET /subscriptions/{id}
 */
export function useSuspenseInfiniteGetSubscriptionsId(
  args: InferRequestType<(typeof client.subscriptions)[':id']['$get']>,
  options: {
    query: UseSuspenseInfiniteQueryOptions<Awaited<ReturnType<typeof getSubscriptionsId>>, Error>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options
  return useSuspenseInfiniteQuery({
    ...getGetSubscriptionsIdInfiniteQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query mutation key for DELETE /subscriptions/{id}
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
 * Returns TanStack Query mutation options for DELETE /subscriptions/{id}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getDeleteSubscriptionsIdMutationOptions(options?: ClientRequestOptions) {
  return mutationOptions({
    mutationKey: getDeleteSubscriptionsIdMutationKey(),
    async mutationFn(args: InferRequestType<(typeof client.subscriptions)[':id']['$delete']>) {
      return deleteSubscriptionsId(args, options)
    },
  })
}

/**
 * DELETE /subscriptions/{id}
 */
export function useDeleteSubscriptionsId(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof deleteSubscriptionsId>> | undefined,
    Error,
    InferRequestType<(typeof client.subscriptions)[':id']['$delete']>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...getDeleteSubscriptionsIdMutationOptions(clientOptions),
    ...mutationOptions,
  })
}

/**
 * Generates TanStack Query mutation key for POST /webhooks/test
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
 * Returns TanStack Query mutation options for POST /webhooks/test
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getPostWebhooksTestMutationOptions(options?: ClientRequestOptions) {
  return mutationOptions({
    mutationKey: getPostWebhooksTestMutationKey(),
    async mutationFn(args: InferRequestType<typeof client.webhooks.test.$post>) {
      return postWebhooksTest(args, options)
    },
  })
}

/**
 * POST /webhooks/test
 */
export function usePostWebhooksTest(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postWebhooksTest>>,
    Error,
    InferRequestType<typeof client.webhooks.test.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({ ...getPostWebhooksTestMutationOptions(clientOptions), ...mutationOptions })
}
