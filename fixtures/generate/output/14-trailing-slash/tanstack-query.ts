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
 * Generates TanStack Query cache key for GET /api/reverseChiban/
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
 * Returns TanStack Query query options for GET /api/reverseChiban/
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
 * GET /api/reverseChiban/
 *
 * Reverse Chiban (trailing slash)
 */
export function useSuspenseGetApiReverseChibanIndex(options?: {
  query?: UseSuspenseQueryOptions<Awaited<ReturnType<typeof getApiReverseChibanIndex>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({
    ...getGetApiReverseChibanIndexQueryOptions(clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query infinite query cache key for GET /api/reverseChiban/
 * Returns structured key ['prefix', 'method', 'path', 'infinite'] for filtering
 */
export function getGetApiReverseChibanIndexInfiniteQueryKey() {
  return ['api', 'GET', '/api/reverseChiban/', 'infinite'] as const
}

/**
 * Returns TanStack Query infinite query options for GET /api/reverseChiban/
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
 * GET /api/reverseChiban/
 *
 * Reverse Chiban (trailing slash)
 */
export function useSuspenseInfiniteGetApiReverseChibanIndex(options: {
  query: UseSuspenseInfiniteQueryOptions<
    Awaited<ReturnType<typeof getApiReverseChibanIndex>>,
    Error
  >
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options
  return useSuspenseInfiniteQuery({
    ...getGetApiReverseChibanIndexInfiniteQueryOptions(clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /api/reverseChiban
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
 * Returns TanStack Query query options for GET /api/reverseChiban
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
 * GET /api/reverseChiban
 *
 * Reverse Chiban (no trailing slash)
 */
export function useSuspenseGetApiReverseChiban(options?: {
  query?: UseSuspenseQueryOptions<Awaited<ReturnType<typeof getApiReverseChiban>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({ ...getGetApiReverseChibanQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query infinite query cache key for GET /api/reverseChiban
 * Returns structured key ['prefix', 'method', 'path', 'infinite'] for filtering
 */
export function getGetApiReverseChibanInfiniteQueryKey() {
  return ['api', 'GET', '/api/reverseChiban', 'infinite'] as const
}

/**
 * Returns TanStack Query infinite query options for GET /api/reverseChiban
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
 * GET /api/reverseChiban
 *
 * Reverse Chiban (no trailing slash)
 */
export function useSuspenseInfiniteGetApiReverseChiban(options: {
  query: UseSuspenseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiReverseChiban>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options
  return useSuspenseInfiniteQuery({
    ...getGetApiReverseChibanInfiniteQueryOptions(clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /posts/
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetPostsIndexQueryKey(args: InferRequestType<typeof client.posts.index.$get>) {
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
 * Returns TanStack Query query options for GET /posts/
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetPostsIndexQueryOptions(
  args: InferRequestType<typeof client.posts.index.$get>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getGetPostsIndexQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getPostsIndex(args, { ...options, init: { ...options?.init, signal } })
    },
  })
}

/**
 * GET /posts/
 *
 * List posts (trailing slash only)
 */
export function useGetPostsIndex(
  args: InferRequestType<typeof client.posts.index.$get>,
  options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getPostsIndex>>, Error>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({ ...getGetPostsIndexQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * GET /posts/
 *
 * List posts (trailing slash only)
 */
export function useSuspenseGetPostsIndex(
  args: InferRequestType<typeof client.posts.index.$get>,
  options?: {
    query?: UseSuspenseQueryOptions<Awaited<ReturnType<typeof getPostsIndex>>, Error>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({ ...getGetPostsIndexQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query infinite query cache key for GET /posts/
 * Returns structured key ['prefix', 'method', 'path', args, 'infinite'] for filtering
 */
export function getGetPostsIndexInfiniteQueryKey(
  args: InferRequestType<typeof client.posts.index.$get>,
) {
  return ['posts', 'GET', '/posts/', args, 'infinite'] as const
}

/**
 * Returns TanStack Query infinite query options for GET /posts/
 *
 * Use with prefetchInfiniteQuery, ensureInfiniteQueryData, or useInfiniteQuery.
 * Requires initialPageParam and getNextPageParam to be provided separately.
 */
export function getGetPostsIndexInfiniteQueryOptions(
  args: InferRequestType<typeof client.posts.index.$get>,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getGetPostsIndexInfiniteQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getPostsIndex(args, { ...options, init: { ...options?.init, signal } })
    },
  }
}

/**
 * GET /posts/
 *
 * List posts (trailing slash only)
 */
export function useInfiniteGetPostsIndex(
  args: InferRequestType<typeof client.posts.index.$get>,
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
 * GET /posts/
 *
 * List posts (trailing slash only)
 */
export function useSuspenseInfiniteGetPostsIndex(
  args: InferRequestType<typeof client.posts.index.$get>,
  options: {
    query: UseSuspenseInfiniteQueryOptions<Awaited<ReturnType<typeof getPostsIndex>>, Error>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options
  return useSuspenseInfiniteQuery({
    ...getGetPostsIndexInfiniteQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query mutation key for POST /posts/
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
 * Returns TanStack Query mutation options for POST /posts/
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getPostPostsIndexMutationOptions(options?: ClientRequestOptions) {
  return mutationOptions({
    mutationKey: getPostPostsIndexMutationKey(),
    async mutationFn(args: InferRequestType<typeof client.posts.index.$post>) {
      return postPostsIndex(args, options)
    },
  })
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
 * Generates TanStack Query cache key for GET /users/{id}/
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetUsersIdIndexQueryKey(
  args: InferRequestType<(typeof client.users)[':id']['index']['$get']>,
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
 * Returns TanStack Query query options for GET /users/{id}/
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetUsersIdIndexQueryOptions(
  args: InferRequestType<(typeof client.users)[':id']['index']['$get']>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getGetUsersIdIndexQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getUsersIdIndex(args, { ...options, init: { ...options?.init, signal } })
    },
  })
}

/**
 * GET /users/{id}/
 *
 * Get user (trailing slash with path param)
 */
export function useGetUsersIdIndex(
  args: InferRequestType<(typeof client.users)[':id']['index']['$get']>,
  options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getUsersIdIndex>>, Error>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({ ...getGetUsersIdIndexQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * GET /users/{id}/
 *
 * Get user (trailing slash with path param)
 */
export function useSuspenseGetUsersIdIndex(
  args: InferRequestType<(typeof client.users)[':id']['index']['$get']>,
  options?: {
    query?: UseSuspenseQueryOptions<Awaited<ReturnType<typeof getUsersIdIndex>>, Error>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({
    ...getGetUsersIdIndexQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query infinite query cache key for GET /users/{id}/
 * Returns structured key ['prefix', 'method', 'path', args, 'infinite'] for filtering
 */
export function getGetUsersIdIndexInfiniteQueryKey(
  args: InferRequestType<(typeof client.users)[':id']['index']['$get']>,
) {
  return ['users', 'GET', '/users/:id/', args, 'infinite'] as const
}

/**
 * Returns TanStack Query infinite query options for GET /users/{id}/
 *
 * Use with prefetchInfiniteQuery, ensureInfiniteQueryData, or useInfiniteQuery.
 * Requires initialPageParam and getNextPageParam to be provided separately.
 */
export function getGetUsersIdIndexInfiniteQueryOptions(
  args: InferRequestType<(typeof client.users)[':id']['index']['$get']>,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getGetUsersIdIndexInfiniteQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getUsersIdIndex(args, { ...options, init: { ...options?.init, signal } })
    },
  }
}

/**
 * GET /users/{id}/
 *
 * Get user (trailing slash with path param)
 */
export function useInfiniteGetUsersIdIndex(
  args: InferRequestType<(typeof client.users)[':id']['index']['$get']>,
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
 * GET /users/{id}/
 *
 * Get user (trailing slash with path param)
 */
export function useSuspenseInfiniteGetUsersIdIndex(
  args: InferRequestType<(typeof client.users)[':id']['index']['$get']>,
  options: {
    query: UseSuspenseInfiniteQueryOptions<Awaited<ReturnType<typeof getUsersIdIndex>>, Error>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options
  return useSuspenseInfiniteQuery({
    ...getGetUsersIdIndexInfiniteQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /items/
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
 * Returns TanStack Query query options for GET /items/
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
 * GET /items/
 *
 * List items (trailing slash only)
 */
export function useSuspenseGetItemsIndex(options?: {
  query?: UseSuspenseQueryOptions<Awaited<ReturnType<typeof getItemsIndex>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({ ...getGetItemsIndexQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query infinite query cache key for GET /items/
 * Returns structured key ['prefix', 'method', 'path', 'infinite'] for filtering
 */
export function getGetItemsIndexInfiniteQueryKey() {
  return ['items', 'GET', '/items/', 'infinite'] as const
}

/**
 * Returns TanStack Query infinite query options for GET /items/
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

/**
 * GET /items/
 *
 * List items (trailing slash only)
 */
export function useSuspenseInfiniteGetItemsIndex(options: {
  query: UseSuspenseInfiniteQueryOptions<Awaited<ReturnType<typeof getItemsIndex>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options
  return useSuspenseInfiniteQuery({
    ...getGetItemsIndexInfiniteQueryOptions(clientOptions),
    ...queryOptions,
  })
}
