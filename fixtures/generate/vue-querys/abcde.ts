import { useQuery } from '@tanstack/vue-query'
import type { UseQueryOptions, QueryFunctionContext } from '@tanstack/vue-query'
import { unref } from 'vue'
import type { MaybeRef } from 'vue'
import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/abcde'

/**
 * Generates Vue Query cache key for GET /example
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetExampleQueryKey() {
  return ['example', 'GET', '/example'] as const
}

/**
 * Returns Vue Query query options for GET /example
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetExampleQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetExampleQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.example.$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /example
 *
 * Get example data
 */
export function useGetExample(options?: {
  query?: Partial<
    Omit<
      UseQueryOptions<
        Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.example.$get>>>>>,
        Error
      >,
      'queryKey' | 'queryFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetExampleQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}
