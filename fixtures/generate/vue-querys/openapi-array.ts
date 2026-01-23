import type { QueryClient, UseQueryOptions } from '@tanstack/vue-query'
import { useQuery } from '@tanstack/vue-query'
import type { ClientRequestOptions, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/openapi-array'

/**
 * GET /array
 *
 * zod array
 *
 * zod array
 */
export function useGetArray(
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.array.$get>, Error>,
      'queryKey' | 'queryFn'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetArrayQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.array.$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Vue Query cache key for GET /array
 */
export function getGetArrayQueryKey() {
  return ['/array'] as const
}
