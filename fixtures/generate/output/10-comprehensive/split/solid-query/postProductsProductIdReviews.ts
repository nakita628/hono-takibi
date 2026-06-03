import { createMutation } from '@tanstack/solid-query'
import type { CreateMutationOptions } from '@tanstack/solid-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../../client'

export function getPostProductsProductIdReviewsMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['products', '/products/:productId/reviews', 'POST'] as const,
    async mutationFn(
      args: InferRequestType<(typeof client.products)[':productId']['reviews']['$post']>,
    ) {
      return parseResponse(client.products[':productId'].reviews.$post(args, options))
    },
  }
}

export function createPostProductsProductIdReviews<TError = unknown>(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.products)[':productId']['reviews']['$post']>>
          >
        >
      >,
      TError,
      InferRequestType<(typeof client.products)[':productId']['reviews']['$post']>
    >
    options?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const { mutation, options: clientOptions } = options?.() ?? {}
    return { ...mutation, ...getPostProductsProductIdReviewsMutationOptions(clientOptions) }
  })
}
