import useSWR from 'swr'
import type { SWRConfiguration } from 'swr'
import type { InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/01-minimal'

/**
 * GET /health
 */
export function useGetHealth(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.health.$get>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/health'] as const) : null
  return useSWR<InferResponseType<typeof client.health.$get>, Error>(
    key,
    async () => parseResponse(client.health.$get(undefined, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /health
 */
export function getGetHealthKey() {
  return ['GET', '/health'] as const
}
