import useSWR from 'swr'
import type { SWRConfiguration } from 'swr'
import type { InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/openapi-literal'

/**
 * GET /primitive
 *
 * zod primitive
 *
 * zod primitive
 */
export function useGetPrimitive(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.primitive.$get>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/primitive'] as const) : null
  return useSWR<InferResponseType<typeof client.primitive.$get>, Error>(
    key,
    async () => parseResponse(client.primitive.$get(undefined, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /primitive
 */
export function getGetPrimitiveKey() {
  return ['GET', '/primitive'] as const
}
