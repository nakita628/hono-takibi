import useSWR from 'swr'
import type { Key, SWRConfiguration } from 'swr'
import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/schema-reference'

/**
 * Generates SWR cache key for GET /example
 * Returns structured key [path] for filter-based invalidation
 */
export function getGetExampleKey() {
  return ['/example'] as const
}

/**
 * GET /example
 *
 * Sample Endpoint
 */
export function useGetExample(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetExampleKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.example.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}
