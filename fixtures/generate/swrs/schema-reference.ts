import useSWR from 'swr'
import type { Key, SWRConfiguration } from 'swr'
import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/schema-reference'

/**
 * Generates SWR cache key for GET /example
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetExampleKey() {
  return ['example', 'GET', '/example'] as const
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
  const swrKey = isEnabled ? (customKey ?? getGetExampleKey()) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.example.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}
