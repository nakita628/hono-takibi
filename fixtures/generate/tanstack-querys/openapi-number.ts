import { useQuery } from '@tanstack/react-query'
import type { UseQueryOptions } from '@tanstack/react-query'
import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/openapi-number'

/**
 * GET /number
 *
 * zod number
 *
 * zod number
 */
export function useGetNumber(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.number.$get>>>>>,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetNumberQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /number
 * Uses $url() for type-safe key generation
 */
export function getGetNumberQueryKey() {
  return [client.number.$url().pathname] as const
}

/**
 * Returns TanStack Query query options for GET /number
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetNumberQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetNumberQueryKey(),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.number.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})
