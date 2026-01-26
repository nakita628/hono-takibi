import { queryOptions, useQuery } from '@tanstack/vue-query'
import type { ClientRequestOptions, InferResponseType } from 'hono/client'
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
          init: { ...clientOptions?.init, signal },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /passthrough
 */
export function getGetPassthroughQueryKey() {
  return ['/passthrough'] as const
}

/**
 * Returns Vue Query query options for GET /passthrough
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetPassthroughQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetPassthroughQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client.passthrough.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })
