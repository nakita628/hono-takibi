import type { QueryClient, UseQueryOptions } from '@tanstack/vue-query'
import { useQuery } from '@tanstack/vue-query'
import type { ClientRequestOptions, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/openapi-string'

/**
 * GET /string
 *
 * zod string
 *
 * zod string
 */
export function useGetString(
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.string.$get>, Error>,
      'queryKey' | 'queryFn'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetStringQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.string.$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Vue Query cache key for GET /string
 */
export function getGetStringQueryKey() {
  return ['/string'] as const
}
