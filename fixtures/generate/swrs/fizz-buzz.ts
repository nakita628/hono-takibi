import useSWR from 'swr'
import type { Key, SWRConfiguration } from 'swr'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/fizz-buzz'

/**
 * GET /fizzbuzz
 *
 * Get FizzBuzz result
 *
 * Returns the FizzBuzz result for the given number.
 */
export function useGetFizzbuzz(
  args: InferRequestType<typeof client.fizzbuzz.$get>,
  options?: {
    swr?: SWRConfiguration<InferResponseType<typeof client.fizzbuzz.$get>, Error> & {
      swrKey?: Key
      enabled?: boolean
    }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetFizzbuzzKey(args) : null)
  const query = useSWR<InferResponseType<typeof client.fizzbuzz.$get>, Error>(
    swrKey,
    async () => parseResponse(client.fizzbuzz.$get(args, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /fizzbuzz
 */
export function getGetFizzbuzzKey(args: InferRequestType<typeof client.fizzbuzz.$get>) {
  return ['GET', '/fizzbuzz', args] as const
}
