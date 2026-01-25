import { createQuery } from '@tanstack/svelte-query'
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
export function createGetNumber(options?: {
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
  return createQuery({
    queryKey: getGetNumberQueryKey(),
    queryFn: async () => parseResponse(client.number.$get(undefined, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /number
 */
export function getGetNumberQueryKey() {
  return ['/number'] as const
}

/**
 * Returns Svelte Query query options for GET /number
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetNumberQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetNumberQueryKey(),
    queryFn: async () => parseResponse(client.number.$get(undefined, clientOptions)),
  }
}
