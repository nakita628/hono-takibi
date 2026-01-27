import useSWR from 'swr'
import type { Key, SWRConfiguration } from 'swr'
import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/openapi-string'

/**
 * Generates SWR cache key for GET /string
 * Returns structured key [path] for filter-based invalidation
 */
export function getGetStringKey() {
  return ['/string'] as const
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
  const swrKey = customKey ?? (isEnabled ? getGetStringKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.string.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}
