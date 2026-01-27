import type { UseMutationOptions } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/05-request-bodies'

/**
 * Generates TanStack Query mutation key for POST /users
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostUsersMutationKey() {
  return ['users', 'POST', '/users'] as const
}

/**
 * Returns TanStack Query mutation options for POST /users
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostUsersMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostUsersMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.users.$post>) =>
    parseResponse(client.users.$post(args, clientOptions)),
})

/**
 * POST /users
 */
export function usePostUsers(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$post>>>>>,
    Error,
    InferRequestType<typeof client.users.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } = getPostUsersMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates TanStack Query mutation key for PUT /users/{userId}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPutUsersUserIdMutationKey() {
  return ['users', 'PUT', '/users/:userId'] as const
}

/**
 * Returns TanStack Query mutation options for PUT /users/{userId}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPutUsersUserIdMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPutUsersUserIdMutationKey(),
  mutationFn: async (args: InferRequestType<(typeof client.users)[':userId']['$put']>) =>
    parseResponse(client.users[':userId'].$put(args, clientOptions)),
})

/**
 * PUT /users/{userId}
 */
export function usePutUsersUserId(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':userId']['$put']>>>
      >
    >,
    Error,
    InferRequestType<(typeof client.users)[':userId']['$put']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPutUsersUserIdMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates TanStack Query mutation key for PATCH /users/{userId}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPatchUsersUserIdMutationKey() {
  return ['users', 'PATCH', '/users/:userId'] as const
}

/**
 * Returns TanStack Query mutation options for PATCH /users/{userId}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPatchUsersUserIdMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPatchUsersUserIdMutationKey(),
  mutationFn: async (args: InferRequestType<(typeof client.users)[':userId']['$patch']>) =>
    parseResponse(client.users[':userId'].$patch(args, clientOptions)),
})

/**
 * PATCH /users/{userId}
 */
export function usePatchUsersUserId(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':userId']['$patch']>>>
      >
    >,
    Error,
    InferRequestType<(typeof client.users)[':userId']['$patch']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPatchUsersUserIdMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates TanStack Query mutation key for POST /users/{userId}/avatar
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostUsersUserIdAvatarMutationKey() {
  return ['users', 'POST', '/users/:userId/avatar'] as const
}

/**
 * Returns TanStack Query mutation options for POST /users/{userId}/avatar
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostUsersUserIdAvatarMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostUsersUserIdAvatarMutationKey(),
  mutationFn: async (args: InferRequestType<(typeof client.users)[':userId']['avatar']['$post']>) =>
    parseResponse(client.users[':userId'].avatar.$post(args, clientOptions)),
})

/**
 * POST /users/{userId}/avatar
 */
export function usePostUsersUserIdAvatar(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.users)[':userId']['avatar']['$post']>>
        >
      >
    >,
    Error,
    InferRequestType<(typeof client.users)[':userId']['avatar']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPostUsersUserIdAvatarMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates TanStack Query mutation key for POST /bulk/users
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostBulkUsersMutationKey() {
  return ['bulk', 'POST', '/bulk/users'] as const
}

/**
 * Returns TanStack Query mutation options for POST /bulk/users
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostBulkUsersMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostBulkUsersMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.bulk.users.$post>) =>
    parseResponse(client.bulk.users.$post(args, clientOptions)),
})

/**
 * POST /bulk/users
 */
export function usePostBulkUsers(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.bulk.users.$post>>>>>,
    Error,
    InferRequestType<typeof client.bulk.users.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } = getPostBulkUsersMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}
