import useSWR from 'swr'
import type { SWRConfiguration } from 'swr'
import type { InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/additional'

/**
 * GET /passthrough
 *
 * zod passthrough
 *
 * zod passthrough
 */
export function useGetPassthrough(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.passthrough.$get>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/passthrough'] as const) : null
  return useSWR<InferResponseType<typeof client.passthrough.$get>, Error>(
    key,
    async () => parseResponse(client.passthrough.$get(undefined, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /passthrough
 */
export function getGetPassthroughKey() {
  return ['GET', '/passthrough'] as const
}
