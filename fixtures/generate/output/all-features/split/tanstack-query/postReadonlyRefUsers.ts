import { useMutation, mutationOptions } from '@tanstack/react-query'
import type { UseMutationOptions } from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../../client'

export function getPostReadonlyRefUsersMutationOptions<TError = unknown>(
  options?: ClientRequestOptions,
) {
  return mutationOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.readonlyRef.users.$post>>>>
    >,
    TError,
    InferRequestType<typeof client.readonlyRef.users.$post>
  >({
    mutationKey: ['readonlyRef', '/readonlyRef/users', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.readonlyRef.users.$post>) {
      return parseResponse(client.readonlyRef.users.$post(args, options))
    },
  })
}

export function usePostReadonlyRefUsers<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.readonlyRef.users.$post>>>>
    >,
    TError,
    InferRequestType<typeof client.readonlyRef.users.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getPostReadonlyRefUsersMutationOptions<TError>(clientOptions),
  })
}
