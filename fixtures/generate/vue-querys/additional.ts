import type { QueryFunctionContext, UseQueryOptions } from '@tanstack/vue-query'
import { useQuery } from '@tanstack/vue-query'
import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import type { MaybeRef } from 'vue'
import { unref } from 'vue'
import { client } from '../clients/additional'

/**
 * Generates Vue Query cache key for GET /passthrough
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetPassthroughQueryKey() {
  return ['passthrough', 'GET', '/passthrough'] as const
}

/**
 * Returns Vue Query query options for GET /passthrough
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetPassthroughQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetPassthroughQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.passthrough.$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /passthrough
 *
 * zod passthrough
 *
 * zod passthrough
 */
export function useGetPassthrough(options?: {
  query?: Partial<
    Omit<
      UseQueryOptions<
        Awaited<
          ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.passthrough.$get>>>>
        >,
        Error
      >,
      'queryKey' | 'queryFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetPassthroughQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}
