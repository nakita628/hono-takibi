import { useQuery, useInfiniteQuery, useMutation, queryOptions } from '@tanstack/vue-query'
import type {
  UseQueryOptions,
  QueryFunctionContext,
  UseInfiniteQueryOptions,
  UseMutationOptions,
} from '@tanstack/vue-query'
import { toValue } from 'vue'
import type { MaybeRefOrGetter } from 'vue'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from './client'

/**
 * Generates Vue Query cache key for GET /users
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetUsersQueryKey() {
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
 * Returns Vue Query query options for GET /users
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetUsersQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getGetUsersQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getUsers({ ...options, init: { ...options?.init, signal } })
    },
  })
}

/**
 * GET /users
 *
 * List users
 */
export function useGetUsers(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getUsers>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({ ...getGetUsersQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query infinite query cache key for GET /users
 * Returns structured key ['prefix', 'method', 'path', 'infinite'] for filtering
 */
export function getGetUsersInfiniteQueryKey() {
  return ['users', 'GET', '/users', 'infinite'] as const
}

/**
 * Returns Vue Query infinite query options for GET /users
 *
 * Use with prefetchInfiniteQuery, ensureInfiniteQueryData, or useInfiniteQuery.
 * Requires initialPageParam and getNextPageParam to be provided separately.
 */
export function getGetUsersInfiniteQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getGetUsersInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getUsers({ ...options, init: { ...options?.init, signal } })
    },
  }
}

/**
 * GET /users
 *
 * List users
 */
export function useInfiniteGetUsers(options: {
  query: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getUsers>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({ ...getGetUsersInfiniteQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query mutation key for POST /users
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
 * Returns Vue Query mutation options for POST /users
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getPostUsersMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: getPostUsersMutationKey(),
    async mutationFn(args: InferRequestType<typeof client.users.$post>) {
      return postUsers(args, options)
    },
  }
}

/**
 * POST /users
 *
 * Create user
 */
export function usePostUsers(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postUsers>>,
    Error,
    InferRequestType<typeof client.users.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({ ...getPostUsersMutationOptions(clientOptions), ...mutationOptions })
}

/**
 * Generates Vue Query cache key for GET /users/{id}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetUsersIdQueryKey(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.users)[':id']['$get']>>,
) {
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
 * Returns Vue Query query options for GET /users/{id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetUsersIdQueryOptions(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.users)[':id']['$get']>>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getGetUsersIdQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getUsersId(toValue(args), { ...options, init: { ...options?.init, signal } })
    },
  })
}

/**
 * GET /users/{id}
 *
 * Get user by ID
 */
export function useGetUsersId(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.users)[':id']['$get']>>,
  options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getUsersId>>, Error>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({ ...getGetUsersIdQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query infinite query cache key for GET /users/{id}
 * Returns structured key ['prefix', 'method', 'path', args, 'infinite'] for filtering
 */
export function getGetUsersIdInfiniteQueryKey(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.users)[':id']['$get']>>,
) {
  return ['users', 'GET', '/users/:id', args, 'infinite'] as const
}

/**
 * Returns Vue Query infinite query options for GET /users/{id}
 *
 * Use with prefetchInfiniteQuery, ensureInfiniteQueryData, or useInfiniteQuery.
 * Requires initialPageParam and getNextPageParam to be provided separately.
 */
export function getGetUsersIdInfiniteQueryOptions(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.users)[':id']['$get']>>,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getGetUsersIdInfiniteQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getUsersId(toValue(args), { ...options, init: { ...options?.init, signal } })
    },
  }
}

/**
 * GET /users/{id}
 *
 * Get user by ID
 */
export function useInfiniteGetUsersId(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.users)[':id']['$get']>>,
  options: {
    query: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getUsersId>>, Error>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({
    ...getGetUsersIdInfiniteQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query mutation key for PUT /users/{id}
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
 * Returns Vue Query mutation options for PUT /users/{id}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getPutUsersIdMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: getPutUsersIdMutationKey(),
    async mutationFn(args: InferRequestType<(typeof client.users)[':id']['$put']>) {
      return putUsersId(args, options)
    },
  }
}

/**
 * PUT /users/{id}
 *
 * Update user
 */
export function usePutUsersId(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof putUsersId>>,
    Error,
    InferRequestType<(typeof client.users)[':id']['$put']>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({ ...getPutUsersIdMutationOptions(clientOptions), ...mutationOptions })
}

/**
 * Generates Vue Query cache key for GET /items
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetItemsQueryKey() {
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
 * Returns Vue Query query options for GET /items
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetItemsQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getGetItemsQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getItems({ ...options, init: { ...options?.init, signal } })
    },
  })
}

/**
 * GET /items
 *
 * List items (uses $ref response alias)
 */
export function useGetItems(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getItems>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({ ...getGetItemsQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query infinite query cache key for GET /items
 * Returns structured key ['prefix', 'method', 'path', 'infinite'] for filtering
 */
export function getGetItemsInfiniteQueryKey() {
  return ['items', 'GET', '/items', 'infinite'] as const
}

/**
 * Returns Vue Query infinite query options for GET /items
 *
 * Use with prefetchInfiniteQuery, ensureInfiniteQueryData, or useInfiniteQuery.
 * Requires initialPageParam and getNextPageParam to be provided separately.
 */
export function getGetItemsInfiniteQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getGetItemsInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getItems({ ...options, init: { ...options?.init, signal } })
    },
  }
}

/**
 * GET /items
 *
 * List items (uses $ref response alias)
 */
export function useInfiniteGetItems(options: {
  query: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getItems>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({ ...getGetItemsInfiniteQueryOptions(clientOptions), ...queryOptions })
}
