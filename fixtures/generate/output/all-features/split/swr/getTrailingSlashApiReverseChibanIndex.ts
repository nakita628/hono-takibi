import useSWR from 'swr'
import useSWRImmutable from 'swr/immutable'
import type { Key, SWRConfiguration } from 'swr'
import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../../client'

export function getGetTrailingSlashApiReverseChibanIndexKey() {
  return ['trailingSlash', '/trailingSlash/api/reverseChiban/'] as const
}

export function useGetTrailingSlashApiReverseChibanIndex(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false ? (customKey ?? getGetTrailingSlashApiReverseChibanIndexKey()) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(client.trailingSlash.api.reverseChiban.index.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function useImmutableGetTrailingSlashApiReverseChibanIndex(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false ? (customKey ?? getGetTrailingSlashApiReverseChibanIndexKey()) : null
  return {
    swrKey,
    ...useSWRImmutable(
      swrKey,
      async () =>
        parseResponse(client.trailingSlash.api.reverseChiban.index.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}
