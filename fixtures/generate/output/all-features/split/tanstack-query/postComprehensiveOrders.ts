import { useMutation, mutationOptions } from '@tanstack/react-query'
import type { UseMutationOptions } from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../../client'

export function getPostComprehensiveOrdersMutationOptions<TError = unknown>(
  options?: ClientRequestOptions,
) {
  return mutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.comprehensive.orders.$post>>>
      >
    >,
    TError,
    InferRequestType<typeof client.comprehensive.orders.$post>
  >({
    mutationKey: ['comprehensive', '/comprehensive/orders', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.comprehensive.orders.$post>) {
      return parseResponse(client.comprehensive.orders.$post(args, options))
    },
  })
}

export function usePostComprehensiveOrders<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.comprehensive.orders.$post>>>
      >
    >,
    TError,
    InferRequestType<typeof client.comprehensive.orders.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getPostComprehensiveOrdersMutationOptions<TError>(clientOptions),
  })
}
