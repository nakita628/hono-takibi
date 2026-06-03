import { useQuery } from '@tanstack/vue-query'
import type { UseQueryOptions, QueryFunctionContext } from '@tanstack/vue-query'
import { toValue } from 'vue'
import type { MaybeRefOrGetter } from 'vue'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../../client'

export function getProductsProductIdReviewsQueryKey(
  args: MaybeRefOrGetter<
    InferRequestType<(typeof client.products)[':productId']['reviews']['$get']>
  >,
) {
  return ['products', '/products/:productId/reviews', args] as const
}

export function getProductsProductIdReviewsQueryOptions(
  args: MaybeRefOrGetter<
    InferRequestType<(typeof client.products)[':productId']['reviews']['$get']>
  >,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getProductsProductIdReviewsQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.products[':productId'].reviews.$get(toValue(args), {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  }
}

export function useProductsProductIdReviews<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<
        Awaited<ReturnType<(typeof client.products)[':productId']['reviews']['$get']>>
      >
    >
  >,
  TError = unknown,
>(
  args: MaybeRefOrGetter<
    InferRequestType<(typeof client.products)[':productId']['reviews']['$get']>
  >,
  options?: {
    query?: UseQueryOptions<
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
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getProductsProductIdReviewsQueryKey(args),
    queryFn({ signal }) {
      return parseResponse(
        client.products[':productId'].reviews.$get(toValue(args), {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}
