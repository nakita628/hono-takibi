import useSWR from 'swr'
import useSWRImmutable from 'swr/immutable'
import type { Key, SWRConfiguration } from 'swr'
import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../../client'

export function getGetArrayObjectConstraintsTagsKey() {
  return ['arrayObjectConstraints', '/arrayObjectConstraints/tags'] as const
}

export function useGetArrayObjectConstraintsTags(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetArrayObjectConstraintsTagsKey()) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.arrayObjectConstraints.tags.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function useImmutableGetArrayObjectConstraintsTags(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetArrayObjectConstraintsTagsKey()) : null
  return {
    swrKey,
    ...useSWRImmutable(
      swrKey,
      async () => parseResponse(client.arrayObjectConstraints.tags.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}
