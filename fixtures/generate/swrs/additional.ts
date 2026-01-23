import type { ClientRequestOptions, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import type { Key, SWRConfiguration } from 'swr'
import useSWR from 'swr'
import { client } from '../clients/additional'

/**
 * GET /passthrough
 *
 * zod passthrough
 *
 * zod passthrough
 */
export function useGetPassthrough(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.passthrough.$get>, Error> & {
    swrKey?: Key
    enabled?: boolean
  }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetPassthroughKey() : null)
  const query = useSWR<InferResponseType<typeof client.passthrough.$get>, Error>(
    swrKey,
    async () => parseResponse(client.passthrough.$get(undefined, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /passthrough
 */
export function getGetPassthroughKey() {
  return ['GET', '/passthrough'] as const
}
