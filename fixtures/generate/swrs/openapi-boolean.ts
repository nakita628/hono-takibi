import useSWR from 'swr'
import type { SWRConfiguration } from 'swr'
import type { InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/openapi-boolean'

/**
 * GET /boolean
 *
 * zod boolean
 *
 * zod boolean
 */
export function useGetBoolean(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.boolean.$get>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/boolean'] as const) : null
  return useSWR<InferResponseType<typeof client.boolean.$get>, Error>(
    key,
    async () => parseResponse(client.boolean.$get(undefined, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /boolean
 */
export function getGetBooleanKey() {
  return ['GET', '/boolean'] as const
}
