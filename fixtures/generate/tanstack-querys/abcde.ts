import type { QueryFunctionContext, UseQueryOptions } from '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query'
import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/abcde'

/**
 * Generates TanStack Query cache key for GET /example
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetExampleQueryKey() {
  return ['example', 'GET', '/example'] as const
}

/**
 * Returns TanStack Query query options for GET /example
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
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.example.$get>>>>>,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetExampleQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}
