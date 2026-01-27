import useSWR from 'swr'
import type { Key, SWRConfiguration } from 'swr'
import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/openapi-boolean'

/**
 * Generates SWR cache key for GET /boolean
 * Returns structured key [path] for filter-based invalidation
 */
export function getGetBooleanKey() {
  return ['/boolean'] as const
}

/**
 * GET /boolean
 *
 * zod boolean
 *
 * zod boolean
 */
export function useGetBoolean(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetBooleanKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.boolean.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}
