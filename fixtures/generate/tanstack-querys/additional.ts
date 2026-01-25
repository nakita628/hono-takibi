import { useQuery } from '@tanstack/react-query'
import type { InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/additional'

/**
 * GET /passthrough
 *
 * zod passthrough
 *
 * zod passthrough
 */
export function useGetPassthrough(options?: {
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
      | InferResponseType<typeof client.passthrough.$get>
      | (() => InferResponseType<typeof client.passthrough.$get>)
    initialData?:
      | InferResponseType<typeof client.passthrough.$get>
      | (() => InferResponseType<typeof client.passthrough.$get>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetPassthroughQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.passthrough.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /passthrough
 */
export function getGetPassthroughQueryKey() {
  return ['/passthrough'] as const
}

/**
 * Returns TanStack Query query options for GET /passthrough
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetPassthroughQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetPassthroughQueryKey(),
    queryFn: async () => parseResponse(client.passthrough.$get(undefined, clientOptions)),
  }
}
