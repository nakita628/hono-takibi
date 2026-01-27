import { useQuery } from '@tanstack/vue-query'
import type { UseQueryOptions, QueryFunctionContext } from '@tanstack/vue-query'
import { unref } from 'vue'
import type { MaybeRef } from 'vue'
import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/openapi-array'

/**
 * Generates Vue Query cache key for GET /array
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetArrayQueryKey() {
  return ['array', '/array'] as const
}

/**
 * Returns Vue Query query options for GET /array
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetArrayQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetArrayQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.array.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /array
 *
 * zod array
 *
 * zod array
 */
export function useGetArray(options?: {
  query?: Partial<
    Omit<
      UseQueryOptions<
        Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.array.$get>>>>>,
        Error
      >,
      'queryKey' | 'queryFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetArrayQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}
