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
 * Key prefix for /api
 */
export function getApiKey() {
  return ['api'] as const
}

/**
 * Key prefix for /items
 */
export function getItemsKey() {
  return ['items'] as const
}

/**
 * Key prefix for /posts
 */
export function getPostsKey() {
  return ['posts'] as const
}

/**
 * Key prefix for /users
 */
export function getUsersKey() {
  return ['users'] as const
}

/**
 * GET /api/reverseChiban/ query key
 */
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
export function createApiReverseChibanIndex(
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getApiReverseChibanIndex>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getApiReverseChibanIndexQueryOptions(clientOptions), ...query }
  })
}

/**
 * GET /api/reverseChiban/ infinite query key
 */
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
export function createInfiniteApiReverseChibanIndex(
  options: () => {
    query: CreateInfiniteQueryOptions<Awaited<ReturnType<typeof getApiReverseChibanIndex>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...getApiReverseChibanIndexInfiniteQueryOptions(clientOptions), ...query }
  })
}

/**
 * GET /api/reverseChiban query key
 */
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
export function createApiReverseChiban(
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getApiReverseChiban>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getApiReverseChibanQueryOptions(clientOptions), ...query }
  })
}

/**
 * GET /api/reverseChiban infinite query key
 */
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
export function createInfiniteApiReverseChiban(
  options: () => {
    query: CreateInfiniteQueryOptions<Awaited<ReturnType<typeof getApiReverseChiban>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...getApiReverseChibanInfiniteQueryOptions(clientOptions), ...query }
  })
}

/**
 * GET /posts/ query key
 */
export function getPostsIndexQueryKey(args: InferRequestType<typeof client.posts.index.$get>) {
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
  args: InferRequestType<typeof client.posts.index.$get>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getPostsIndexQueryKey(args),
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
export function createPostsIndex(
  args: () => InferRequestType<typeof client.posts.index.$get>,
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getPostsIndex>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getPostsIndexQueryOptions(args(), clientOptions), ...query }
  })
}

/**
 * GET /posts/ infinite query key
 */
export function getPostsIndexInfiniteQueryKey(
  args: InferRequestType<typeof client.posts.index.$get>,
) {
  return ['posts', '/posts/', args, 'infinite'] as const
}

/**
 * GET /posts/ infinite query options
 */
export function getPostsIndexInfiniteQueryOptions(
  args: InferRequestType<typeof client.posts.index.$get>,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getPostsIndexInfiniteQueryKey(args),
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
export function createInfinitePostsIndex(
  args: () => InferRequestType<typeof client.posts.index.$get>,
  options: () => {
    query: CreateInfiniteQueryOptions<Awaited<ReturnType<typeof getPostsIndex>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...getPostsIndexInfiniteQueryOptions(args(), clientOptions), ...query }
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

/**
 * POST /posts/
 */
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
 * GET /users/{id}/ query key
 */
export function getUsersIdIndexQueryKey(
  args: InferRequestType<(typeof client.users)[':id']['index']['$get']>,
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
  args: InferRequestType<(typeof client.users)[':id']['index']['$get']>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getUsersIdIndexQueryKey(args),
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
export function createUsersIdIndex(
  args: () => InferRequestType<(typeof client.users)[':id']['index']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getUsersIdIndex>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getUsersIdIndexQueryOptions(args(), clientOptions), ...query }
  })
}

/**
 * GET /users/{id}/ infinite query key
 */
export function getUsersIdIndexInfiniteQueryKey(
  args: InferRequestType<(typeof client.users)[':id']['index']['$get']>,
) {
  return ['users', '/users/:id/', args, 'infinite'] as const
}

/**
 * GET /users/{id}/ infinite query options
 */
export function getUsersIdIndexInfiniteQueryOptions(
  args: InferRequestType<(typeof client.users)[':id']['index']['$get']>,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getUsersIdIndexInfiniteQueryKey(args),
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
export function createInfiniteUsersIdIndex(
  args: () => InferRequestType<(typeof client.users)[':id']['index']['$get']>,
  options: () => {
    query: CreateInfiniteQueryOptions<Awaited<ReturnType<typeof getUsersIdIndex>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...getUsersIdIndexInfiniteQueryOptions(args(), clientOptions), ...query }
  })
}

/**
 * GET /items/ query key
 */
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
export function createItemsIndex(
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getItemsIndex>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getItemsIndexQueryOptions(clientOptions), ...query }
  })
}

/**
 * GET /items/ infinite query key
 */
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
export function createInfiniteItemsIndex(
  options: () => {
    query: CreateInfiniteQueryOptions<Awaited<ReturnType<typeof getItemsIndex>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...getItemsIndexInfiniteQueryOptions(clientOptions), ...query }
  })
}
