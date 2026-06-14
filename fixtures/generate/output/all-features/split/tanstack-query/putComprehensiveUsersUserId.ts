import { useMutation, mutationOptions } from '@tanstack/react-query'
import type { UseMutationOptions } from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../../client'

export function getPutComprehensiveUsersUserIdMutationOptions<TError = unknown>(
  options?: ClientRequestOptions,
) {
  return mutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.comprehensive.users)[':userId']['$put']>>
        >
      >
    >,
    TError,
    InferRequestType<(typeof client.comprehensive.users)[':userId']['$put']>
  >({
    mutationKey: ['comprehensive', '/comprehensive/users/:userId', 'PUT'] as const,
    async mutationFn(
      args: InferRequestType<(typeof client.comprehensive.users)[':userId']['$put']>,
    ) {
      return parseResponse(client.comprehensive.users[':userId'].$put(args, options))
    },
  })
}

export function usePutComprehensiveUsersUserId<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.comprehensive.users)[':userId']['$put']>>
        >
      >
    >,
    TError,
    InferRequestType<(typeof client.comprehensive.users)[':userId']['$put']>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getPutComprehensiveUsersUserIdMutationOptions<TError>(clientOptions),
  })
}
