import { useQuery } from '@tanstack/vue-query'
import type { UseQueryOptions } from '@tanstack/vue-query'
import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/openapi-string'

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
  return useQuery({ ...getGetStringQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query cache key for GET /string
 * Uses $url() for type-safe key generation
 */
export function getGetStringQueryKey() {
  return [client.string.$url().pathname] as const
}

/**
 * Returns Vue Query query options for GET /string
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetStringQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetStringQueryKey(),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.string.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})
