import type { ClientRequestOptions, InferRequestType, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import type { SWRMutationConfiguration } from 'swr/mutation'
import useSWRMutation from 'swr/mutation'
import { client } from '../clients/05-request-bodies'

/**
 * POST /users
 */
export function usePostUsers(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<typeof client.users.$post>,
    Error,
    string,
    InferRequestType<typeof client.users.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /users',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.users.$post> }) =>
      parseResponse(client.users.$post(arg, clientOptions)),
    mutationOptions,
  )
}

/**
 * PUT /users/{userId}
 */
export function usePutUsersUserId(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.users)[':userId']['$put']>,
    Error,
    string,
    InferRequestType<(typeof client.users)[':userId']['$put']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'PUT /users/:userId',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.users)[':userId']['$put']> },
    ) => parseResponse(client.users[':userId'].$put(arg, clientOptions)),
    mutationOptions,
  )
}

/**
 * PATCH /users/{userId}
 */
export function usePatchUsersUserId(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.users)[':userId']['$patch']>,
    Error,
    string,
    InferRequestType<(typeof client.users)[':userId']['$patch']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'PATCH /users/:userId',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.users)[':userId']['$patch']> },
    ) => parseResponse(client.users[':userId'].$patch(arg, clientOptions)),
    mutationOptions,
  )
}

/**
 * POST /users/{userId}/avatar
 */
export function usePostUsersUserIdAvatar(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.users)[':userId']['avatar']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.users)[':userId']['avatar']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /users/:userId/avatar',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.users)[':userId']['avatar']['$post']> },
    ) => parseResponse(client.users[':userId'].avatar.$post(arg, clientOptions)),
    mutationOptions,
  )
}

/**
 * POST /bulk/users
 */
export function usePostBulkUsers(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<typeof client.bulk.users.$post>,
    Error,
    string,
    InferRequestType<typeof client.bulk.users.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /bulk/users',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.bulk.users.$post> }) =>
      parseResponse(client.bulk.users.$post(arg, clientOptions)),
    mutationOptions,
  )
}
