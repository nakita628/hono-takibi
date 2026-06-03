import { createQuery, queryOptions } from '@tanstack/solid-query'
import type { CreateQueryOptions, QueryFunctionContext } from '@tanstack/solid-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../../client'

export function getProductsProductIdReviewsQueryKey(
  args: InferRequestType<(typeof client.products)[':productId']['reviews']['$get']>,
) {
  return ['products', '/products/:productId/reviews', args] as const
}

export function getProductsProductIdReviewsQueryOptions(
  args: InferRequestType<(typeof client.products)[':productId']['reviews']['$get']>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getProductsProductIdReviewsQueryKey(args),
    queryFn({ signal }) {
      return parseResponse(
        client.products[':productId'].reviews.$get(args, {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  })
}

export function createProductsProductIdReviews<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<
        Awaited<ReturnType<(typeof client.products)[':productId']['reviews']['$get']>>
      >
    >
  >,
  TError = unknown,
>(
  args: () => InferRequestType<(typeof client.products)[':productId']['reviews']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.products)[':productId']['reviews']['$get']>>
          >
        >
      >,
      TError,
      TData
    >
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...query,
      queryKey: getProductsProductIdReviewsQueryKey(args()),
      queryFn({ signal }: QueryFunctionContext) {
        return parseResponse(
          client.products[':productId'].reviews.$get(args(), {
            ...clientOptions,
            init: { ...clientOptions?.init, signal },
          }),
        )
      },
    }
  })
}
