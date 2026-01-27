import { useQuery } from '@tanstack/vue-query'
import type { UseQueryOptions } from '@tanstack/vue-query'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
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
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.fizzbuzz.$get>>>>
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetFizzbuzzQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query cache key for GET /fizzbuzz
 * Uses $url() for type-safe key generation
 */
export function getGetFizzbuzzQueryKey(args: InferRequestType<typeof client.fizzbuzz.$get>) {
  return [client.fizzbuzz.$url(args).pathname] as const
}

/**
 * Returns Vue Query query options for GET /fizzbuzz
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetFizzbuzzQueryOptions = (
  args: InferRequestType<typeof client.fizzbuzz.$get>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetFizzbuzzQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.fizzbuzz.$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})
