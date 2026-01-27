import { useQuery } from '@tanstack/vue-query'
import type { UseQueryOptions, QueryFunctionContext } from '@tanstack/vue-query'
import { unref } from 'vue'
import type { MaybeRef } from 'vue'
import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/openapi-number'

/**
 * Generates Vue Query cache key for GET /number
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetNumberQueryKey() {
  return ['number', 'GET', '/number'] as const
}

/**
 * Returns Vue Query query options for GET /number
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetNumberQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetNumberQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.number.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /number
 *
 * zod number
 *
 * zod number
 */
export function useGetNumber(options?: {
  query?: Partial<
    Omit<
      UseQueryOptions<
        Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.number.$get>>>>>,
        Error
      >,
      'queryKey' | 'queryFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetNumberQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}
