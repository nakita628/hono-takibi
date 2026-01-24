import { useMutation } from '@tanstack/react-query'
import type { QueryClient, UseMutationOptions } from '@tanstack/react-query'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/05-request-bodies'

/**
 * POST /users
 */
export function usePostUsers(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return useMutation(
    {
      mutationFn: async (args: InferRequestType<typeof client.users.$post>) =>
        parseResponse(client.users.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * PUT /users/{userId}
 */
export function usePutUsersUserId(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return useMutation(
    {
      mutationFn: async (args: InferRequestType<(typeof client.users)[':userId']['$put']>) =>
        parseResponse(client.users[':userId'].$put(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * PATCH /users/{userId}
 */
export function usePatchUsersUserId(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return useMutation(
    {
      mutationFn: async (args: InferRequestType<(typeof client.users)[':userId']['$patch']>) =>
        parseResponse(client.users[':userId'].$patch(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * POST /users/{userId}/avatar
 */
export function usePostUsersUserIdAvatar(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return useMutation(
    {
      mutationFn: async (
        args: InferRequestType<(typeof client.users)[':userId']['avatar']['$post']>,
      ) => parseResponse(client.users[':userId'].avatar.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * POST /bulk/users
 */
export function usePostBulkUsers(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return useMutation(
    {
      mutationFn: async (args: InferRequestType<typeof client.bulk.users.$post>) =>
        parseResponse(client.bulk.users.$post(args, options?.client)),
    },
    queryClient,
  )
}
