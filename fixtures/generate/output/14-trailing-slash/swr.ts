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
 * Generates SWR cache key for GET /api/reverseChiban/
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetApiReverseChibanIndexKey() {
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
 * GET /api/reverseChiban/
 *
 * Reverse Chiban (trailing slash)
 */
export function useGetApiReverseChibanIndex(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetApiReverseChibanIndexKey()) : null
  return {
    swrKey,
    ...useSWR(swrKey, async () => getApiReverseChibanIndex(clientOptions), restSwrOptions),
  }
}

/**
 * GET /api/reverseChiban/
 *
 * Reverse Chiban (trailing slash)
 */
export function useImmutableGetApiReverseChibanIndex(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetApiReverseChibanIndexKey()) : null
  return {
    swrKey,
    ...useSWRImmutable(swrKey, async () => getApiReverseChibanIndex(clientOptions), restSwrOptions),
  }
}

/**
 * Generates SWR infinite query cache key for GET /api/reverseChiban/
 * Returns structured key ['prefix', 'method', 'path', 'infinite'] for filtering
 */
export function getGetApiReverseChibanIndexInfiniteKey() {
  return ['api', 'GET', '/api/reverseChiban/', 'infinite'] as const
}

/**
 * GET /api/reverseChiban/
 *
 * Reverse Chiban (trailing slash)
 */
export function useInfiniteGetApiReverseChibanIndex(options: {
  swr?: SWRInfiniteConfiguration<Awaited<ReturnType<typeof getApiReverseChibanIndex>>, Error> & {
    swrKey?: SWRInfiniteKeyLoader
  }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKeyLoader, ...restSwrOptions } = swrOptions ?? {}
  const keyLoader =
    customKeyLoader ??
    ((index: number) => [...getGetApiReverseChibanIndexInfiniteKey(), index] as const)
  return useSWRInfinite(
    keyLoader,
    async () => getApiReverseChibanIndex(clientOptions),
    restSwrOptions,
  )
}

/**
 * Generates SWR cache key for GET /api/reverseChiban
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetApiReverseChibanKey() {
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
 * GET /api/reverseChiban
 *
 * Reverse Chiban (no trailing slash)
 */
export function useGetApiReverseChiban(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetApiReverseChibanKey()) : null
  return {
    swrKey,
    ...useSWR(swrKey, async () => getApiReverseChiban(clientOptions), restSwrOptions),
  }
}

/**
 * GET /api/reverseChiban
 *
 * Reverse Chiban (no trailing slash)
 */
export function useImmutableGetApiReverseChiban(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetApiReverseChibanKey()) : null
  return {
    swrKey,
    ...useSWRImmutable(swrKey, async () => getApiReverseChiban(clientOptions), restSwrOptions),
  }
}

/**
 * Generates SWR infinite query cache key for GET /api/reverseChiban
 * Returns structured key ['prefix', 'method', 'path', 'infinite'] for filtering
 */
export function getGetApiReverseChibanInfiniteKey() {
  return ['api', 'GET', '/api/reverseChiban', 'infinite'] as const
}

/**
 * GET /api/reverseChiban
 *
 * Reverse Chiban (no trailing slash)
 */
export function useInfiniteGetApiReverseChiban(options: {
  swr?: SWRInfiniteConfiguration<Awaited<ReturnType<typeof getApiReverseChiban>>, Error> & {
    swrKey?: SWRInfiniteKeyLoader
  }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKeyLoader, ...restSwrOptions } = swrOptions ?? {}
  const keyLoader =
    customKeyLoader ?? ((index: number) => [...getGetApiReverseChibanInfiniteKey(), index] as const)
  return useSWRInfinite(keyLoader, async () => getApiReverseChiban(clientOptions), restSwrOptions)
}

/**
 * Generates SWR cache key for GET /posts/
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetPostsIndexKey(args: InferRequestType<typeof client.posts.index.$get>) {
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
 * GET /posts/
 *
 * List posts (trailing slash only)
 */
export function useGetPostsIndex(
  args: InferRequestType<typeof client.posts.index.$get>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetPostsIndexKey(args)) : null
  return {
    swrKey,
    ...useSWR(swrKey, async () => getPostsIndex(args, clientOptions), restSwrOptions),
  }
}

/**
 * GET /posts/
 *
 * List posts (trailing slash only)
 */
export function useImmutableGetPostsIndex(
  args: InferRequestType<typeof client.posts.index.$get>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetPostsIndexKey(args)) : null
  return {
    swrKey,
    ...useSWRImmutable(swrKey, async () => getPostsIndex(args, clientOptions), restSwrOptions),
  }
}

/**
 * Generates SWR infinite query cache key for GET /posts/
 * Returns structured key ['prefix', 'method', 'path', args, 'infinite'] for filtering
 */
