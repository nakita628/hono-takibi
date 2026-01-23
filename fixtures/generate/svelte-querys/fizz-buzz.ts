import { createQuery } from '@tanstack/svelte-query'
import type { QueryClient, CreateQueryOptions } from '@tanstack/svelte-query'
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
    query?: CreateQueryOptions<InferResponseType<typeof client.fizzbuzz.$get>, Error>
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
export function getGetFizzbuzzQueryKey(args?: InferRequestType<typeof client.fizzbuzz.$get>) {
  return ['/fizzbuzz', ...(args ? [args] : [])] as const
}
