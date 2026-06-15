import { useMutation, mutationOptions } from '@tanstack/react-query'
import type { UseMutationOptions } from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../../client'

export function getPutComprehensiveProductsProductIdMutationOptions<TError = unknown>(
  options?: ClientRequestOptions,
) {
  return mutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.comprehensive.products)[':productId']['$put']>>
        >
      >
    >,
    TError,
    InferRequestType<(typeof client.comprehensive.products)[':productId']['$put']>
  >({
    mutationKey: ['comprehensive', '/comprehensive/products/:productId', 'PUT'] as const,
    async mutationFn(
      args: InferRequestType<(typeof client.comprehensive.products)[':productId']['$put']>,
    ) {
      return parseResponse(client.comprehensive.products[':productId'].$put(args, options))
    },
  })
}

export function usePutComprehensiveProductsProductId<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.comprehensive.products)[':productId']['$put']>>
        >
      >
    >,
    TError,
    InferRequestType<(typeof client.comprehensive.products)[':productId']['$put']>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getPutComprehensiveProductsProductIdMutationOptions<TError>(clientOptions),
  })
}
