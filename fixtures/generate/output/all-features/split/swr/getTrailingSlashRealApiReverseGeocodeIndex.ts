import useSWR from 'swr'
import useSWRImmutable from 'swr/immutable'
import type { Key, SWRConfiguration } from 'swr'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../../client'

export function getGetTrailingSlashRealApiReverseGeocodeIndexKey(
  args: InferRequestType<typeof client.trailingSlashReal.api.reverseGeocode.index.$get>,
) {
  return ['trailingSlashReal', '/trailingSlashReal/api/reverseGeocode/', args] as const
}

export function useGetTrailingSlashRealApiReverseGeocodeIndex(
  args: InferRequestType<typeof client.trailingSlashReal.api.reverseGeocode.index.$get>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false ? (customKey ?? getGetTrailingSlashRealApiReverseGeocodeIndexKey(args)) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(client.trailingSlashReal.api.reverseGeocode.index.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function useImmutableGetTrailingSlashRealApiReverseGeocodeIndex(
  args: InferRequestType<typeof client.trailingSlashReal.api.reverseGeocode.index.$get>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false ? (customKey ?? getGetTrailingSlashRealApiReverseGeocodeIndexKey(args)) : null
  return {
    swrKey,
    ...useSWRImmutable(
      swrKey,
      async () =>
        parseResponse(client.trailingSlashReal.api.reverseGeocode.index.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}
