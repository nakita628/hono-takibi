import { useQuery } from '@tanstack/react-query'
import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/openapi-array'

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
  return useQuery({
    queryKey: getGetArrayQueryKey(),
    queryFn: async () => parseResponse(client.array.$get(undefined, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /array
 */
export function getGetArrayQueryKey() {
  return ['/array'] as const
}

/**
 * Returns TanStack Query query options for GET /array
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetArrayQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetArrayQueryKey(),
    queryFn: async () => parseResponse(client.array.$get(undefined, clientOptions)),
  }
}
