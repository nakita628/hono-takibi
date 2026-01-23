import { useQuery, useMutation } from '@tanstack/react-query'
import type { QueryClient, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/02-simple-schemas'

/**
 * GET /users
 */
export function useGetUsers(
  options?: {
    query?: UseQueryOptions<
      InferResponseType<typeof client.users.$get>,
      Error,
      InferResponseType<typeof client.users.$get>,
      readonly ['/users']
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetUsersQueryKey()
  const query = useQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.users.$get(undefined, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /users
 */
export function getGetUsersQueryKey() {
  return ['/users'] as const
}

/**
 * POST /users
 */
export function usePostUsers(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<typeof client.users.$post> | undefined,
      Error,
      InferRequestType<typeof client.users.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<typeof client.users.$post> | undefined,
    Error,
    InferRequestType<typeof client.users.$post>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) => parseResponse(client.users.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /users/{userId}
 */
export function useGetUsersUserId(
  args: InferRequestType<(typeof client.users)[':userId']['$get']>,
  options?: {
    query?: UseQueryOptions<
      InferResponseType<(typeof client.users)[':userId']['$get']>,
      Error,
      InferResponseType<(typeof client.users)[':userId']['$get']>,
      readonly ['/users/:userId', InferRequestType<(typeof client.users)[':userId']['$get']>]
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetUsersUserIdQueryKey(args)
  const query = useQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.users[':userId'].$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /users/{userId}
 */
export function getGetUsersUserIdQueryKey(
  args: InferRequestType<(typeof client.users)[':userId']['$get']>,
) {
  return ['/users/:userId', args] as const
}
