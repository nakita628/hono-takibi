import type { QueryClient, UseMutationOptions } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/05-request-bodies'

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
 * PUT /users/{userId}
 */
export function usePutUsersUserId(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.users)[':userId']['$put']> | undefined,
      Error,
      InferRequestType<(typeof client.users)[':userId']['$put']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.users)[':userId']['$put']> | undefined,
    Error,
    InferRequestType<(typeof client.users)[':userId']['$put']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.users[':userId'].$put(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * PATCH /users/{userId}
 */
export function usePatchUsersUserId(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.users)[':userId']['$patch']> | undefined,
      Error,
      InferRequestType<(typeof client.users)[':userId']['$patch']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.users)[':userId']['$patch']> | undefined,
    Error,
    InferRequestType<(typeof client.users)[':userId']['$patch']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.users[':userId'].$patch(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * POST /users/{userId}/avatar
 */
export function usePostUsersUserIdAvatar(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.users)[':userId']['avatar']['$post']> | undefined,
      Error,
      InferRequestType<(typeof client.users)[':userId']['avatar']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.users)[':userId']['avatar']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client.users)[':userId']['avatar']['$post']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.users[':userId'].avatar.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * POST /bulk/users
 */
export function usePostBulkUsers(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<typeof client.bulk.users.$post> | undefined,
      Error,
      InferRequestType<typeof client.bulk.users.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<typeof client.bulk.users.$post> | undefined,
    Error,
    InferRequestType<typeof client.bulk.users.$post>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) => parseResponse(client.bulk.users.$post(args, options?.client)),
    },
    queryClient,
  )
}
