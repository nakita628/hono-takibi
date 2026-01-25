import { useQuery } from '@tanstack/vue-query'
import type { InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/complex-schema-reference-random'

/**
 * GET /test
 *
 * Test endpoint for comprehensive schema references
 */
export function useGetTest(options?: {
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
      | InferResponseType<typeof client.test.$get>
      | (() => InferResponseType<typeof client.test.$get>)
    initialData?:
      | InferResponseType<typeof client.test.$get>
      | (() => InferResponseType<typeof client.test.$get>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetTestQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.test.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /test
 */
export function getGetTestQueryKey() {
  return ['/test'] as const
}

/**
 * Returns Vue Query query options for GET /test
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetTestQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetTestQueryKey(),
    queryFn: async () => parseResponse(client.test.$get(undefined, clientOptions)),
  }
}
