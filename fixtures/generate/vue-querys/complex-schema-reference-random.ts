import type { QueryClient, UseQueryOptions } from '@tanstack/vue-query'
import { useQuery } from '@tanstack/vue-query'
import type { ClientRequestOptions, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/complex-schema-reference-random'

/**
 * GET /test
 *
 * Test endpoint for comprehensive schema references
 */
export function useGetTest(
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.test.$get>, Error>,
      'queryKey' | 'queryFn'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetTestQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.test.$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Vue Query cache key for GET /test
 */
export function getGetTestQueryKey() {
  return ['/test'] as const
}
