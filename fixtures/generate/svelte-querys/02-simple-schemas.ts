import { createQuery, createMutation } from '@tanstack/svelte-query'
import type { QueryClient, CreateQueryOptions, CreateMutationOptions } from '@tanstack/svelte-query'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/02-simple-schemas'

/**
 * GET /users
 */
export function createGetUsers(
  options?: {
    query?: CreateQueryOptions<InferResponseType<typeof client.users.$get>, Error>
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetUsersQueryKey()
  const query = createQuery(
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
 * Generates Svelte Query cache key for GET /users
 */
export function getGetUsersQueryKey() {
  return ['/users'] as const
}

/**
 * POST /users
 */
export function createPostUsers(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<typeof client.users.$post> | undefined,
      Error,
      InferRequestType<typeof client.users.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
export function createGetUsersUserId(
  args: InferRequestType<(typeof client.users)[':userId']['$get']>,
  options?: {
    query?: CreateQueryOptions<InferResponseType<(typeof client.users)[':userId']['$get']>, Error>
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetUsersUserIdQueryKey(args)
  const query = createQuery(
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
 * Generates Svelte Query cache key for GET /users/{userId}
 */
export function getGetUsersUserIdQueryKey(
  args?: InferRequestType<(typeof client.users)[':userId']['$get']>,
) {
  return ['/users/:userId', ...(args ? [args] : [])] as const
}
