import type { ClientRequestOptions, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import type { Key, SWRConfiguration } from 'swr'
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
  swr?: SWRConfiguration<InferResponseType<typeof client.nullable.$get>, Error> & {
    swrKey?: Key
    enabled?: boolean
  }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetNullableKey() : null)
  const query = useSWR<InferResponseType<typeof client.nullable.$get>, Error>(
    swrKey,
    async () => parseResponse(client.nullable.$get(undefined, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /nullable
 */
export function getGetNullableKey() {
  return ['/nullable'] as const
}
