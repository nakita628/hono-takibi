import type { QueryClient, UseQueryOptions } from '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query'
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
    query?: UseQueryOptions<
      InferResponseType<typeof client.array.$get>,
      Error,
      InferResponseType<typeof client.array.$get>,
      readonly ['/array']
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetArrayQueryKey()
  const query = useQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.array.$get(undefined, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /array
 */
export function getGetArrayQueryKey() {
  return ['/array'] as const
}
