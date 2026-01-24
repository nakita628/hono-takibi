import useSWRMutation from 'swr/mutation'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/05-request-bodies'

/**
 * POST /users
 */
export function usePostUsers(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation(
    'POST /users',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.users.$post> }) =>
      parseResponse(client.users.$post(arg, options?.client)),
  )
}

/**
 * PUT /users/{userId}
 */
export function usePutUsersUserId(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation(
    'PUT /users/:userId',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.users)[':userId']['$put']> },
    ) => parseResponse(client.users[':userId'].$put(arg, options?.client)),
  )
}

/**
 * PATCH /users/{userId}
 */
export function usePatchUsersUserId(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation(
    'PATCH /users/:userId',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.users)[':userId']['$patch']> },
    ) => parseResponse(client.users[':userId'].$patch(arg, options?.client)),
  )
}

/**
 * POST /users/{userId}/avatar
 */
export function usePostUsersUserIdAvatar(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation(
    'POST /users/:userId/avatar',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.users)[':userId']['avatar']['$post']> },
    ) => parseResponse(client.users[':userId'].avatar.$post(arg, options?.client)),
  )
}

/**
 * POST /bulk/users
 */
export function usePostBulkUsers(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation(
    'POST /bulk/users',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.bulk.users.$post> }) =>
      parseResponse(client.bulk.users.$post(arg, options?.client)),
  )
}
