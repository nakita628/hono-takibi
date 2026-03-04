import { useQuery, useInfiniteQuery, useMutation, queryOptions } from '@tanstack/vue-query'
import type {
  UseQueryOptions,
  QueryFunctionContext,
  UseInfiniteQueryOptions,
  UseMutationOptions,
} from '@tanstack/vue-query'
import { toValue } from 'vue'
import type { MaybeRefOrGetter } from 'vue'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from './client'

/**
 * Generates Vue Query cache key for GET /api/reverseChiban/
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetApiReverseChibanIndexQueryKey() {
  return ['api', 'GET', '/api/reverseChiban/'] as const
}

/**
 * GET /api/reverseChiban/
 *
 * Reverse Chiban (trailing slash)
 */
export async function getApiReverseChibanIndex(options?: ClientRequestOptions) {
  return await parseResponse(client.api.reverseChiban.index.$get(undefined, options))
}

/**
 * Returns Vue Query query options for GET /api/reverseChiban/
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetApiReverseChibanIndexQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getGetApiReverseChibanIndexQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getApiReverseChibanIndex({ ...options, init: { ...options?.init, signal } })
    },
  })
}

/**
 * GET /api/reverseChiban/
 *
 * Reverse Chiban (trailing slash)
 */
export function useGetApiReverseChibanIndex(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getApiReverseChibanIndex>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({ ...getGetApiReverseChibanIndexQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query infinite query cache key for GET /api/reverseChiban/
 * Returns structured key ['prefix', 'method', 'path', 'infinite'] for filtering
 */
export function getGetApiReverseChibanIndexInfiniteQueryKey() {
  return ['api', 'GET', '/api/reverseChiban/', 'infinite'] as const
}

/**
 * Returns Vue Query infinite query options for GET /api/reverseChiban/
 *
 * Use with prefetchInfiniteQuery, ensureInfiniteQueryData, or useInfiniteQuery.
 * Requires initialPageParam and getNextPageParam to be provided separately.
 */
export function getGetApiReverseChibanIndexInfiniteQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getGetApiReverseChibanIndexInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getApiReverseChibanIndex({ ...options, init: { ...options?.init, signal } })
    },
  }
}

/**
 * GET /api/reverseChiban/
 *
 * Reverse Chiban (trailing slash)
 */
