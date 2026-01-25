import { useQuery } from '@tanstack/vue-query'
import type { InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/openapi-literal'

/**
 * GET /primitive
 *
 * zod primitive
 *
 * zod primitive
 */
export function useGetPrimitive(options?: {
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
    placeholderData?:
      | InferResponseType<typeof client.primitive.$get>
      | (() => InferResponseType<typeof client.primitive.$get>)
    initialData?:
      | InferResponseType<typeof client.primitive.$get>
      | (() => InferResponseType<typeof client.primitive.$get>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetPrimitiveQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.primitive.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /primitive
 */
export function getGetPrimitiveQueryKey() {
  return ['/primitive'] as const
}

/**
 * Returns Vue Query query options for GET /primitive
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetPrimitiveQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetPrimitiveQueryKey(),
    queryFn: async () => parseResponse(client.primitive.$get(undefined, clientOptions)),
  }
}
