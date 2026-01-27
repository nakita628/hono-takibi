import { useQuery } from '@tanstack/vue-query'
import type { UseQueryOptions } from '@tanstack/vue-query'
import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/openapi-array'

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
  return useQuery({ ...getGetArrayQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query cache key for GET /array
 * Uses $url() for type-safe key generation
 */
export function getGetArrayQueryKey() {
  return [client.array.$url().pathname] as const
}

/**
 * Returns Vue Query query options for GET /array
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetArrayQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetArrayQueryKey(),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.array.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})
