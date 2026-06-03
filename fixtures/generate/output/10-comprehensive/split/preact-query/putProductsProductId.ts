import { useMutation, mutationOptions } from '@tanstack/preact-query'
import type { UseMutationOptions } from '@tanstack/preact-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../../client'

export function getPutProductsProductIdMutationOptions<TError = unknown>(
  options?: ClientRequestOptions,
) {
  return mutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client.products)[':productId']['$put']>>>
      >
    >,
    TError,
    InferRequestType<(typeof client.products)[':productId']['$put']>
  >({
    mutationKey: ['products', '/products/:productId', 'PUT'] as const,
    async mutationFn(args: InferRequestType<(typeof client.products)[':productId']['$put']>) {
      return parseResponse(client.products[':productId'].$put(args, options))
    },
  })
}

export function usePutProductsProductId<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client.products)[':productId']['$put']>>>
      >
    >,
    TError,
    InferRequestType<(typeof client.products)[':productId']['$put']>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getPutProductsProductIdMutationOptions<TError>(clientOptions),
  })
}
