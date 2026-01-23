import useSWR from 'swr'
import type { Key, SWRConfiguration } from 'swr'
import type { InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/01-minimal'

/**
 * GET /health
 */
export function useGetHealth(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.health.$get>, Error> & {
    swrKey?: Key
    enabled?: boolean
  }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetHealthKey() : null)
  const query = useSWR<InferResponseType<typeof client.health.$get>, Error>(
    swrKey,
    async () => parseResponse(client.health.$get(undefined, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /health
 */
export function getGetHealthKey() {
  return ['/health'] as const
}
