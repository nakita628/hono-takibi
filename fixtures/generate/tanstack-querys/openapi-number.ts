import type { QueryClient, UseQueryOptions } from '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query'
import type { ClientRequestOptions, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/openapi-number'

/**
 * GET /number
 *
 * zod number
 *
 * zod number
 */
export function useGetNumber(
  options?: {
    query?: UseQueryOptions<
      InferResponseType<typeof client.number.$get>,
      Error,
      InferResponseType<typeof client.number.$get>,
      readonly ['/number']
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetNumberQueryKey()
  const query = useQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.number.$get(undefined, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /number
 */
export function getGetNumberQueryKey() {
  return ['/number'] as const
}
