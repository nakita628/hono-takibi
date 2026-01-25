import { createQuery } from '@tanstack/svelte-query'
import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/schema-reference'

/**
 * GET /example
 *
 * Sample Endpoint
 */
export function createGetExample(options?: {
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
    queryKey: getGetExampleQueryKey(),
    queryFn: async () => parseResponse(client.example.$get(undefined, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /example
 */
export function getGetExampleQueryKey() {
  return ['/example'] as const
}

/**
 * Returns Svelte Query query options for GET /example
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetExampleQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetExampleQueryKey(),
    queryFn: async () => parseResponse(client.example.$get(undefined, clientOptions)),
  }
}
