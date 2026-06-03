import { useQuery, useSuspenseQuery, queryOptions } from '@tanstack/preact-query'
import type {
  UseQueryOptions,
  QueryFunctionContext,
  UseSuspenseQueryOptions,
} from '@tanstack/preact-query'
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
  args: InferRequestType<(typeof client.products)[':productId']['reviews']['$get']>,
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
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.products[':productId'].reviews.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function useSuspenseProductsProductIdReviews<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<
        Awaited<ReturnType<(typeof client.products)[':productId']['reviews']['$get']>>
      >
    >
  >,
  TError = unknown,
>(
  args: InferRequestType<(typeof client.products)[':productId']['reviews']['$get']>,
  options?: {
    query?: UseSuspenseQueryOptions<
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
  return useSuspenseQuery({
    ...queryOptions,
    queryKey: getProductsProductIdReviewsQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.products[':productId'].reviews.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}