export function useInfiniteGetApiReverseChibanIndex(options: {
  query: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiReverseChibanIndex>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({
    ...getGetApiReverseChibanIndexInfiniteQueryOptions(clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /api/reverseChiban
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetApiReverseChibanQueryKey() {
  return ['api', 'GET', '/api/reverseChiban'] as const
}

/**
 * GET /api/reverseChiban
 *
 * Reverse Chiban (no trailing slash)
 */
export async function getApiReverseChiban(options?: ClientRequestOptions) {
  return await parseResponse(client.api.reverseChiban.$get(undefined, options))
}

/**
 * Returns Vue Query query options for GET /api/reverseChiban
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetApiReverseChibanQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getGetApiReverseChibanQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getApiReverseChiban({ ...options, init: { ...options?.init, signal } })
    },
  })
}

/**
 * GET /api/reverseChiban
 *
 * Reverse Chiban (no trailing slash)
 */
export function useGetApiReverseChiban(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getApiReverseChiban>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({ ...getGetApiReverseChibanQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query infinite query cache key for GET /api/reverseChiban
 * Returns structured key ['prefix', 'method', 'path', 'infinite'] for filtering
 */
export function getGetApiReverseChibanInfiniteQueryKey() {
  return ['api', 'GET', '/api/reverseChiban', 'infinite'] as const
}

/**
 * Returns Vue Query infinite query options for GET /api/reverseChiban
 *
 * Use with prefetchInfiniteQuery, ensureInfiniteQueryData, or useInfiniteQuery.
 * Requires initialPageParam and getNextPageParam to be provided separately.
 */
export function getGetApiReverseChibanInfiniteQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getGetApiReverseChibanInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getApiReverseChiban({ ...options, init: { ...options?.init, signal } })
    },
  }
}

/**
 * GET /api/reverseChiban
 *
 * Reverse Chiban (no trailing slash)
 */
export function useInfiniteGetApiReverseChiban(options: {
  query: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiReverseChiban>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({
    ...getGetApiReverseChibanInfiniteQueryOptions(clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /posts/
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetPostsIndexQueryKey(
  args: MaybeRefOrGetter<InferRequestType<typeof client.posts.index.$get>>,
) {
  return ['posts', 'GET', '/posts/', args] as const
}

/**
 * GET /posts/
 *
 * List posts (trailing slash only)
 */
export async function getPostsIndex(
  args: InferRequestType<typeof client.posts.index.$get>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.posts.index.$get(args, options))
}

/**
 * Returns Vue Query query options for GET /posts/
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetPostsIndexQueryOptions(
  args: MaybeRefOrGetter<InferRequestType<typeof client.posts.index.$get>>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getGetPostsIndexQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getPostsIndex(toValue(args), { ...options, init: { ...options?.init, signal } })
    },
  })
}

/**
 * GET /posts/
 *
 * List posts (trailing slash only)
 */
export function useGetPostsIndex(
  args: MaybeRefOrGetter<InferRequestType<typeof client.posts.index.$get>>,
  options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getPostsIndex>>, Error>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({ ...getGetPostsIndexQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query infinite query cache key for GET /posts/
 * Returns structured key ['prefix', 'method', 'path', args, 'infinite'] for filtering
 */
export function getGetPostsIndexInfiniteQueryKey(
  args: MaybeRefOrGetter<InferRequestType<typeof client.posts.index.$get>>,
) {
  return ['posts', 'GET', '/posts/', args, 'infinite'] as const
}

/**
 * Returns Vue Query infinite query options for GET /posts/
 *
 * Use with prefetchInfiniteQuery, ensureInfiniteQueryData, or useInfiniteQuery.
 * Requires initialPageParam and getNextPageParam to be provided separately.
 */
export function getGetPostsIndexInfiniteQueryOptions(
  args: MaybeRefOrGetter<InferRequestType<typeof client.posts.index.$get>>,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getGetPostsIndexInfiniteQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getPostsIndex(toValue(args), { ...options, init: { ...options?.init, signal } })
    },
  }
}

/**
 * GET /posts/
 *
 * List posts (trailing slash only)
 */
export function useInfiniteGetPostsIndex(
  args: MaybeRefOrGetter<InferRequestType<typeof client.posts.index.$get>>,
  options: {
    query: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getPostsIndex>>, Error>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({
    ...getGetPostsIndexInfiniteQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query mutation key for POST /posts/
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostPostsIndexMutationKey() {
  return ['posts', 'POST', '/posts/'] as const
}

/**
 * POST /posts/
 *
 * Create post (trailing slash only)
 */
export async function postPostsIndex(
  args: InferRequestType<typeof client.posts.index.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.posts.index.$post(args, options))
}

/**
 * Returns Vue Query mutation options for POST /posts/
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getPostPostsIndexMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: getPostPostsIndexMutationKey(),
    async mutationFn(args: InferRequestType<typeof client.posts.index.$post>) {
      return postPostsIndex(args, options)
    },
  }
}

/**
 * POST /posts/
 *
 * Create post (trailing slash only)
 */
export function usePostPostsIndex(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postPostsIndex>>,
    Error,
    InferRequestType<typeof client.posts.index.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({ ...getPostPostsIndexMutationOptions(clientOptions), ...mutationOptions })
}

/**
 * Generates Vue Query cache key for GET /users/{id}/
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetUsersIdIndexQueryKey(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.users)[':id']['index']['$get']>>,
) {
  return ['users', 'GET', '/users/:id/', args] as const
}

/**
 * GET /users/{id}/
 *
 * Get user (trailing slash with path param)
 */
export async function getUsersIdIndex(
  args: InferRequestType<(typeof client.users)[':id']['index']['$get']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.users[':id'].index.$get(args, options))
}

/**
 * Returns Vue Query query options for GET /users/{id}/
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetUsersIdIndexQueryOptions(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.users)[':id']['index']['$get']>>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getGetUsersIdIndexQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getUsersIdIndex(toValue(args), { ...options, init: { ...options?.init, signal } })
    },
  })
}

/**
 * GET /users/{id}/
 *
 * Get user (trailing slash with path param)
 */
export function useGetUsersIdIndex(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.users)[':id']['index']['$get']>>,
  options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getUsersIdIndex>>, Error>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({ ...getGetUsersIdIndexQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query infinite query cache key for GET /users/{id}/
 * Returns structured key ['prefix', 'method', 'path', args, 'infinite'] for filtering
 */
export function getGetUsersIdIndexInfiniteQueryKey(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.users)[':id']['index']['$get']>>,
) {
  return ['users', 'GET', '/users/:id/', args, 'infinite'] as const
}

/**
 * Returns Vue Query infinite query options for GET /users/{id}/
 *
 * Use with prefetchInfiniteQuery, ensureInfiniteQueryData, or useInfiniteQuery.
 * Requires initialPageParam and getNextPageParam to be provided separately.
 */
export function getGetUsersIdIndexInfiniteQueryOptions(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.users)[':id']['index']['$get']>>,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getGetUsersIdIndexInfiniteQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getUsersIdIndex(toValue(args), { ...options, init: { ...options?.init, signal } })
    },
  }
}

/**
 * GET /users/{id}/
 *
 * Get user (trailing slash with path param)
 */
export function useInfiniteGetUsersIdIndex(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.users)[':id']['index']['$get']>>,
  options: {
    query: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getUsersIdIndex>>, Error>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({
    ...getGetUsersIdIndexInfiniteQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /items/
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetItemsIndexQueryKey() {
  return ['items', 'GET', '/items/'] as const
}

/**
 * GET /items/
 *
 * List items (trailing slash only)
 */
export async function getItemsIndex(options?: ClientRequestOptions) {
  return await parseResponse(client.items.index.$get(undefined, options))
}

/**
 * Returns Vue Query query options for GET /items/
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetItemsIndexQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getGetItemsIndexQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getItemsIndex({ ...options, init: { ...options?.init, signal } })
    },
  })
}

/**
 * GET /items/
 *
 * List items (trailing slash only)
 */
export function useGetItemsIndex(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getItemsIndex>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({ ...getGetItemsIndexQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query infinite query cache key for GET /items/
 * Returns structured key ['prefix', 'method', 'path', 'infinite'] for filtering
 */
export function getGetItemsIndexInfiniteQueryKey() {
  return ['items', 'GET', '/items/', 'infinite'] as const
}

/**
 * Returns Vue Query infinite query options for GET /items/
 *
 * Use with prefetchInfiniteQuery, ensureInfiniteQueryData, or useInfiniteQuery.
 * Requires initialPageParam and getNextPageParam to be provided separately.
 */
export function getGetItemsIndexInfiniteQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getGetItemsIndexInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getItemsIndex({ ...options, init: { ...options?.init, signal } })
    },
  }
}

/**
 * GET /items/
 *
 * List items (trailing slash only)
 */
export function useInfiniteGetItemsIndex(options: {
  query: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getItemsIndex>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({
    ...getGetItemsIndexInfiniteQueryOptions(clientOptions),
    ...queryOptions,
  })
}
