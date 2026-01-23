import type { QueryClient, UseQueryOptions } from '@tanstack/vue-query'
import { useQuery } from '@tanstack/vue-query'
import type { ClientRequestOptions, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/01-minimal'

/**
 * GET /health
 */
export function useGetHealth(
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.health.$get>, Error>,
      'queryKey' | 'queryFn'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetHealthQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.health.$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Vue Query cache key for GET /health
 */
export function getGetHealthQueryKey() {
  return ['/health'] as const
}
