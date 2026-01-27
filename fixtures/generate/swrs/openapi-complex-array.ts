import useSWR from 'swr'
import type { Key, SWRConfiguration } from 'swr'
import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/openapi-complex-array'

/**
 * Generates SWR cache key for GET /array
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetArrayKey() {
  return ['array', 'GET', '/array'] as const
}

/**
 * GET /array
 *
 * zod array
 *
 * zod array
 */
export function useGetArray(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetArrayKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.array.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}
