import type { QueryFunctionContext, UseQueryOptions } from '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/fizz-buzz'

/**
 * Generates TanStack Query cache key for GET /fizzbuzz
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetFizzbuzzQueryKey(args: InferRequestType<typeof client.fizzbuzz.$get>) {
  return ['fizzbuzz', 'GET', '/fizzbuzz', args] as const
}

/**
 * Returns TanStack Query query options for GET /fizzbuzz
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetFizzbuzzQueryOptions = (
  args: InferRequestType<typeof client.fizzbuzz.$get>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetFizzbuzzQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.fizzbuzz.$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

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
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.fizzbuzz.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetFizzbuzzQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}
