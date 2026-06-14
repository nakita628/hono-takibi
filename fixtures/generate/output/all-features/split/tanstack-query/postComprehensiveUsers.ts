import { useMutation, mutationOptions } from '@tanstack/react-query'
import type { UseMutationOptions } from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../../client'

export function getPostComprehensiveUsersMutationOptions<TError = unknown>(
  options?: ClientRequestOptions,
) {
  return mutationOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.comprehensive.users.$post>>>>
    >,
    TError,
    InferRequestType<typeof client.comprehensive.users.$post>
  >({
    mutationKey: ['comprehensive', '/comprehensive/users', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.comprehensive.users.$post>) {
      return parseResponse(client.comprehensive.users.$post(args, options))
    },
  })
}

export function usePostComprehensiveUsers<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.comprehensive.users.$post>>>>
    >,
    TError,
    InferRequestType<typeof client.comprehensive.users.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getPostComprehensiveUsersMutationOptions<TError>(clientOptions),
  })
}
