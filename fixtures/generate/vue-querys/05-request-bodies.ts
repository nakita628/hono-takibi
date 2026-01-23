import { useMutation } from '@tanstack/vue-query'
import type { ClientRequestOptions, InferRequestType, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/05-request-bodies'

/**
 * POST /users
 */
export function usePostUsers(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<typeof client.users.$post> | undefined,
    Error,
    InferRequestType<typeof client.users.$post>
  >({ mutationFn: async (args) => parseResponse(client.users.$post(args, clientOptions)) })
}

/**
 * PUT /users/{userId}
 */
export function usePutUsersUserId(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.users)[':userId']['$put']> | undefined,
    Error,
    InferRequestType<(typeof client.users)[':userId']['$put']>
  >({
    mutationFn: async (args) => parseResponse(client.users[':userId'].$put(args, clientOptions)),
  })
}

/**
 * PATCH /users/{userId}
 */
export function usePatchUsersUserId(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.users)[':userId']['$patch']> | undefined,
    Error,
    InferRequestType<(typeof client.users)[':userId']['$patch']>
  >({
    mutationFn: async (args) => parseResponse(client.users[':userId'].$patch(args, clientOptions)),
  })
}

/**
 * POST /users/{userId}/avatar
 */
export function usePostUsersUserIdAvatar(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.users)[':userId']['avatar']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client.users)[':userId']['avatar']['$post']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.users[':userId'].avatar.$post(args, clientOptions)),
  })
}

/**
 * POST /bulk/users
 */
export function usePostBulkUsers(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<typeof client.bulk.users.$post> | undefined,
    Error,
    InferRequestType<typeof client.bulk.users.$post>
  >({ mutationFn: async (args) => parseResponse(client.bulk.users.$post(args, clientOptions)) })
}
