import useSWR from 'swr'
import useSWRImmutable from 'swr/immutable'
import type { Key, SWRConfiguration } from 'swr'
import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../../client'

export function getGetCompositionKeywordsNotCompositionKey() {
  return ['compositionKeywords', '/compositionKeywords/not-composition'] as const
}

export function useGetCompositionKeywordsNotComposition(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false ? (customKey ?? getGetCompositionKeywordsNotCompositionKey()) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(client.compositionKeywords['not-composition'].$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function useImmutableGetCompositionKeywordsNotComposition(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false ? (customKey ?? getGetCompositionKeywordsNotCompositionKey()) : null
  return {
    swrKey,
    ...useSWRImmutable(
      swrKey,
      async () =>
        parseResponse(client.compositionKeywords['not-composition'].$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}
