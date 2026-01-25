import { createQuery, createMutation } from '@tanstack/svelte-query'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/02-simple-schemas'

/**
 * GET /users
 */
export function createGetUsers(options?: {
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
  return createQuery({
    queryKey: getGetUsersQueryKey(),
    queryFn: async () => parseResponse(client.users.$get(undefined, clientOptions)),
    ...queryOptions,
  })
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
export function createPostUsers(options?: {
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
  return createMutation({
    mutationFn: async (args: InferRequestType<typeof client.users.$post>) =>
      parseResponse(client.users.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /users/{userId}
 */
export function createGetUsersUserId(
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
  return createQuery({
    queryKey: getGetUsersUserIdQueryKey(args),
    queryFn: async () => parseResponse(client.users[':userId'].$get(args, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /users/{userId}
 */
export function getGetUsersUserIdQueryKey(
  args: InferRequestType<(typeof client.users)[':userId']['$get']>,
) {
  return ['/users/:userId', args] as const
}
