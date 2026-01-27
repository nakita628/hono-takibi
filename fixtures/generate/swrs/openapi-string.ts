import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import type { Key, SWRConfiguration } from 'swr'
import useSWR from 'swr'
import { client } from '../clients/openapi-string'

/**
 * Generates SWR cache key for GET /string
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetStringKey() {
  return ['string', 'GET', '/string'] as const
}

/**
 * GET /string
 *
 * zod string
 *
 * zod string
 */
export function useGetString(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = isEnabled ? (customKey ?? getGetStringKey()) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.string.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}
