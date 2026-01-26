import { createQuery, queryOptions } from '@tanstack/svelte-query'
import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/openapi-literal'

/**
 * GET /primitive
 *
 * zod primitive
 *
 * zod primitive
 */
export function createGetPrimitive(options?: {
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
  return createQuery({ ...getGetPrimitiveQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Svelte Query cache key for GET /primitive
 */
export function getGetPrimitiveQueryKey() {
  return ['/primitive'] as const
}

/**
 * Returns Svelte Query query options for GET /primitive
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetPrimitiveQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetPrimitiveQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client.primitive.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })
