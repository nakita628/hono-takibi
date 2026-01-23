import type { QueryClient, UseQueryOptions } from '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query'
import type { ClientRequestOptions, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/abcde'

/**
 * GET /example
 *
 * Get example data
 */
export function useGetExample(
  options?: {
    query?: UseQueryOptions<
      InferResponseType<typeof client.example.$get>,
      Error,
      InferResponseType<typeof client.example.$get>,
      readonly ['/example']
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetExampleQueryKey()
  const query = useQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.example.$get(undefined, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /example
 */
export function getGetExampleQueryKey() {
  return ['/example'] as const
}
