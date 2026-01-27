import { useQuery } from '@tanstack/react-query'
import type { UseQueryOptions, QueryFunctionContext } from '@tanstack/react-query'
import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/openapi-literal'

/**
 * Generates TanStack Query cache key for GET /primitive
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetPrimitiveQueryKey() {
  return ['primitive', '/primitive'] as const
}

/**
 * Returns TanStack Query query options for GET /primitive
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetPrimitiveQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetPrimitiveQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.primitive.$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /primitive
 *
 * zod primitive
 *
 * zod primitive
 */
export function useGetPrimitive(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.primitive.$get>>>>>,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetPrimitiveQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}
