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
 * Generates SWR cache key for GET /users
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetUsersKey() {
  return ['users', 'GET', '/users'] as const
}

/**
 * GET /users
 *
 * List users
 */
export async function getUsers(options?: ClientRequestOptions) {
  return await parseResponse(client.users.$get(undefined, options))
}

/**
 * GET /users
 *
 * List users
 */
export function useGetUsers(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetUsersKey()) : null
  return { swrKey, ...useSWR(swrKey, async () => getUsers(clientOptions), restSwrOptions) }
}

/**
 * GET /users
 *
 * List users
 */
export function useImmutableGetUsers(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetUsersKey()) : null
  return { swrKey, ...useSWRImmutable(swrKey, async () => getUsers(clientOptions), restSwrOptions) }
}

/**
 * Generates SWR infinite query cache key for GET /users
 * Returns structured key ['prefix', 'method', 'path', 'infinite'] for filtering
 */
export function getGetUsersInfiniteKey() {
  return ['users', 'GET', '/users', 'infinite'] as const
}

/**
 * GET /users
 *
 * List users
 */
export function useInfiniteGetUsers(options: {
  swr?: SWRInfiniteConfiguration<Awaited<ReturnType<typeof getUsers>>, Error> & {
    swrKey?: SWRInfiniteKeyLoader
  }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKeyLoader, ...restSwrOptions } = swrOptions ?? {}
  const keyLoader =
    customKeyLoader ?? ((index: number) => [...getGetUsersInfiniteKey(), index] as const)
  return useSWRInfinite(keyLoader, async () => getUsers(clientOptions), restSwrOptions)
}

/**
 * Generates SWR mutation key for POST /users
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostUsersMutationKey() {
  return ['users', 'POST', '/users'] as const
}

/**
 * POST /users
 *
 * Create user
 */
export async function postUsers(
  args: InferRequestType<typeof client.users.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.users.$post(args, options))
}

/**
 * POST /users
 *
 * Create user
 */
export function usePostUsers(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof postUsers>>,
    Error,
    Key,
    InferRequestType<typeof client.users.$post>
  > & { swrKey?: Key }
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostUsersMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.users.$post> }) =>
        postUsers(arg, clientOptions),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /users/{id}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetUsersIdKey(args: InferRequestType<(typeof client.users)[':id']['$get']>) {
  return ['users', 'GET', '/users/:id', args] as const
}

/**
 * GET /users/{id}
 *
 * Get user by ID
 */
export async function getUsersId(
  args: InferRequestType<(typeof client.users)[':id']['$get']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.users[':id'].$get(args, options))
}

/**
 * GET /users/{id}
 *
 * Get user by ID
 */
export function useGetUsersId(
  args: InferRequestType<(typeof client.users)[':id']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetUsersIdKey(args)) : null
  return { swrKey, ...useSWR(swrKey, async () => getUsersId(args, clientOptions), restSwrOptions) }
}

/**
 * GET /users/{id}
 *
 * Get user by ID
 */
export function useImmutableGetUsersId(
  args: InferRequestType<(typeof client.users)[':id']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetUsersIdKey(args)) : null
  return {
    swrKey,
    ...useSWRImmutable(swrKey, async () => getUsersId(args, clientOptions), restSwrOptions),
  }
}

/**
 * Generates SWR infinite query cache key for GET /users/{id}
 * Returns structured key ['prefix', 'method', 'path', args, 'infinite'] for filtering
 */
export function getGetUsersIdInfiniteKey(
  args: InferRequestType<(typeof client.users)[':id']['$get']>,
) {
  return ['users', 'GET', '/users/:id', args, 'infinite'] as const
}

/**
 * GET /users/{id}
 *
 * Get user by ID
 */
export function useInfiniteGetUsersId(
  args: InferRequestType<(typeof client.users)[':id']['$get']>,
  options: {
    swr?: SWRInfiniteConfiguration<Awaited<ReturnType<typeof getUsersId>>, Error> & {
      swrKey?: SWRInfiniteKeyLoader
    }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKeyLoader, ...restSwrOptions } = swrOptions ?? {}
  const keyLoader =
    customKeyLoader ?? ((index: number) => [...getGetUsersIdInfiniteKey(args), index] as const)
  return useSWRInfinite(keyLoader, async () => getUsersId(args, clientOptions), restSwrOptions)
}

/**
 * Generates SWR mutation key for PUT /users/{id}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPutUsersIdMutationKey() {
  return ['users', 'PUT', '/users/:id'] as const
}

/**
 * PUT /users/{id}
 *
 * Update user
 */
export async function putUsersId(
  args: InferRequestType<(typeof client.users)[':id']['$put']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.users[':id'].$put(args, options))
}

/**
 * PUT /users/{id}
 *
 * Update user
 */
export function usePutUsersId(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof putUsersId>>,
    Error,
    Key,
    InferRequestType<(typeof client.users)[':id']['$put']>
  > & { swrKey?: Key }
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPutUsersIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<(typeof client.users)[':id']['$put']> }) =>
        putUsersId(arg, clientOptions),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /items
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetItemsKey() {
  return ['items', 'GET', '/items'] as const
}

/**
 * GET /items
 *
 * List items (uses $ref response alias)
 */
export async function getItems(options?: ClientRequestOptions) {
  return await parseResponse(client.items.$get(undefined, options))
}

/**
 * GET /items
 *
 * List items (uses $ref response alias)
 */
export function useGetItems(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetItemsKey()) : null
  return { swrKey, ...useSWR(swrKey, async () => getItems(clientOptions), restSwrOptions) }
}

/**
 * GET /items
 *
 * List items (uses $ref response alias)
 */
export function useImmutableGetItems(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetItemsKey()) : null
  return { swrKey, ...useSWRImmutable(swrKey, async () => getItems(clientOptions), restSwrOptions) }
}

/**
 * Generates SWR infinite query cache key for GET /items
 * Returns structured key ['prefix', 'method', 'path', 'infinite'] for filtering
 */
export function getGetItemsInfiniteKey() {
  return ['items', 'GET', '/items', 'infinite'] as const
}

/**
 * GET /items
 *
 * List items (uses $ref response alias)
 */
export function useInfiniteGetItems(options: {
  swr?: SWRInfiniteConfiguration<Awaited<ReturnType<typeof getItems>>, Error> & {
    swrKey?: SWRInfiniteKeyLoader
  }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKeyLoader, ...restSwrOptions } = swrOptions ?? {}
  const keyLoader =
    customKeyLoader ?? ((index: number) => [...getGetItemsInfiniteKey(), index] as const)
  return useSWRInfinite(keyLoader, async () => getItems(clientOptions), restSwrOptions)
}
