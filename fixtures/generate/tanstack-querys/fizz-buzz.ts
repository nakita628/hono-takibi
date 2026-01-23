import type { QueryClient, UseQueryOptions } from '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query'
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
    query?: UseQueryOptions<
      InferResponseType<typeof client.fizzbuzz.$get>,
      Error,
      InferResponseType<typeof client.fizzbuzz.$get>,
      readonly ['/fizzbuzz', InferRequestType<typeof client.fizzbuzz.$get>]
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetFizzbuzzQueryKey(args)
  const query = useQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.fizzbuzz.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /fizzbuzz
 */
export function getGetFizzbuzzQueryKey(args: InferRequestType<typeof client.fizzbuzz.$get>) {
  return ['/fizzbuzz', args] as const
}
