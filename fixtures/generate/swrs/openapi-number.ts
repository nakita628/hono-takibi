import type { ClientRequestOptions, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import type { SWRConfiguration } from 'swr'
import useSWR from 'swr'
import { client } from '../clients/openapi-number'

/**
 * GET /number
 *
 * zod number
 *
 * zod number
 */
export function useGetNumber(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.number.$get>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/number'] as const) : null
  return useSWR<InferResponseType<typeof client.number.$get>, Error>(
    key,
    async () => parseResponse(client.number.$get(undefined, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /number
 */
export function getGetNumberKey() {
  return ['GET', '/number'] as const
}
