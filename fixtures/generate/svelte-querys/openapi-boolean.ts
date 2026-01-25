import { createQuery } from '@tanstack/svelte-query'
import type { InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/openapi-boolean'

/**
 * GET /boolean
 *
 * zod boolean
 *
 * zod boolean
 */
export function createGetBoolean(options?: {
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
      | InferResponseType<typeof client.boolean.$get>
      | (() => InferResponseType<typeof client.boolean.$get>)
    initialData?:
      | InferResponseType<typeof client.boolean.$get>
      | (() => InferResponseType<typeof client.boolean.$get>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetBooleanQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.boolean.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /boolean
 */
export function getGetBooleanQueryKey() {
  return ['/boolean'] as const
}

/**
 * Returns Svelte Query query options for GET /boolean
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetBooleanQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetBooleanQueryKey(),
    queryFn: async () => parseResponse(client.boolean.$get(undefined, clientOptions)),
  }
}
