import useSWR from 'swr'
import type { Key, SWRConfiguration } from 'swr'
import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/complex-openapi'

/**
 * Generates SWR cache key for GET /users
 * Returns structured key [path] for filter-based invalidation
 */
export function getGetUsersKey() {
  return ['/users'] as const
}

/**
 * GET /users
 *
 * List all users
 */
export function useGetUsers(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetUsersKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.users.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /users
 * Returns key [method, path] to avoid collisions between different methods on same path
 */
export function getPostUsersMutationKey() {
  return ['POST', '/users'] as const
}

/**
 * POST /users
 *
 * Create a new user
 */
export function usePostUsers(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$post>>>>>,
    Error,
    Key,
    InferRequestType<typeof client.users.$post>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostUsersMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.users.$post> }) =>
        parseResponse(client.users.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /users/{userId}
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetUsersUserIdKey(
  args: InferRequestType<(typeof client.users)[':userId']['$get']>,
) {
  return [`/users/${args.param.userId}`, args] as const
}

/**
 * GET /users/{userId}
 *
 * Retrieve a user by ID
 */
export function useGetUsersUserId(
  args: InferRequestType<(typeof client.users)[':userId']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetUsersUserIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.users[':userId'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PUT /users/{userId}
 * Returns key [method, path] to avoid collisions between different methods on same path
 */
export function getPutUsersUserIdMutationKey() {
  return ['PUT', '/users/:userId'] as const
}

/**
 * PUT /users/{userId}
 *
 * Update an existing user
 */
export function usePutUsersUserId(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':userId']['$put']>>>
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.users)[':userId']['$put']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPutUsersUserIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.users)[':userId']['$put']> },
      ) => parseResponse(client.users[':userId'].$put(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /users/{userId}
 * Returns key [method, path] to avoid collisions between different methods on same path
 */
export function getDeleteUsersUserIdMutationKey() {
  return ['DELETE', '/users/:userId'] as const
}

/**
 * DELETE /users/{userId}
 *
 * Delete a user
 */
export function useDeleteUsersUserId(options?: {
  mutation?: SWRMutationConfiguration<
    | Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':userId']['$delete']>>>
        >
      >
    | undefined,
    Error,
    Key,
    InferRequestType<(typeof client.users)[':userId']['$delete']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteUsersUserIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.users)[':userId']['$delete']> },
      ) => parseResponse(client.users[':userId'].$delete(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /orders
 * Returns structured key [path] for filter-based invalidation
 */
export function getGetOrdersKey() {
  return ['/orders'] as const
}

/**
 * GET /orders
 *
 * List all orders
 */
export function useGetOrders(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetOrdersKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.orders.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /orders
 * Returns key [method, path] to avoid collisions between different methods on same path
 */
export function getPostOrdersMutationKey() {
  return ['POST', '/orders'] as const
}

/**
 * POST /orders
 *
 * Create a new order
 */
export function usePostOrders(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.orders.$post>>>>>,
    Error,
    Key,
    InferRequestType<typeof client.orders.$post>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostOrdersMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.orders.$post> }) =>
        parseResponse(client.orders.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}
