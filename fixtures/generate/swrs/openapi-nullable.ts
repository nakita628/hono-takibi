import type { ClientRequestOptions, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import type { SWRConfiguration } from 'swr'
import useSWR from 'swr'
import { client } from '../clients/openapi-nullable'

/**
 * GET /nullable
 *
 * zod nullable
 *
 * zod nullable
 */
export function useGetNullable(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.nullable.$get>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/nullable'] as const) : null
  return useSWR<InferResponseType<typeof client.nullable.$get>, Error>(
    key,
    async () => parseResponse(client.nullable.$get(undefined, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /nullable
 */
export function getGetNullableKey() {
  return ['GET', '/nullable'] as const
}
