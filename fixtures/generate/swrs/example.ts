import useSWR from 'swr'
import type { SWRConfiguration } from 'swr'
import type { InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/example'

/**
 * GET /sample
 *
 * Returns a payload exercising every custom format, constraint, and nullable case
 */
export function useGetSample(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.sample.$get>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/sample'] as const) : null
  return useSWR<InferResponseType<typeof client.sample.$get>, Error>(
    key,
    async () => parseResponse(client.sample.$get(undefined, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /sample
 */
export function getGetSampleKey() {
  return ['GET', '/sample'] as const
}
