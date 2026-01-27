import type { QueryFunctionContext, UseQueryOptions } from '@tanstack/vue-query'
import { useQuery } from '@tanstack/vue-query'
import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import type { MaybeRef } from 'vue'
import { unref } from 'vue'
import { client } from '../clients/openapi-string'

/**
 * Generates Vue Query cache key for GET /string
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetStringQueryKey() {
  return ['string', 'GET', '/string'] as const
}

/**
 * Returns Vue Query query options for GET /string
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetStringQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetStringQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.string.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /string
 *
 * zod string
 *
 * zod string
 */
export function useGetString(options?: {
  query?: Partial<
    Omit<
      UseQueryOptions<
        Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.string.$get>>>>>,
        Error
      >,
      'queryKey' | 'queryFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetStringQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}
