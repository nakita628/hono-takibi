import { useMutation, mutationOptions } from '@tanstack/react-query'
import type { UseMutationOptions } from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../../client'

export function getPutReadonlyRefUsersIdMutationOptions<TError = unknown>(
  options?: ClientRequestOptions,
) {
  return mutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client.readonlyRef.users)[':id']['$put']>>>
      >
    >,
    TError,
    InferRequestType<(typeof client.readonlyRef.users)[':id']['$put']>
  >({
    mutationKey: ['readonlyRef', '/readonlyRef/users/:id', 'PUT'] as const,
    async mutationFn(args: InferRequestType<(typeof client.readonlyRef.users)[':id']['$put']>) {
      return parseResponse(client.readonlyRef.users[':id'].$put(args, options))
    },
  })
}

export function usePutReadonlyRefUsersId<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client.readonlyRef.users)[':id']['$put']>>>
      >
    >,
    TError,
    InferRequestType<(typeof client.readonlyRef.users)[':id']['$put']>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getPutReadonlyRefUsersIdMutationOptions<TError>(clientOptions),
  })
}
