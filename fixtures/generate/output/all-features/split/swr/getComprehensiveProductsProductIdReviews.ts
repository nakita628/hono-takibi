import useSWR from 'swr'
import useSWRImmutable from 'swr/immutable'
import type { Key, SWRConfiguration } from 'swr'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../../client'

export function getGetComprehensiveProductsProductIdReviewsKey(
  args: InferRequestType<(typeof client.comprehensive.products)[':productId']['reviews']['$get']>,
) {
  return ['comprehensive', '/comprehensive/products/:productId/reviews', args] as const
}

export function useGetComprehensiveProductsProductIdReviews(
  args: InferRequestType<(typeof client.comprehensive.products)[':productId']['reviews']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false ? (customKey ?? getGetComprehensiveProductsProductIdReviewsKey(args)) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(
          client.comprehensive.products[':productId'].reviews.$get(args, clientOptions),
        ),
      restSwrOptions,
    ),
  }
}

export function useImmutableGetComprehensiveProductsProductIdReviews(
  args: InferRequestType<(typeof client.comprehensive.products)[':productId']['reviews']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false ? (customKey ?? getGetComprehensiveProductsProductIdReviewsKey(args)) : null
  return {
    swrKey,
    ...useSWRImmutable(
      swrKey,
      async () =>
        parseResponse(
          client.comprehensive.products[':productId'].reviews.$get(args, clientOptions),
        ),
      restSwrOptions,
    ),
  }
}
