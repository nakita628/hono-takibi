import useSWR from 'swr'
import type { Key, SWRConfiguration } from 'swr'
import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
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
export function useGetApiReverseChibanIndex(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = isEnabled ? (customKey ?? getGetApiReverseChibanIndexKey()) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.api.reverseChiban.index.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
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
export function useGetApiReverseChiban(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = isEnabled ? (customKey ?? getGetApiReverseChibanKey()) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.api.reverseChiban.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
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
export function useGetPostsIndex(
  args: InferRequestType<typeof client.posts.index.$get>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = isEnabled ? (customKey ?? getGetPostsIndexKey(args)) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.posts.index.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
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
export function usePostPostsIndex(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.posts.index.$post>>>>>,
    Error,
    Key,
    InferRequestType<typeof client.posts.index.$post>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostPostsIndexMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.posts.index.$post> }) =>
        parseResponse(client.posts.index.$post(arg, clientOptions)),
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
export function useGetUsersIdIndex(
  args: InferRequestType<(typeof client.users)[':id']['index']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = isEnabled ? (customKey ?? getGetUsersIdIndexKey(args)) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.users[':id'].index.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
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
export function useGetItemsIndex(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = isEnabled ? (customKey ?? getGetItemsIndexKey()) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.items.index.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}
