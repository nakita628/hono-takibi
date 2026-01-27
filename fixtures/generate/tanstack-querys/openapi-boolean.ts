import { useQuery } from '@tanstack/react-query'
import type { UseQueryOptions, QueryFunctionContext } from '@tanstack/react-query'
import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/openapi-boolean'

/**
 * Generates TanStack Query cache key for GET /boolean
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetBooleanQueryKey() {
  return ['boolean', 'GET', '/boolean'] as const
}

/**
 * Returns TanStack Query query options for GET /boolean
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetBooleanQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetBooleanQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.boolean.$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /boolean
 *
 * zod boolean
 *
 * zod boolean
 */
export function useGetBoolean(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.boolean.$get>>>>>,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetBooleanQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}
