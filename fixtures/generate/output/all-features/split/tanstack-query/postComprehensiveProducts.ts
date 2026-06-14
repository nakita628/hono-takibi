import { useMutation, mutationOptions } from '@tanstack/react-query'
import type { UseMutationOptions } from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../../client'

export function getPostComprehensiveProductsMutationOptions<TError = unknown>(
  options?: ClientRequestOptions,
) {
  return mutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.comprehensive.products.$post>>>
      >
    >,
    TError,
    InferRequestType<typeof client.comprehensive.products.$post>
  >({
    mutationKey: ['comprehensive', '/comprehensive/products', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.comprehensive.products.$post>) {
      return parseResponse(client.comprehensive.products.$post(args, options))
    },
  })
}

export function usePostComprehensiveProducts<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.comprehensive.products.$post>>>
      >
    >,
    TError,
    InferRequestType<typeof client.comprehensive.products.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getPostComprehensiveProductsMutationOptions<TError>(clientOptions),
  })
}
