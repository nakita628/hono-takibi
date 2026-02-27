import { useQuery, useMutation, queryOptions } from '@tanstack/vue-query'
import type { UseQueryOptions, QueryFunctionContext, UseMutationOptions } from '@tanstack/vue-query'
import { unref } from 'vue'
import type { MaybeRef } from 'vue'
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
export function getGetUsersQueryOptions(clientOptions?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getGetUsersQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getUsers({ ...clientOptions, init: { ...clientOptions?.init, signal } })
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
  client?: ClientRequestOptions
}) {
  const { query: queryOpts, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetUsersQueryOptions(clientOptions), ...queryOpts })
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
export function getPostUsersMutationOptions(clientOptions?: ClientRequestOptions) {
  return {
    mutationKey: getPostUsersMutationKey(),
    async mutationFn(args: Parameters<typeof postUsers>[0]) {
      return postUsers(args, clientOptions)
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
    Parameters<typeof postUsers>[0]
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOpts, client: clientOptions } = options ?? {}
  return useMutation({ ...getPostUsersMutationOptions(clientOptions), ...mutationOpts })
}

/**
 * Generates Vue Query cache key for GET /users/{id}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetUsersIdQueryKey(args: MaybeRef<Parameters<typeof getUsersId>[0]>) {
  return ['users', 'GET', '/users/:id', unref(args)] as const
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
  args: Parameters<typeof getUsersId>[0],
  clientOptions?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getGetUsersIdQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getUsersId(args, { ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

/**
 * GET /users/{id}
 *
 * Get user by ID
 */
export function useGetUsersId(
  args: Parameters<typeof getUsersId>[0],
  options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getUsersId>>, Error>
    client?: ClientRequestOptions
  },
) {
  const { query: queryOpts, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetUsersIdQueryOptions(args, clientOptions), ...queryOpts })
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
export function getPutUsersIdMutationOptions(clientOptions?: ClientRequestOptions) {
  return {
    mutationKey: getPutUsersIdMutationKey(),
    async mutationFn(args: Parameters<typeof putUsersId>[0]) {
      return putUsersId(args, clientOptions)
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
    Parameters<typeof putUsersId>[0]
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOpts, client: clientOptions } = options ?? {}
  return useMutation({ ...getPutUsersIdMutationOptions(clientOptions), ...mutationOpts })
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
export function getGetItemsQueryOptions(clientOptions?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getGetItemsQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getItems({ ...clientOptions, init: { ...clientOptions?.init, signal } })
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
  client?: ClientRequestOptions
}) {
  const { query: queryOpts, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetItemsQueryOptions(clientOptions), ...queryOpts })
}
