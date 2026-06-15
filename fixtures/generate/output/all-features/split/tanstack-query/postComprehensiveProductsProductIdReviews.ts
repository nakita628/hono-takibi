import { useMutation, mutationOptions } from '@tanstack/react-query'
import type { UseMutationOptions } from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../../client'

export function getPostComprehensiveProductsProductIdReviewsMutationOptions<TError = unknown>(
  options?: ClientRequestOptions,
) {
  return mutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<
            ReturnType<(typeof client.comprehensive.products)[':productId']['reviews']['$post']>
          >
        >
      >
    >,
    TError,
    InferRequestType<(typeof client.comprehensive.products)[':productId']['reviews']['$post']>
  >({
    mutationKey: ['comprehensive', '/comprehensive/products/:productId/reviews', 'POST'] as const,
    async mutationFn(
      args: InferRequestType<
        (typeof client.comprehensive.products)[':productId']['reviews']['$post']
      >,
    ) {
      return parseResponse(client.comprehensive.products[':productId'].reviews.$post(args, options))
    },
  })
}

export function usePostComprehensiveProductsProductIdReviews<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<
            ReturnType<(typeof client.comprehensive.products)[':productId']['reviews']['$post']>
          >
        >
      >
    >,
    TError,
    InferRequestType<(typeof client.comprehensive.products)[':productId']['reviews']['$post']>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getPostComprehensiveProductsProductIdReviewsMutationOptions<TError>(clientOptions),
  })
}
