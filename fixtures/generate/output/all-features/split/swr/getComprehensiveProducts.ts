import useSWR from 'swr'
import useSWRImmutable from 'swr/immutable'
import type { Key, SWRConfiguration } from 'swr'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../../client'

export function getGetComprehensiveProductsKey(
  args: InferRequestType<typeof client.comprehensive.products.$get>,
) {
  return ['comprehensive', '/comprehensive/products', args] as const
}

export function useGetComprehensiveProducts(
  args: InferRequestType<typeof client.comprehensive.products.$get>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetComprehensiveProductsKey(args)) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.comprehensive.products.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function useImmutableGetComprehensiveProducts(
  args: InferRequestType<typeof client.comprehensive.products.$get>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetComprehensiveProductsKey(args)) : null
  return {
    swrKey,
    ...useSWRImmutable(
      swrKey,
      async () => parseResponse(client.comprehensive.products.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}
