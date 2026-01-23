import useSWR from 'swr'
import type { SWRConfiguration } from 'swr'
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
    swr?: SWRConfiguration<InferResponseType<typeof client.fizzbuzz.$get>, Error>
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key = options?.enabled !== false ? (['GET', '/fizzbuzz', args] as const) : null
  return useSWR<InferResponseType<typeof client.fizzbuzz.$get>, Error>(
    key,
    async () => parseResponse(client.fizzbuzz.$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /fizzbuzz
 */
export function getGetFizzbuzzKey(args: InferRequestType<typeof client.fizzbuzz.$get>) {
  return ['GET', '/fizzbuzz', args] as const
}
