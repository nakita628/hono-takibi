import { useQuery } from '@tanstack/react-query'
import type { QueryClient, UseQueryOptions } from '@tanstack/react-query'
import type { InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/example'

/**
 * GET /sample
 *
 * Returns a payload exercising every custom format, constraint, and nullable case
 */
export function useGetSample(
  options?: {
    query?: UseQueryOptions<
      InferResponseType<typeof client.sample.$get>,
      Error,
      InferResponseType<typeof client.sample.$get>,
      readonly ['/sample']
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetSampleQueryKey()
  const query = useQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.sample.$get(undefined, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /sample
 */
export function getGetSampleQueryKey() {
  return ['/sample'] as const
}
