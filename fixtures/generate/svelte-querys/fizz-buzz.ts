import type { CreateQueryOptions, QueryClient } from '@tanstack/svelte-query'
import { createQuery } from '@tanstack/svelte-query'
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
export function createGetFizzbuzz(
  args: InferRequestType<typeof client.fizzbuzz.$get>,
  options?: {
    query?: CreateQueryOptions<
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
  const query = createQuery(
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
 * Generates Svelte Query cache key for GET /fizzbuzz
 */
export function getGetFizzbuzzQueryKey(args: InferRequestType<typeof client.fizzbuzz.$get>) {
  return ['/fizzbuzz', args] as const
}
