import { createMutation } from '@tanstack/solid-query'
import type { CreateMutationOptions } from '@tanstack/solid-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../../client'

export function getPutUsersUserIdMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['users', '/users/:userId', 'PUT'] as const,
    async mutationFn(args: InferRequestType<(typeof client.users)[':userId']['$put']>) {
      return parseResponse(client.users[':userId'].$put(args, options))
    },
  }
}

export function createPutUsersUserId<TError = unknown>(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':userId']['$put']>>>
        >
      >,
      TError,
      InferRequestType<(typeof client.users)[':userId']['$put']>
    >
    options?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const { mutation, options: clientOptions } = options?.() ?? {}
    return { ...mutation, ...getPutUsersUserIdMutationOptions(clientOptions) }
  })
}
