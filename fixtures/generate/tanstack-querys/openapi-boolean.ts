import type { QueryClient, UseQueryOptions } from '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query'
import type { ClientRequestOptions, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/openapi-boolean'

/**
 * GET /boolean
 *
 * zod boolean
 *
 * zod boolean
 */
export function useGetBoolean(
  options?: {
    query?: UseQueryOptions<
      InferResponseType<typeof client.boolean.$get>,
      Error,
      InferResponseType<typeof client.boolean.$get>,
      readonly ['/boolean']
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetBooleanQueryKey()
  const query = useQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.boolean.$get(undefined, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /boolean
 */
export function getGetBooleanQueryKey() {
  return ['/boolean'] as const
}
