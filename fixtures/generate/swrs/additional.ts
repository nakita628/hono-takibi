import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import type { Key, SWRConfiguration } from 'swr'
import useSWR from 'swr'
import { client } from '../clients/additional'

/**
 * Generates SWR cache key for GET /passthrough
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetPassthroughKey() {
  return ['passthrough', 'GET', '/passthrough'] as const
}

/**
 * GET /passthrough
 *
 * zod passthrough
 *
 * zod passthrough
 */
export function useGetPassthrough(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = isEnabled ? (customKey ?? getGetPassthroughKey()) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.passthrough.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}
