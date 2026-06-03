import { injectMutation } from '@tanstack/angular-query-experimental'
import type { CreateMutationOptions } from '@tanstack/angular-query-experimental'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../../client'

export function getDeleteUsersUserIdMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['users', '/users/:userId', 'DELETE'] as const,
    async mutationFn(args: InferRequestType<(typeof client.users)[':userId']['$delete']>) {
      return parseResponse(client.users[':userId'].$delete(args, options))
    },
  }
}

export function injectDeleteUsersUserId<TError = unknown>(
  options?: () => {
    mutation?: CreateMutationOptions<
      | Awaited<
          ReturnType<
            typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':userId']['$delete']>>>
          >
        >
      | undefined,
      TError,
      InferRequestType<(typeof client.users)[':userId']['$delete']>
    >
    options?: ClientRequestOptions
  },
) {
  return injectMutation(() => {
    const { mutation, options: clientOptions } = options?.() ?? {}
    return { ...mutation, ...getDeleteUsersUserIdMutationOptions(clientOptions) }
  })
}
