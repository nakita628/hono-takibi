import { useQuery } from '@tanstack/vue-query'
import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/openapi-number'

/**
 * GET /number
 *
 * zod number
 *
 * zod number
 */
export function useGetNumber(options?: {
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
    queryKey: getGetNumberQueryKey(),
    queryFn: async () => parseResponse(client.number.$get(undefined, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /number
 */
export function getGetNumberQueryKey() {
  return ['/number'] as const
}

/**
 * Returns Vue Query query options for GET /number
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetNumberQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetNumberQueryKey(),
    queryFn: async () => parseResponse(client.number.$get(undefined, clientOptions)),
  }
}
