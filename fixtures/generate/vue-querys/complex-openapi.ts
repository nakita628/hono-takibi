import { useQuery, useMutation } from '@tanstack/vue-query'
import type { UseQueryOptions, QueryFunctionContext, UseMutationOptions } from '@tanstack/vue-query'
import { unref } from 'vue'
import type { MaybeRef } from 'vue'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/complex-openapi'

/**
 * Generates Vue Query cache key for GET /users
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetUsersQueryKey() {
  return ['users', '/users'] as const
}

/**
 * Returns Vue Query query options for GET /users
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetUsersQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetUsersQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.users.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /users
 *
 * List all users
 */
export function useGetUsers(options?: {
  query?: Partial<
    Omit<
      UseQueryOptions<
        Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>,
        Error
      >,
      'queryKey' | 'queryFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetUsersQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query mutation key for POST /users
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getPostUsersMutationKey() {
  return ['POST', '/users'] as const
}

/**
 * Returns Vue Query mutation options for POST /users
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostUsersMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostUsersMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.users.$post>) =>
    parseResponse(client.users.$post(args, clientOptions)),
})

/**
 * POST /users
 *
 * Create a new user
 */
export function usePostUsers(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$post>>>>>,
        Error,
        InferRequestType<typeof client.users.$post>
      >,
      'mutationFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.users.$post>) =>
      parseResponse(client.users.$post(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /users/{userId}
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetUsersUserIdQueryKey(
  args: MaybeRef<InferRequestType<(typeof client.users)[':userId']['$get']>>,
) {
  return ['users', '/users/:userId', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /users/{userId}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetUsersUserIdQueryOptions = (
  args: InferRequestType<(typeof client.users)[':userId']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetUsersUserIdQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.users[':userId'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /users/{userId}
 *
 * Retrieve a user by ID
 */
export function useGetUsersUserId(
  args: InferRequestType<(typeof client.users)[':userId']['$get']>,
  options?: {
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':userId']['$get']>>>
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetUsersUserIdQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query mutation key for PUT /users/{userId}
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getPutUsersUserIdMutationKey() {
  return ['PUT', '/users/:userId'] as const
}

/**
 * Returns Vue Query mutation options for PUT /users/{userId}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPutUsersUserIdMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPutUsersUserIdMutationKey(),
  mutationFn: async (args: InferRequestType<(typeof client.users)[':userId']['$put']>) =>
    parseResponse(client.users[':userId'].$put(args, clientOptions)),
})

/**
 * PUT /users/{userId}
 *
 * Update an existing user
 */
export function usePutUsersUserId(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':userId']['$put']>>>
          >
        >,
        Error,
        InferRequestType<(typeof client.users)[':userId']['$put']>
      >,
      'mutationFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<(typeof client.users)[':userId']['$put']>) =>
      parseResponse(client.users[':userId'].$put(args, clientOptions)),
  })
}

/**
 * Generates Vue Query mutation key for DELETE /users/{userId}
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getDeleteUsersUserIdMutationKey() {
  return ['DELETE', '/users/:userId'] as const
}

/**
 * Returns Vue Query mutation options for DELETE /users/{userId}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getDeleteUsersUserIdMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getDeleteUsersUserIdMutationKey(),
  mutationFn: async (args: InferRequestType<(typeof client.users)[':userId']['$delete']>) =>
    parseResponse(client.users[':userId'].$delete(args, clientOptions)),
})

/**
 * DELETE /users/{userId}
 *
 * Delete a user
 */
export function useDeleteUsersUserId(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        | Awaited<
            ReturnType<
              typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':userId']['$delete']>>>
            >
          >
        | undefined,
        Error,
        InferRequestType<(typeof client.users)[':userId']['$delete']>
      >,
      'mutationFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<(typeof client.users)[':userId']['$delete']>) =>
      parseResponse(client.users[':userId'].$delete(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /orders
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetOrdersQueryKey() {
  return ['orders', '/orders'] as const
}

/**
 * Returns Vue Query query options for GET /orders
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetOrdersQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetOrdersQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.orders.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /orders
 *
 * List all orders
 */
export function useGetOrders(options?: {
  query?: Partial<
    Omit<
      UseQueryOptions<
        Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.orders.$get>>>>>,
        Error
      >,
      'queryKey' | 'queryFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetOrdersQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query mutation key for POST /orders
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getPostOrdersMutationKey() {
  return ['POST', '/orders'] as const
}

/**
 * Returns Vue Query mutation options for POST /orders
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostOrdersMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostOrdersMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.orders.$post>) =>
    parseResponse(client.orders.$post(args, clientOptions)),
})

/**
 * POST /orders
 *
 * Create a new order
 */
export function usePostOrders(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.orders.$post>>>>>,
        Error,
        InferRequestType<typeof client.orders.$post>
      >,
      'mutationFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.orders.$post>) =>
      parseResponse(client.orders.$post(args, clientOptions)),
  })
}
