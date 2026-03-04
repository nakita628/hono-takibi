import {
  useQuery,
  useSuspenseQuery,
  useInfiniteQuery,
  useSuspenseInfiniteQuery,
  useMutation,
  queryOptions,
  mutationOptions,
} from '@tanstack/react-query'
import type {
  UseQueryOptions,
  QueryFunctionContext,
  UseSuspenseQueryOptions,
  UseInfiniteQueryOptions,
  UseSuspenseInfiniteQueryOptions,
  UseMutationOptions,
} from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from './client'

/**
 * Generates TanStack Query cache key for GET /users
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetUsersQueryKey(args: InferRequestType<typeof client.users.$get>) {
  return ['users', 'GET', '/users', args] as const
}

/**
 * GET /users
 */
export async function getUsers(
  args: InferRequestType<typeof client.users.$get>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.users.$get(args, options))
}

/**
 * Returns TanStack Query query options for GET /users
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetUsersQueryOptions(
  args: InferRequestType<typeof client.users.$get>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getGetUsersQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getUsers(args, { ...options, init: { ...options?.init, signal } })
    },
  })
}

/**
 * GET /users
 */
export function useGetUsers(
  args: InferRequestType<typeof client.users.$get>,
  options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getUsers>>, Error>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({ ...getGetUsersQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * GET /users
 */
export function useSuspenseGetUsers(
  args: InferRequestType<typeof client.users.$get>,
  options?: {
    query?: UseSuspenseQueryOptions<Awaited<ReturnType<typeof getUsers>>, Error>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({ ...getGetUsersQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query infinite query cache key for GET /users
 * Returns structured key ['prefix', 'method', 'path', args, 'infinite'] for filtering
 */
export function getGetUsersInfiniteQueryKey(args: InferRequestType<typeof client.users.$get>) {
  return ['users', 'GET', '/users', args, 'infinite'] as const
}

/**
 * Returns TanStack Query infinite query options for GET /users
 *
 * Use with prefetchInfiniteQuery, ensureInfiniteQueryData, or useInfiniteQuery.
 * Requires initialPageParam and getNextPageParam to be provided separately.
 */
export function getGetUsersInfiniteQueryOptions(
  args: InferRequestType<typeof client.users.$get>,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getGetUsersInfiniteQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getUsers(args, { ...options, init: { ...options?.init, signal } })
    },
  }
}

/**
 * GET /users
 */
export function useInfiniteGetUsers(
  args: InferRequestType<typeof client.users.$get>,
  options: {
    query: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getUsers>>, Error>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({
    ...getGetUsersInfiniteQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * GET /users
 */
export function useSuspenseInfiniteGetUsers(
  args: InferRequestType<typeof client.users.$get>,
  options: {
    query: UseSuspenseInfiniteQueryOptions<Awaited<ReturnType<typeof getUsers>>, Error>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options
  return useSuspenseInfiniteQuery({
    ...getGetUsersInfiniteQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query mutation key for POST /users
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostUsersMutationKey() {
  return ['users', 'POST', '/users'] as const
}

/**
 * POST /users
 */
export async function postUsers(
  args: InferRequestType<typeof client.users.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.users.$post(args, options))
}

/**
 * Returns TanStack Query mutation options for POST /users
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getPostUsersMutationOptions(options?: ClientRequestOptions) {
  return mutationOptions({
    mutationKey: getPostUsersMutationKey(),
    async mutationFn(args: InferRequestType<typeof client.users.$post>) {
      return postUsers(args, options)
    },
  })
}

/**
 * POST /users
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
 * Generates TanStack Query cache key for GET /users/{id}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetUsersIdQueryKey(
  args: InferRequestType<(typeof client.users)[':id']['$get']>,
) {
  return ['users', 'GET', '/users/:id', args] as const
}

/**
 * GET /users/{id}
 */
export async function getUsersId(
  args: InferRequestType<(typeof client.users)[':id']['$get']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.users[':id'].$get(args, options))
}

/**
 * Returns TanStack Query query options for GET /users/{id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetUsersIdQueryOptions(
  args: InferRequestType<(typeof client.users)[':id']['$get']>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getGetUsersIdQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getUsersId(args, { ...options, init: { ...options?.init, signal } })
    },
  })
}

/**
 * GET /users/{id}
 */
export function useGetUsersId(
  args: InferRequestType<(typeof client.users)[':id']['$get']>,
  options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getUsersId>>, Error>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({ ...getGetUsersIdQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * GET /users/{id}
 */
export function useSuspenseGetUsersId(
  args: InferRequestType<(typeof client.users)[':id']['$get']>,
  options?: {
    query?: UseSuspenseQueryOptions<Awaited<ReturnType<typeof getUsersId>>, Error>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({ ...getGetUsersIdQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query infinite query cache key for GET /users/{id}
 * Returns structured key ['prefix', 'method', 'path', args, 'infinite'] for filtering
 */
export function getGetUsersIdInfiniteQueryKey(
  args: InferRequestType<(typeof client.users)[':id']['$get']>,
) {
  return ['users', 'GET', '/users/:id', args, 'infinite'] as const
}

/**
 * Returns TanStack Query infinite query options for GET /users/{id}
 *
 * Use with prefetchInfiniteQuery, ensureInfiniteQueryData, or useInfiniteQuery.
 * Requires initialPageParam and getNextPageParam to be provided separately.
 */
export function getGetUsersIdInfiniteQueryOptions(
  args: InferRequestType<(typeof client.users)[':id']['$get']>,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getGetUsersIdInfiniteQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getUsersId(args, { ...options, init: { ...options?.init, signal } })
    },
  }
}

/**
 * GET /users/{id}
 */
export function useInfiniteGetUsersId(
  args: InferRequestType<(typeof client.users)[':id']['$get']>,
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
 * GET /users/{id}
 */
export function useSuspenseInfiniteGetUsersId(
  args: InferRequestType<(typeof client.users)[':id']['$get']>,
  options: {
    query: UseSuspenseInfiniteQueryOptions<Awaited<ReturnType<typeof getUsersId>>, Error>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options
  return useSuspenseInfiniteQuery({
    ...getGetUsersIdInfiniteQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}
