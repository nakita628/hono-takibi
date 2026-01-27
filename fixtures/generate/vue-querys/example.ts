import { useQuery } from '@tanstack/vue-query'
import type { UseQueryOptions, QueryFunctionContext } from '@tanstack/vue-query'
import { unref } from 'vue'
import type { MaybeRef } from 'vue'
import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/example'

/**
 * Generates Vue Query cache key for GET /sample
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetSampleQueryKey() {
  return ['sample', '/sample'] as const
}

/**
 * Returns Vue Query query options for GET /sample
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetSampleQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetSampleQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.sample.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /sample
 *
 * Returns a payload exercising every custom format, constraint, and nullable case
 */
export function useGetSample(options?: {
  query?: Partial<
    Omit<
      UseQueryOptions<
        Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.sample.$get>>>>>,
        Error
      >,
      'queryKey' | 'queryFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetSampleQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}
