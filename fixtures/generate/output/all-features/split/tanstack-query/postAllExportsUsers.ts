import { useMutation, mutationOptions } from '@tanstack/react-query'
import type { UseMutationOptions } from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../../client'

export function getPostAllExportsUsersMutationOptions<TError = unknown>(
  options?: ClientRequestOptions,
) {
  return mutationOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.allExports.users.$post>>>>
    >,
    TError,
    InferRequestType<typeof client.allExports.users.$post>
  >({
    mutationKey: ['allExports', '/allExports/users', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.allExports.users.$post>) {
      return parseResponse(client.allExports.users.$post(args, options))
    },
  })
}

export function usePostAllExportsUsers<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.allExports.users.$post>>>>
    >,
    TError,
    InferRequestType<typeof client.allExports.users.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getPostAllExportsUsersMutationOptions<TError>(clientOptions),
  })
}
