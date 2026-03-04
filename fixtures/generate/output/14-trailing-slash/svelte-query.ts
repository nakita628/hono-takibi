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
 * Generates Svelte Query cache key for GET /api/reverseChiban/
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
 * Returns Svelte Query query options for GET /api/reverseChiban/
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
export function createGetApiReverseChibanIndex(
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getApiReverseChibanIndex>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getGetApiReverseChibanIndexQueryOptions(clientOptions), ...query }
  })
}

/**
 * Generates Svelte Query infinite query cache key for GET /api/reverseChiban/
 * Returns structured key ['prefix', 'method', 'path', 'infinite'] for filtering
 */
export function getGetApiReverseChibanIndexInfiniteQueryKey() {
  return ['api', 'GET', '/api/reverseChiban/', 'infinite'] as const
}

/**
 * Returns Svelte Query infinite query options for GET /api/reverseChiban/
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
export function createInfiniteGetApiReverseChibanIndex(
  options: () => {
    query: CreateInfiniteQueryOptions<Awaited<ReturnType<typeof getApiReverseChibanIndex>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...getGetApiReverseChibanIndexInfiniteQueryOptions(clientOptions), ...query }
  })
}

/**
 * Generates Svelte Query cache key for GET /api/reverseChiban
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
 * Returns Svelte Query query options for GET /api/reverseChiban
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
export function createGetApiReverseChiban(
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getApiReverseChiban>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getGetApiReverseChibanQueryOptions(clientOptions), ...query }
  })
}

/**
 * Generates Svelte Query infinite query cache key for GET /api/reverseChiban
 * Returns structured key ['prefix', 'method', 'path', 'infinite'] for filtering
 */
export function getGetApiReverseChibanInfiniteQueryKey() {
  return ['api', 'GET', '/api/reverseChiban', 'infinite'] as const
}

/**
 * Returns Svelte Query infinite query options for GET /api/reverseChiban
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
export function createInfiniteGetApiReverseChiban(
  options: () => {
    query: CreateInfiniteQueryOptions<Awaited<ReturnType<typeof getApiReverseChiban>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...getGetApiReverseChibanInfiniteQueryOptions(clientOptions), ...query }
  })
}

/**
 * Generates Svelte Query cache key for GET /posts/
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
 * Returns Svelte Query query options for GET /posts/
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
export function createGetPostsIndex(
  args: () => InferRequestType<typeof client.posts.index.$get>,
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getPostsIndex>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getGetPostsIndexQueryOptions(args(), clientOptions), ...query }
  })
}

/**
 * Generates Svelte Query infinite query cache key for GET /posts/
 * Returns structured key ['prefix', 'method', 'path', args, 'infinite'] for filtering
 */
export function getGetPostsIndexInfiniteQueryKey(
  args: InferRequestType<typeof client.posts.index.$get>,
) {
  return ['posts', 'GET', '/posts/', args, 'infinite'] as const
}

/**
 * Returns Svelte Query infinite query options for GET /posts/
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
export function createInfiniteGetPostsIndex(
  args: () => InferRequestType<typeof client.posts.index.$get>,
  options: () => {
    query: CreateInfiniteQueryOptions<Awaited<ReturnType<typeof getPostsIndex>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...getGetPostsIndexInfiniteQueryOptions(args(), clientOptions), ...query }
  })
}

/**
 * Generates Svelte Query mutation key for POST /posts/
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
 * Returns Svelte Query mutation options for POST /posts/
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
export function createPostPostsIndex(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof postPostsIndex>>,
      Error,
      InferRequestType<typeof client.posts.index.$post>
    >
    options?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const { mutation, options: clientOptions } = options?.() ?? {}
    return { ...getPostPostsIndexMutationOptions(clientOptions), ...mutation }
  })
}

/**
 * Generates Svelte Query cache key for GET /users/{id}/
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
 * Returns Svelte Query query options for GET /users/{id}/
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
export function createGetUsersIdIndex(
  args: () => InferRequestType<(typeof client.users)[':id']['index']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getUsersIdIndex>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getGetUsersIdIndexQueryOptions(args(), clientOptions), ...query }
  })
}

/**
 * Generates Svelte Query infinite query cache key for GET /users/{id}/
 * Returns structured key ['prefix', 'method', 'path', args, 'infinite'] for filtering
 */
export function getGetUsersIdIndexInfiniteQueryKey(
  args: InferRequestType<(typeof client.users)[':id']['index']['$get']>,
) {
  return ['users', 'GET', '/users/:id/', args, 'infinite'] as const
}

/**
 * Returns Svelte Query infinite query options for GET /users/{id}/
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
export function createInfiniteGetUsersIdIndex(
  args: () => InferRequestType<(typeof client.users)[':id']['index']['$get']>,
  options: () => {
    query: CreateInfiniteQueryOptions<Awaited<ReturnType<typeof getUsersIdIndex>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...getGetUsersIdIndexInfiniteQueryOptions(args(), clientOptions), ...query }
  })
}

/**
 * Generates Svelte Query cache key for GET /items/
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
 * Returns Svelte Query query options for GET /items/
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
export function createGetItemsIndex(
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getItemsIndex>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getGetItemsIndexQueryOptions(clientOptions), ...query }
  })
}

/**
 * Generates Svelte Query infinite query cache key for GET /items/
 * Returns structured key ['prefix', 'method', 'path', 'infinite'] for filtering
 */
export function getGetItemsIndexInfiniteQueryKey() {
  return ['items', 'GET', '/items/', 'infinite'] as const
}

/**
 * Returns Svelte Query infinite query options for GET /items/
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
export function createInfiniteGetItemsIndex(
  options: () => {
    query: CreateInfiniteQueryOptions<Awaited<ReturnType<typeof getItemsIndex>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...getGetItemsIndexInfiniteQueryOptions(clientOptions), ...query }
  })
}
