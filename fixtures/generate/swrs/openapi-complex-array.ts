import type { ClientRequestOptions, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import type { SWRConfiguration } from 'swr'
import useSWR from 'swr'
import { client } from '../clients/openapi-complex-array'

/**
 * GET /array
 *
 * zod array
 *
 * zod array
 */
export function useGetArray(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.array.$get>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/array'] as const) : null
  return useSWR<InferResponseType<typeof client.array.$get>, Error>(
    key,
    async () => parseResponse(client.array.$get(undefined, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /array
 */
export function getGetArrayKey() {
  return ['GET', '/array'] as const
}
