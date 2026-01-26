import { queryOptions, useQuery } from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType, InferResponseType } from 'hono/client'
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetFizzbuzzQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /fizzbuzz
 */
export function getGetFizzbuzzQueryKey(args: InferRequestType<typeof client.fizzbuzz.$get>) {
  return ['/fizzbuzz', args] as const
}

/**
 * Returns TanStack Query query options for GET /fizzbuzz
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetFizzbuzzQueryOptions = (
  args: InferRequestType<typeof client.fizzbuzz.$get>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetFizzbuzzQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.fizzbuzz.$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
      ),
  })
