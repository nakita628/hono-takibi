import { createMutation } from '@tanstack/svelte-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/05-request-bodies'

/**
 * POST /users
 */
export function createPostUsers(options?: {
  mutation?: {
    onSuccess?: (
      data: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$post>>>>
      >,
      variables: InferRequestType<typeof client.users.$post>,
    ) => void
    onError?: (error: Error, variables: InferRequestType<typeof client.users.$post>) => void
    onSettled?: (
      data:
        | Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$post>>>>>
        | undefined,
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
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.users.$post>) =>
      parseResponse(client.users.$post(args, clientOptions)),
  }))
}

/**
 * PUT /users/{userId}
 */
export function createPutUsersUserId(options?: {
  mutation?: {
    onSuccess?: (
      data: Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':userId']['$put']>>>
        >
      >,
      variables: InferRequestType<(typeof client.users)[':userId']['$put']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.users)[':userId']['$put']>,
    ) => void
    onSettled?: (
      data:
        | Awaited<
            ReturnType<
              typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':userId']['$put']>>>
            >
          >
        | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.users)[':userId']['$put']>,
    ) => void
    onMutate?: (variables: InferRequestType<(typeof client.users)[':userId']['$put']>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<(typeof client.users)[':userId']['$put']>) =>
      parseResponse(client.users[':userId'].$put(args, clientOptions)),
  }))
}

/**
 * PATCH /users/{userId}
 */
export function createPatchUsersUserId(options?: {
  mutation?: {
    onSuccess?: (
      data: Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':userId']['$patch']>>>
        >
      >,
      variables: InferRequestType<(typeof client.users)[':userId']['$patch']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.users)[':userId']['$patch']>,
    ) => void
    onSettled?: (
      data:
        | Awaited<
            ReturnType<
              typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':userId']['$patch']>>>
            >
          >
        | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.users)[':userId']['$patch']>,
    ) => void
    onMutate?: (variables: InferRequestType<(typeof client.users)[':userId']['$patch']>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<(typeof client.users)[':userId']['$patch']>) =>
      parseResponse(client.users[':userId'].$patch(args, clientOptions)),
  }))
}

/**
 * POST /users/{userId}/avatar
 */
export function createPostUsersUserIdAvatar(options?: {
  mutation?: {
    onSuccess?: (
      data: Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.users)[':userId']['avatar']['$post']>>
          >
        >
      >,
      variables: InferRequestType<(typeof client.users)[':userId']['avatar']['$post']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.users)[':userId']['avatar']['$post']>,
    ) => void
    onSettled?: (
      data:
        | Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client.users)[':userId']['avatar']['$post']>>
              >
            >
          >
        | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.users)[':userId']['avatar']['$post']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.users)[':userId']['avatar']['$post']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.users)[':userId']['avatar']['$post']>,
    ) => parseResponse(client.users[':userId'].avatar.$post(args, clientOptions)),
  }))
}

/**
 * POST /bulk/users
 */
export function createPostBulkUsers(options?: {
  mutation?: {
    onSuccess?: (
      data: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.bulk.users.$post>>>>
      >,
      variables: InferRequestType<typeof client.bulk.users.$post>,
    ) => void
    onError?: (error: Error, variables: InferRequestType<typeof client.bulk.users.$post>) => void
    onSettled?: (
      data:
        | Awaited<
            ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.bulk.users.$post>>>>
          >
        | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.bulk.users.$post>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.bulk.users.$post>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.bulk.users.$post>) =>
      parseResponse(client.bulk.users.$post(args, clientOptions)),
  }))
}
