import { useQuery, useMutation } from '@tanstack/react-query'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/complex-openapi'

/**
 * GET /users
 *
 * List all users
 */
export function useGetUsers(options?: {
  query?: {
    enabled?: boolean
    staleTime?: number
    gcTime?: number
    refetchInterval?: number | false
    refetchOnWindowFocus?: boolean
    refetchOnMount?: boolean
    refetchOnReconnect?: boolean
    retry?: boolean | number
    retryDelay?: number
    select?: (
      data: InferResponseType<typeof client.users.$get>,
    ) => InferResponseType<typeof client.users.$get>
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetUsersQueryKey(),
    queryFn: async () => parseResponse(client.users.$get(undefined, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /users
 */
export function getGetUsersQueryKey() {
  return ['/users'] as const
}

/**
 * POST /users
 *
 * Create a new user
 */
export function usePostUsers(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.users.$post>,
      variables: InferRequestType<typeof client.users.$post>,
    ) => void
    onError?: (error: Error, variables: InferRequestType<typeof client.users.$post>) => void
    onSettled?: (
      data: InferResponseType<typeof client.users.$post> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.users.$post>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.users.$post>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (args: InferRequestType<typeof client.users.$post>) =>
      parseResponse(client.users.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /users/{userId}
 *
 * Retrieve a user by ID
 */
export function useGetUsersUserId(
  args: InferRequestType<(typeof client.users)[':userId']['$get']>,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
      select?: (
        data: InferResponseType<(typeof client.users)[':userId']['$get']>,
      ) => InferResponseType<(typeof client.users)[':userId']['$get']>
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetUsersUserIdQueryKey(args),
    queryFn: async () => parseResponse(client.users[':userId'].$get(args, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /users/{userId}
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
export function usePutUsersUserId(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.users)[':userId']['$put']>,
      variables: InferRequestType<(typeof client.users)[':userId']['$put']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.users)[':userId']['$put']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client.users)[':userId']['$put']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.users)[':userId']['$put']>,
    ) => void
    onMutate?: (variables: InferRequestType<(typeof client.users)[':userId']['$put']>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (args: InferRequestType<(typeof client.users)[':userId']['$put']>) =>
      parseResponse(client.users[':userId'].$put(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * DELETE /users/{userId}
 *
 * Delete a user
 */
export function useDeleteUsersUserId(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.users)[':userId']['$delete']> | undefined,
      variables: InferRequestType<(typeof client.users)[':userId']['$delete']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.users)[':userId']['$delete']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client.users)[':userId']['$delete']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.users)[':userId']['$delete']>,
    ) => void
    onMutate?: (variables: InferRequestType<(typeof client.users)[':userId']['$delete']>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (args: InferRequestType<(typeof client.users)[':userId']['$delete']>) =>
      parseResponse(client.users[':userId'].$delete(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /orders
 *
 * List all orders
 */
export function useGetOrders(options?: {
  query?: {
    enabled?: boolean
    staleTime?: number
    gcTime?: number
    refetchInterval?: number | false
    refetchOnWindowFocus?: boolean
    refetchOnMount?: boolean
    refetchOnReconnect?: boolean
    retry?: boolean | number
    retryDelay?: number
    select?: (
      data: InferResponseType<typeof client.orders.$get>,
    ) => InferResponseType<typeof client.orders.$get>
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetOrdersQueryKey(),
    queryFn: async () => parseResponse(client.orders.$get(undefined, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /orders
 */
export function getGetOrdersQueryKey() {
  return ['/orders'] as const
}

/**
 * POST /orders
 *
 * Create a new order
 */
export function usePostOrders(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.orders.$post>,
      variables: InferRequestType<typeof client.orders.$post>,
    ) => void
    onError?: (error: Error, variables: InferRequestType<typeof client.orders.$post>) => void
    onSettled?: (
      data: InferResponseType<typeof client.orders.$post> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.orders.$post>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.orders.$post>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (args: InferRequestType<typeof client.orders.$post>) =>
      parseResponse(client.orders.$post(args, clientOptions)),
    ...mutationOptions,
  })
}
