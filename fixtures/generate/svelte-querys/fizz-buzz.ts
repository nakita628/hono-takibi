import { createQuery } from '@tanstack/svelte-query'
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
export function createGetFizzbuzz(
  args: InferRequestType<typeof client.fizzbuzz.$get>,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
      placeholderData?:
        | InferResponseType<typeof client.fizzbuzz.$get>
        | (() => InferResponseType<typeof client.fizzbuzz.$get>)
      initialData?:
        | InferResponseType<typeof client.fizzbuzz.$get>
        | (() => InferResponseType<typeof client.fizzbuzz.$get>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetFizzbuzzQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.fizzbuzz.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /fizzbuzz
 */
export function getGetFizzbuzzQueryKey(args: InferRequestType<typeof client.fizzbuzz.$get>) {
  return ['/fizzbuzz', args] as const
}

/**
 * Returns Svelte Query query options for GET /fizzbuzz
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetFizzbuzzQueryOptions(
  args: InferRequestType<typeof client.fizzbuzz.$get>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetFizzbuzzQueryKey(args),
    queryFn: async () => parseResponse(client.fizzbuzz.$get(args, clientOptions)),
  }
}
