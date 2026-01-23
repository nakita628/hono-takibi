import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/05-request-bodies'

/**
 * POST /users
 */
export function usePostUsers(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.users.$post>,
    Error,
    string,
    InferRequestType<typeof client.users.$post>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.users.$post>,
    Error,
    string,
    InferRequestType<typeof client.users.$post>
  >(
    'POST /users',
    async (_, { arg }) => parseResponse(client.users.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * PUT /users/{userId}
 */
export function usePutUsersUserId(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.users)[':userId']['$put']>,
    Error,
    string,
    InferRequestType<(typeof client.users)[':userId']['$put']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.users)[':userId']['$put']>,
    Error,
    string,
    InferRequestType<(typeof client.users)[':userId']['$put']>
  >(
    'PUT /users/:userId',
    async (_, { arg }) => parseResponse(client.users[':userId'].$put(arg, options?.client)),
    options?.swr,
  )
}

/**
 * PATCH /users/{userId}
 */
export function usePatchUsersUserId(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.users)[':userId']['$patch']>,
    Error,
    string,
    InferRequestType<(typeof client.users)[':userId']['$patch']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.users)[':userId']['$patch']>,
    Error,
    string,
    InferRequestType<(typeof client.users)[':userId']['$patch']>
  >(
    'PATCH /users/:userId',
    async (_, { arg }) => parseResponse(client.users[':userId'].$patch(arg, options?.client)),
    options?.swr,
  )
}

/**
 * POST /users/{userId}/avatar
 */
export function usePostUsersUserIdAvatar(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.users)[':userId']['avatar']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.users)[':userId']['avatar']['$post']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.users)[':userId']['avatar']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.users)[':userId']['avatar']['$post']>
  >(
    'POST /users/:userId/avatar',
    async (_, { arg }) => parseResponse(client.users[':userId'].avatar.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * POST /bulk/users
 */
export function usePostBulkUsers(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.bulk.users.$post>,
    Error,
    string,
    InferRequestType<typeof client.bulk.users.$post>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.bulk.users.$post>,
    Error,
    string,
    InferRequestType<typeof client.bulk.users.$post>
  >(
    'POST /bulk/users',
    async (_, { arg }) => parseResponse(client.bulk.users.$post(arg, options?.client)),
    options?.swr,
  )
}