export function getGetPostsIndexInfiniteKey(
  args: InferRequestType<typeof client.posts.index.$get>,
) {
  return ['posts', 'GET', '/posts/', args, 'infinite'] as const
}

/**
 * GET /posts/
 *
 * List posts (trailing slash only)
 */
export function useInfiniteGetPostsIndex(
  args: InferRequestType<typeof client.posts.index.$get>,
  options: {
    swr?: SWRInfiniteConfiguration<Awaited<ReturnType<typeof getPostsIndex>>, Error> & {
      swrKey?: SWRInfiniteKeyLoader
    }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKeyLoader, ...restSwrOptions } = swrOptions ?? {}
  const keyLoader =
    customKeyLoader ?? ((index: number) => [...getGetPostsIndexInfiniteKey(args), index] as const)
  return useSWRInfinite(keyLoader, async () => getPostsIndex(args, clientOptions), restSwrOptions)
}

/**
 * Generates SWR mutation key for POST /posts/
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
 * POST /posts/
 *
 * Create post (trailing slash only)
 */
export function usePostPostsIndex(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof postPostsIndex>>,
    Error,
    Key,
    InferRequestType<typeof client.posts.index.$post>
  > & { swrKey?: Key }
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostPostsIndexMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.posts.index.$post> }) =>
        postPostsIndex(arg, clientOptions),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /users/{id}/
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetUsersIdIndexKey(
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
 * GET /users/{id}/
 *
 * Get user (trailing slash with path param)
 */
export function useGetUsersIdIndex(
  args: InferRequestType<(typeof client.users)[':id']['index']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetUsersIdIndexKey(args)) : null
  return {
    swrKey,
    ...useSWR(swrKey, async () => getUsersIdIndex(args, clientOptions), restSwrOptions),
  }
}

/**
 * GET /users/{id}/
 *
 * Get user (trailing slash with path param)
 */
export function useImmutableGetUsersIdIndex(
  args: InferRequestType<(typeof client.users)[':id']['index']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetUsersIdIndexKey(args)) : null
  return {
    swrKey,
    ...useSWRImmutable(swrKey, async () => getUsersIdIndex(args, clientOptions), restSwrOptions),
  }
}

/**
 * Generates SWR infinite query cache key for GET /users/{id}/
 * Returns structured key ['prefix', 'method', 'path', args, 'infinite'] for filtering
 */
export function getGetUsersIdIndexInfiniteKey(
  args: InferRequestType<(typeof client.users)[':id']['index']['$get']>,
) {
  return ['users', 'GET', '/users/:id/', args, 'infinite'] as const
}

/**
 * GET /users/{id}/
 *
 * Get user (trailing slash with path param)
 */
export function useInfiniteGetUsersIdIndex(
  args: InferRequestType<(typeof client.users)[':id']['index']['$get']>,
  options: {
    swr?: SWRInfiniteConfiguration<Awaited<ReturnType<typeof getUsersIdIndex>>, Error> & {
      swrKey?: SWRInfiniteKeyLoader
    }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKeyLoader, ...restSwrOptions } = swrOptions ?? {}
  const keyLoader =
    customKeyLoader ?? ((index: number) => [...getGetUsersIdIndexInfiniteKey(args), index] as const)
  return useSWRInfinite(keyLoader, async () => getUsersIdIndex(args, clientOptions), restSwrOptions)
}

/**
 * Generates SWR cache key for GET /items/
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetItemsIndexKey() {
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
 * GET /items/
 *
 * List items (trailing slash only)
 */
export function useGetItemsIndex(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetItemsIndexKey()) : null
  return { swrKey, ...useSWR(swrKey, async () => getItemsIndex(clientOptions), restSwrOptions) }
}

/**
 * GET /items/
 *
 * List items (trailing slash only)
 */
export function useImmutableGetItemsIndex(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetItemsIndexKey()) : null
  return {
    swrKey,
    ...useSWRImmutable(swrKey, async () => getItemsIndex(clientOptions), restSwrOptions),
  }
}

/**
 * Generates SWR infinite query cache key for GET /items/
 * Returns structured key ['prefix', 'method', 'path', 'infinite'] for filtering
 */
export function getGetItemsIndexInfiniteKey() {
  return ['items', 'GET', '/items/', 'infinite'] as const
}

/**
 * GET /items/
 *
 * List items (trailing slash only)
 */
export function useInfiniteGetItemsIndex(options: {
  swr?: SWRInfiniteConfiguration<Awaited<ReturnType<typeof getItemsIndex>>, Error> & {
    swrKey?: SWRInfiniteKeyLoader
  }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKeyLoader, ...restSwrOptions } = swrOptions ?? {}
  const keyLoader =
    customKeyLoader ?? ((index: number) => [...getGetItemsIndexInfiniteKey(), index] as const)
  return useSWRInfinite(keyLoader, async () => getItemsIndex(clientOptions), restSwrOptions)
}
