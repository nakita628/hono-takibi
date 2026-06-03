import { useMutation, mutationOptions } from '@tanstack/preact-query'
import type { UseMutationOptions } from '@tanstack/preact-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../../client'

export function getPostProductsMutationOptions<TError = unknown>(options?: ClientRequestOptions) {
  return mutationOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.products.$post>>>>>,
    TError,
    InferRequestType<typeof client.products.$post>
  >({
    mutationKey: ['products', '/products', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.products.$post>) {
      return parseResponse(client.products.$post(args, options))
    },
  })
}

export function usePostProducts<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.products.$post>>>>>,
    TError,
    InferRequestType<typeof client.products.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getPostProductsMutationOptions<TError>(clientOptions),
  })
}
