import useSWR from 'swr'
import type { SWRConfiguration } from 'swr'
import type { InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/complex-schema-reference'

/**
 * GET /test
 *
 * Test endpoint for comprehensive schema references
 */
export function useGetTest(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.test.$get>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/test'] as const) : null
  return useSWR<InferResponseType<typeof client.test.$get>, Error>(
    key,
    async () => parseResponse(client.test.$get(undefined, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /test
 */
export function getGetTestKey() {
  return ['GET', '/test'] as const
}
