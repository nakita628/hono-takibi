import useSWR from 'swr'
import type { SWRConfiguration } from 'swr'
import type { InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/openapi-string'

/**
 * GET /string
 *
 * zod string
 *
 * zod string
 */
export function useGetString(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.string.$get>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/string'] as const) : null
  return useSWR<InferResponseType<typeof client.string.$get>, Error>(
    key,
    async () => parseResponse(client.string.$get(undefined, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /string
 */
export function getGetStringKey() {
  return ['GET', '/string'] as const
}
