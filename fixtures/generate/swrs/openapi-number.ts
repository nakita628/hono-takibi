import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import type { Key, SWRConfiguration } from 'swr'
import useSWR from 'swr'
import { client } from '../clients/openapi-number'

/**
 * Generates SWR cache key for GET /number
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetNumberKey() {
  return ['number', 'GET', '/number'] as const
}

/**
 * GET /number
 *
 * zod number
 *
 * zod number
 */
export function useGetNumber(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = isEnabled ? (customKey ?? getGetNumberKey()) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.number.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}
