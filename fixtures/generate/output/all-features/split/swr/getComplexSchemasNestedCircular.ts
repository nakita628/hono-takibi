import useSWR from 'swr'
import useSWRImmutable from 'swr/immutable'
import type { Key, SWRConfiguration } from 'swr'
import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../../client'

export function getGetComplexSchemasNestedCircularKey() {
  return ['complexSchemas', '/complexSchemas/nested-circular'] as const
}

export function useGetComplexSchemasNestedCircular(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetComplexSchemasNestedCircularKey()) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(client.complexSchemas['nested-circular'].$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function useImmutableGetComplexSchemasNestedCircular(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetComplexSchemasNestedCircularKey()) : null
  return {
    swrKey,
    ...useSWRImmutable(
      swrKey,
      async () =>
        parseResponse(client.complexSchemas['nested-circular'].$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}
