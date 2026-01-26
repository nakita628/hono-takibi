import { useQuery, queryOptions } from '@tanstack/vue-query'
import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/openapi-complex-array'

/**
 * GET /array
 *
 * zod array
 *
 * zod array
 */
export function useGetArray(options?: {
  query?: {
    enabled?: boolean
    staleTime?: number
    gcTime?: number
    refetchInterval?: number | false
    refetchOnWindowFocus?: boolean
    refetchOnMount?: boolean
    refetchOnReconnect?: boolean
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetArrayQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query cache key for GET /array
 */
export function getGetArrayQueryKey() {
  return ['/array'] as const
}

/**
 * Returns Vue Query query options for GET /array
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetArrayQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetArrayQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client.array.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })
