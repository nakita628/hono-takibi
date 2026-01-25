import { useQuery } from '@tanstack/vue-query'
import type { InferResponseType, ClientRequestOptions } from 'hono/client'
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
    placeholderData?:
      | InferResponseType<typeof client.array.$get>
      | (() => InferResponseType<typeof client.array.$get>)
    initialData?:
      | InferResponseType<typeof client.array.$get>
      | (() => InferResponseType<typeof client.array.$get>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetArrayQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.array.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
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
export function getGetArrayQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetArrayQueryKey(),
    queryFn: async () => parseResponse(client.array.$get(undefined, clientOptions)),
  }
}
