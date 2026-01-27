import useSWR from 'swr'
import type { Key, SWRConfiguration } from 'swr'
import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/openapi-nullable'

/**
 * Generates SWR cache key for GET /nullable
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetNullableKey() {
  return ['nullable', 'GET', '/nullable'] as const
}

/**
 * GET /nullable
 *
 * zod nullable
 *
 * zod nullable
 */
export function useGetNullable(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = isEnabled ? (customKey ?? getGetNullableKey()) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.nullable.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}
