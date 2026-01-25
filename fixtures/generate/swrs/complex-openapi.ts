import type { ClientRequestOptions, InferRequestType, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import type { Key, SWRConfiguration } from 'swr'
import useSWR from 'swr'
import type { SWRMutationConfiguration } from 'swr/mutation'
import useSWRMutation from 'swr/mutation'
import { client } from '../clients/complex-openapi'

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
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetUsersKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.users.$get(undefined, clientOptions)),
      swrOptions,
    ),
  }
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
  mutation?: SWRMutationConfiguration<
    InferResponseType<typeof client.users.$post>,
    Error,
    string,
    InferRequestType<typeof client.users.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /users',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.users.$post> }) =>
      parseResponse(client.users.$post(arg, options?.client)),
    mutationOptions,
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetUsersUserIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.users[':userId'].$get(args, clientOptions)),
      swrOptions,
    ),
  }
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
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.users)[':userId']['$put']>,
    Error,
    string,
    InferRequestType<(typeof client.users)[':userId']['$put']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'PUT /users/:userId',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.users)[':userId']['$put']> },
    ) => parseResponse(client.users[':userId'].$put(arg, options?.client)),
    mutationOptions,
  )
}

/**
 * DELETE /users/{userId}
 *
 * Delete a user
 */
export function useDeleteUsersUserId(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.users)[':userId']['$delete']> | undefined,
    Error,
    string,
    InferRequestType<(typeof client.users)[':userId']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'DELETE /users/:userId',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.users)[':userId']['$delete']> },
    ) => parseResponse(client.users[':userId'].$delete(arg, options?.client)),
    mutationOptions,
  )
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
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetOrdersKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.orders.$get(undefined, clientOptions)),
      swrOptions,
    ),
  }
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
  mutation?: SWRMutationConfiguration<
    InferResponseType<typeof client.orders.$post>,
    Error,
    string,
    InferRequestType<typeof client.orders.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /orders',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.orders.$post> }) =>
      parseResponse(client.orders.$post(arg, options?.client)),
    mutationOptions,
  )
}
