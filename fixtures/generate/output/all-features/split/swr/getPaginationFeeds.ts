import useSWR from 'swr'
import useSWRImmutable from 'swr/immutable'
import type { Key, SWRConfiguration } from 'swr'
import useSWRInfinite from 'swr/infinite'
import type { SWRInfiniteConfiguration, SWRInfiniteKeyLoader } from 'swr/infinite'
import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../../client'

export function getGetPaginationFeedsKey() {
  return ['pagination', '/pagination/feeds'] as const
}

export function useGetPaginationFeeds(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetPaginationFeedsKey()) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.pagination.feeds.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function useImmutableGetPaginationFeeds(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetPaginationFeedsKey()) : null
  return {
    swrKey,
    ...useSWRImmutable(
      swrKey,
      async () => parseResponse(client.pagination.feeds.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function getGetPaginationFeedsInfiniteKey() {
  return ['pagination', '/pagination/feeds', 'infinite'] as const
}

export function useInfiniteGetPaginationFeeds<TError = unknown>(options: {
  swr?: SWRInfiniteConfiguration<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.pagination.feeds.$get>>>>
    >,
    TError
  > & { swrKey?: SWRInfiniteKeyLoader }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKeyLoader, ...restSwrOptions } = swrOptions ?? {}
  const keyLoader =
    customKeyLoader ?? ((index: number) => [...getGetPaginationFeedsInfiniteKey(), index] as const)
  return useSWRInfinite(
    keyLoader,
    async () => parseResponse(client.pagination.feeds.$get(undefined, clientOptions)),
    restSwrOptions,
  )
}
