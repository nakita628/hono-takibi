import useSWR from 'swr'
import type { Key, SWRConfiguration } from 'swr'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/fizz-buzz'

/**
 * Generates SWR cache key for GET /fizzbuzz
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetFizzbuzzKey(args: InferRequestType<typeof client.fizzbuzz.$get>) {
  return ['/fizzbuzz', args] as const
}

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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetFizzbuzzKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.fizzbuzz.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}
