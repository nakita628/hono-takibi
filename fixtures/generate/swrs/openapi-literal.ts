import useSWR from 'swr'
import type { Key, SWRConfiguration } from 'swr'
import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/openapi-literal'

/**
 * Generates SWR cache key for GET /primitive
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetPrimitiveKey() {
  return ['primitive', 'GET', '/primitive'] as const
}

/**
 * GET /primitive
 *
 * zod primitive
 *
 * zod primitive
 */
export function useGetPrimitive(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = isEnabled ? (customKey ?? getGetPrimitiveKey()) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.primitive.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}
