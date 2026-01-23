import type { QueryClient, UseQueryOptions } from '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query'
import type { ClientRequestOptions, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/openapi-literal'

/**
 * GET /primitive
 *
 * zod primitive
 *
 * zod primitive
 */
export function useGetPrimitive(
  options?: {
    query?: UseQueryOptions<
      InferResponseType<typeof client.primitive.$get>,
      Error,
      InferResponseType<typeof client.primitive.$get>,
      readonly ['/primitive']
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetPrimitiveQueryKey()
  const query = useQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.primitive.$get(undefined, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /primitive
 */
export function getGetPrimitiveQueryKey() {
  return ['/primitive'] as const
}
