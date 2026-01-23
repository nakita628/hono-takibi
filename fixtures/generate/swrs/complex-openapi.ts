import useSWR from 'swr'
import type { Key, SWRConfiguration } from 'swr'
import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/complex-openapi'

/**
 * GET /users
 *
 * List all users
 */
export function useGetUsers(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.users.$get>, Error> & {
    swrKey?: Key
    enabled?: boolean
  }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetUsersKey() : null)
  const query = useSWR<InferResponseType<typeof client.users.$get>, Error>(
    swrKey,
    async () => parseResponse(client.users.$get(undefined, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /users
 */
export function getGetUsersKey() {
  return ['/users'] as const
}

/**
 * POST /users
 *
 * Create a new user
 */
export function usePostUsers(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.users.$post>,
    Error,
    string,
    InferRequestType<typeof client.users.$post>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.users.$post>,
    Error,
    string,
    InferRequestType<typeof client.users.$post>
  >(
    'POST /users',
    async (_, { arg }) => parseResponse(client.users.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * GET /users/{userId}
 *
 * Retrieve a user by ID
 */
export function useGetUsersUserId(
  args: InferRequestType<(typeof client.users)[':userId']['$get']>,
  options?: {
    swr?: SWRConfiguration<InferResponseType<(typeof client.users)[':userId']['$get']>, Error> & {
      swrKey?: Key
      enabled?: boolean
    }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetUsersUserIdKey(args) : null)
  const query = useSWR<InferResponseType<(typeof client.users)[':userId']['$get']>, Error>(
    swrKey,
    async () => parseResponse(client.users[':userId'].$get(args, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /users/{userId}
 */
export function getGetUsersUserIdKey(
  args?: InferRequestType<(typeof client.users)[':userId']['$get']>,
) {
  return ['/users/:userId', ...(args ? [args] : [])] as const
}

/**
 * PUT /users/{userId}
 *
 * Update an existing user
 */
export function usePutUsersUserId(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.users)[':userId']['$put']>,
    Error,
    string,
    InferRequestType<(typeof client.users)[':userId']['$put']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.users)[':userId']['$put']>,
    Error,
    string,
    InferRequestType<(typeof client.users)[':userId']['$put']>
  >(
    'PUT /users/:userId',
    async (_, { arg }) => parseResponse(client.users[':userId'].$put(arg, options?.client)),
    options?.swr,
  )
}

/**
 * DELETE /users/{userId}
 *
 * Delete a user
 */
export function useDeleteUsersUserId(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.users)[':userId']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.users)[':userId']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.users)[':userId']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.users)[':userId']['$delete']>
  >(
    'DELETE /users/:userId',
    async (_, { arg }) => parseResponse(client.users[':userId'].$delete(arg, options?.client)),
    options?.swr,
  )
}

/**
 * GET /orders
 *
 * List all orders
 */
export function useGetOrders(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.orders.$get>, Error> & {
    swrKey?: Key
    enabled?: boolean
  }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetOrdersKey() : null)
  const query = useSWR<InferResponseType<typeof client.orders.$get>, Error>(
    swrKey,
    async () => parseResponse(client.orders.$get(undefined, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /orders
 */
export function getGetOrdersKey() {
  return ['/orders'] as const
}

/**
 * POST /orders
 *
 * Create a new order
 */
export function usePostOrders(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.orders.$post>,
    Error,
    string,
    InferRequestType<typeof client.orders.$post>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.orders.$post>,
    Error,
    string,
    InferRequestType<typeof client.orders.$post>
  >(
    'POST /orders',
    async (_, { arg }) => parseResponse(client.orders.$post(arg, options?.client)),
    options?.swr,
  )
}
