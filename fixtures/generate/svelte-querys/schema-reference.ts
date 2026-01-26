import { createQuery, queryOptions } from '@tanstack/svelte-query'
import type { ClientRequestOptions, InferResponseType } from 'hono/client'
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
    placeholderData?:
      | InferResponseType<typeof client.example.$get>
      | (() => InferResponseType<typeof client.example.$get>)
    initialData?:
      | InferResponseType<typeof client.example.$get>
      | (() => InferResponseType<typeof client.example.$get>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetExampleQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.example.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
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
export const getGetExampleQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetExampleQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client.example.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })
