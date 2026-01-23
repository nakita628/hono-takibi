import { useQuery, useMutation } from '@tanstack/vue-query'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/complex-openapi'

/**
 * GET /users
 *
 * List all users
 */
export function useGetUsers(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetUsersQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.users.$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /users
 */
export function getGetUsersQueryKey() {
  return ['/users'] as const
}

/**
 * POST /users
 *
 * Create a new user
 */
export function usePostUsers(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<typeof client.users.$post> | undefined,
    Error,
    InferRequestType<typeof client.users.$post>
  >({ mutationFn: async (args) => parseResponse(client.users.$post(args, clientOptions)) })
}

/**
 * GET /users/{userId}
 *
 * Retrieve a user by ID
 */
export function useGetUsersUserId(
  args: InferRequestType<(typeof client.users)[':userId']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetUsersUserIdQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.users[':userId'].$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /users/{userId}
 */
export function getGetUsersUserIdQueryKey(
  args: InferRequestType<(typeof client.users)[':userId']['$get']>,
) {
  return ['/users/:userId', args] as const
}

/**
 * PUT /users/{userId}
 *
 * Update an existing user
 */
export function usePutUsersUserId(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.users)[':userId']['$put']> | undefined,
    Error,
    InferRequestType<(typeof client.users)[':userId']['$put']>
  >({
    mutationFn: async (args) => parseResponse(client.users[':userId'].$put(args, clientOptions)),
  })
}

/**
 * DELETE /users/{userId}
 *
 * Delete a user
 */
export function useDeleteUsersUserId(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.users)[':userId']['$delete']> | undefined,
    Error,
    InferRequestType<(typeof client.users)[':userId']['$delete']>
  >({
    mutationFn: async (args) => parseResponse(client.users[':userId'].$delete(args, clientOptions)),
  })
}

/**
 * GET /orders
 *
 * List all orders
 */
export function useGetOrders(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetOrdersQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.orders.$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /orders
 */
export function getGetOrdersQueryKey() {
  return ['/orders'] as const
}

/**
 * POST /orders
 *
 * Create a new order
 */
export function usePostOrders(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<typeof client.orders.$post> | undefined,
    Error,
    InferRequestType<typeof client.orders.$post>
  >({ mutationFn: async (args) => parseResponse(client.orders.$post(args, clientOptions)) })
}
