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

/** Key prefix for /items */
export function getItemsKey() {
  return ['items'] as const
}

/** Key prefix for /users */
export function getUsersKey() {
  return ['users'] as const
}

/** GET /users query key */
export function getUsersQueryKey() {
  return ['users', '/users'] as const
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
 * GET /users query options
 */
export function getUsersQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getUsersQueryKey(),
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
export function useUsers(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getUsers>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({ ...getUsersQueryOptions(clientOptions), ...queryOptions })
}

/** GET /users infinite query key */
export function getUsersInfiniteQueryKey() {
  return ['users', '/users', 'infinite'] as const
}

/**
 * GET /users infinite query options
 */
export function getUsersInfiniteQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getUsersInfiniteQueryKey(),
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
export function useInfiniteUsers(options: {
  query: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getUsers>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({ ...getUsersInfiniteQueryOptions(clientOptions), ...queryOptions })
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

/** POST /users */
export function getPostUsersMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['users', '/users'] as const,
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

/** GET /users/{id} query key */
export function getUsersIdQueryKey(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.users)[':id']['$get']>>,
) {
  return ['users', '/users/:id', args] as const
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
 * GET /users/{id} query options
 */
export function getUsersIdQueryOptions(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.users)[':id']['$get']>>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getUsersIdQueryKey(args),
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
export function useUsersId(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.users)[':id']['$get']>>,
  options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getUsersId>>, Error>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({ ...getUsersIdQueryOptions(args, clientOptions), ...queryOptions })
}

/** GET /users/{id} infinite query key */
export function getUsersIdInfiniteQueryKey(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.users)[':id']['$get']>>,
) {
  return ['users', '/users/:id', args, 'infinite'] as const
}

/**
 * GET /users/{id} infinite query options
 */
export function getUsersIdInfiniteQueryOptions(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.users)[':id']['$get']>>,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getUsersIdInfiniteQueryKey(args),
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
export function useInfiniteUsersId(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.users)[':id']['$get']>>,
  options: {
    query: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getUsersId>>, Error>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({
    ...getUsersIdInfiniteQueryOptions(args, clientOptions),
    ...queryOptions,
  })
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

/** PUT /users/{id} */
export function getPutUsersIdMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['users', '/users/:id'] as const,
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

/** GET /items query key */
export function getItemsQueryKey() {
  return ['items', '/items'] as const
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
 * GET /items query options
 */
export function getItemsQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getItemsQueryKey(),
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
export function useItems(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getItems>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({ ...getItemsQueryOptions(clientOptions), ...queryOptions })
}

/** GET /items infinite query key */
export function getItemsInfiniteQueryKey() {
  return ['items', '/items', 'infinite'] as const
}

/**
 * GET /items infinite query options
 */
export function getItemsInfiniteQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getItemsInfiniteQueryKey(),
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
export function useInfiniteItems(options: {
  query: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getItems>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({ ...getItemsInfiniteQueryOptions(clientOptions), ...queryOptions })
}
