import useSWR from 'swr'
import type { SWRConfiguration } from 'swr'
import type { InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/schema-reference'

/**
 * GET /example
 *
 * Sample Endpoint
 */
export function useGetExample(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.example.$get>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/example'] as const) : null
  return useSWR<InferResponseType<typeof client.example.$get>, Error>(
    key,
    async () => parseResponse(client.example.$get(undefined, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /example
 */
export function getGetExampleKey() {
  return ['GET', '/example'] as const
}
