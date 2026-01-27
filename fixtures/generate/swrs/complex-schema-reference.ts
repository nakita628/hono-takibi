import useSWR from 'swr'
import type { Key, SWRConfiguration } from 'swr'
import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/complex-schema-reference'

/**
 * Generates SWR cache key for GET /test
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetTestKey() {
  return ['test', 'GET', '/test'] as const
}

/**
 * GET /test
 *
 * Test endpoint for comprehensive schema references
 */
export function useGetTest(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = isEnabled ? (customKey ?? getGetTestKey()) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.test.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}
