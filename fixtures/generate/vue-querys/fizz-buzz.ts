import type { QueryClient, UseQueryOptions } from '@tanstack/vue-query'
import { useQuery } from '@tanstack/vue-query'
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
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.fizzbuzz.$get>, Error>,
      'queryKey' | 'queryFn'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetFizzbuzzQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.fizzbuzz.$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Vue Query cache key for GET /fizzbuzz
 */
export function getGetFizzbuzzQueryKey(args?: InferRequestType<typeof client.fizzbuzz.$get>) {
  return ['/fizzbuzz', ...(args ? [args] : [])] as const
}
