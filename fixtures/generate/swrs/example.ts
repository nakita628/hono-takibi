import useSWR from 'swr'
import type { Key, SWRConfiguration } from 'swr'
import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/example'

/**
 * Generates SWR cache key for GET /sample
 * Returns structured key [path] for filter-based invalidation
 */
export function getGetSampleKey() {
  return ['/sample'] as const
}

/**
 * GET /sample
 *
 * Returns a payload exercising every custom format, constraint, and nullable case
 */
export function useGetSample(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetSampleKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.sample.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}
