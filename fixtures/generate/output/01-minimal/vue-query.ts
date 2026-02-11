import { useQuery } from '@tanstack/vue-query'
import type { UseQueryOptions, QueryFunctionContext } from '@tanstack/vue-query'
import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from './client'

/**
 * Generates Vue Query cache key for GET /health
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetHealthQueryKey() {
  return ['health', 'GET', '/health'] as const
}

/**
 * Returns Vue Query query options for GET /health
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetHealthQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetHealthQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.health.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  }
}

/**
 * GET /health
 */
export function useGetHealth(options?: {
  query?: Partial<
    Omit<
      UseQueryOptions<
        Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.health.$get>>>>>,
        Error
      >,
      'queryKey' | 'queryFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetHealthQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}
