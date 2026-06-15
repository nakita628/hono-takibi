import { useMutation, mutationOptions } from '@tanstack/react-query'
import type { UseMutationOptions } from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../../client'

export function getDeleteComprehensiveUsersUserIdMutationOptions<TError = unknown>(
  options?: ClientRequestOptions,
) {
  return mutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.comprehensive.users)[':userId']['$delete']>>
          >
        >
      >
    | undefined,
    TError,
    InferRequestType<(typeof client.comprehensive.users)[':userId']['$delete']>
  >({
    mutationKey: ['comprehensive', '/comprehensive/users/:userId', 'DELETE'] as const,
    async mutationFn(
      args: InferRequestType<(typeof client.comprehensive.users)[':userId']['$delete']>,
    ) {
      return parseResponse(client.comprehensive.users[':userId'].$delete(args, options))
    },
  })
}

export function useDeleteComprehensiveUsersUserId<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.comprehensive.users)[':userId']['$delete']>>
          >
        >
      >
    | undefined,
    TError,
    InferRequestType<(typeof client.comprehensive.users)[':userId']['$delete']>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getDeleteComprehensiveUsersUserIdMutationOptions<TError>(clientOptions),
  })
}
