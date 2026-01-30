import { useQuery } from '@tanstack/react-query'
import type { UseQueryOptions, QueryFunctionContext } from '@tanstack/react-query'
import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/openapi-string'

/**
 * Generates TanStack Query cache key for GET /string
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetStringQueryKey() {
  return ['string', 'GET', '/string'] as const
}

/**
 * Returns TanStack Query query options for GET /string
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
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.string.$get>>>>>,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetStringQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}
