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

/** Key prefix for /api */
export function getApiKey() {
  return ['api'] as const
}

/** Key prefix for /items */
export function getItemsKey() {
  return ['items'] as const
}

/** Key prefix for /posts */
export function getPostsKey() {
  return ['posts'] as const
}

/** Key prefix for /users */
export function getUsersKey() {
  return ['users'] as const
}

/** GET /api/reverseChiban/ query key */
export function getApiReverseChibanIndexQueryKey() {
  return ['api', '/api/reverseChiban/'] as const
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
 * GET /api/reverseChiban/ query options
 */
export function getApiReverseChibanIndexQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getApiReverseChibanIndexQueryKey(),
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
export function useApiReverseChibanIndex(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getApiReverseChibanIndex>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({ ...getApiReverseChibanIndexQueryOptions(clientOptions), ...queryOptions })
}

/** GET /api/reverseChiban/ infinite query key */
export function getApiReverseChibanIndexInfiniteQueryKey() {
  return ['api', '/api/reverseChiban/', 'infinite'] as const
}

/**
 * GET /api/reverseChiban/ infinite query options
 */
export function getApiReverseChibanIndexInfiniteQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getApiReverseChibanIndexInfiniteQueryKey(),
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
export function useInfiniteApiReverseChibanIndex(options: {
  query: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiReverseChibanIndex>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({
    ...getApiReverseChibanIndexInfiniteQueryOptions(clientOptions),
    ...queryOptions,
  })
}

/** GET /api/reverseChiban query key */
export function getApiReverseChibanQueryKey() {
  return ['api', '/api/reverseChiban'] as const
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
 * GET /api/reverseChiban query options
 */
export function getApiReverseChibanQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getApiReverseChibanQueryKey(),
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
export function useApiReverseChiban(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getApiReverseChiban>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({ ...getApiReverseChibanQueryOptions(clientOptions), ...queryOptions })
}

/** GET /api/reverseChiban infinite query key */
export function getApiReverseChibanInfiniteQueryKey() {
  return ['api', '/api/reverseChiban', 'infinite'] as const
}

/**
 * GET /api/reverseChiban infinite query options
 */
export function getApiReverseChibanInfiniteQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getApiReverseChibanInfiniteQueryKey(),
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
export function useInfiniteApiReverseChiban(options: {
  query: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiReverseChiban>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({
    ...getApiReverseChibanInfiniteQueryOptions(clientOptions),
    ...queryOptions,
  })
}

/** GET /posts/ query key */
export function getPostsIndexQueryKey(
  args: MaybeRefOrGetter<InferRequestType<typeof client.posts.index.$get>>,
) {
  return ['posts', '/posts/', args] as const
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
 * GET /posts/ query options
 */
export function getPostsIndexQueryOptions(
  args: MaybeRefOrGetter<InferRequestType<typeof client.posts.index.$get>>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getPostsIndexQueryKey(args),
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
export function usePostsIndex(
  args: MaybeRefOrGetter<InferRequestType<typeof client.posts.index.$get>>,
  options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getPostsIndex>>, Error>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({ ...getPostsIndexQueryOptions(args, clientOptions), ...queryOptions })
}

/** GET /posts/ infinite query key */
export function getPostsIndexInfiniteQueryKey(
  args: MaybeRefOrGetter<InferRequestType<typeof client.posts.index.$get>>,
) {
  return ['posts', '/posts/', args, 'infinite'] as const
}

/**
 * GET /posts/ infinite query options
 */
export function getPostsIndexInfiniteQueryOptions(
  args: MaybeRefOrGetter<InferRequestType<typeof client.posts.index.$get>>,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getPostsIndexInfiniteQueryKey(args),
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
export function useInfinitePostsIndex(
  args: MaybeRefOrGetter<InferRequestType<typeof client.posts.index.$get>>,
  options: {
    query: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getPostsIndex>>, Error>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({
    ...getPostsIndexInfiniteQueryOptions(args, clientOptions),
    ...queryOptions,
  })
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

/** POST /posts/ */
export function getPostPostsIndexMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['posts', '/posts/'] as const,
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

/** GET /users/{id}/ query key */
export function getUsersIdIndexQueryKey(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.users)[':id']['index']['$get']>>,
) {
  return ['users', '/users/:id/', args] as const
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
 * GET /users/{id}/ query options
 */
export function getUsersIdIndexQueryOptions(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.users)[':id']['index']['$get']>>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getUsersIdIndexQueryKey(args),
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
export function useUsersIdIndex(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.users)[':id']['index']['$get']>>,
  options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getUsersIdIndex>>, Error>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({ ...getUsersIdIndexQueryOptions(args, clientOptions), ...queryOptions })
}

/** GET /users/{id}/ infinite query key */
export function getUsersIdIndexInfiniteQueryKey(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.users)[':id']['index']['$get']>>,
) {
  return ['users', '/users/:id/', args, 'infinite'] as const
}

/**
 * GET /users/{id}/ infinite query options
 */
export function getUsersIdIndexInfiniteQueryOptions(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.users)[':id']['index']['$get']>>,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getUsersIdIndexInfiniteQueryKey(args),
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
export function useInfiniteUsersIdIndex(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.users)[':id']['index']['$get']>>,
  options: {
    query: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getUsersIdIndex>>, Error>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({
    ...getUsersIdIndexInfiniteQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/** GET /items/ query key */
export function getItemsIndexQueryKey() {
  return ['items', '/items/'] as const
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
 * GET /items/ query options
 */
export function getItemsIndexQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getItemsIndexQueryKey(),
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
export function useItemsIndex(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getItemsIndex>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({ ...getItemsIndexQueryOptions(clientOptions), ...queryOptions })
}

/** GET /items/ infinite query key */
export function getItemsIndexInfiniteQueryKey() {
  return ['items', '/items/', 'infinite'] as const
}

/**
 * GET /items/ infinite query options
 */
export function getItemsIndexInfiniteQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getItemsIndexInfiniteQueryKey(),
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
export function useInfiniteItemsIndex(options: {
  query: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getItemsIndex>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({ ...getItemsIndexInfiniteQueryOptions(clientOptions), ...queryOptions })
}
