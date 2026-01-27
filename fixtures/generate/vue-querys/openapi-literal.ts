import { useQuery } from '@tanstack/vue-query'
import type { UseQueryOptions } from '@tanstack/vue-query'
import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/openapi-literal'

/**
 * GET /primitive
 *
 * zod primitive
 *
 * zod primitive
 */
export function useGetPrimitive(options?: {
  query?: Partial<
    Omit<
      UseQueryOptions<
        Awaited<
          ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.primitive.$get>>>>
        >,
        Error
      >,
      'queryKey' | 'queryFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetPrimitiveQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query cache key for GET /primitive
 * Uses $url() for type-safe key generation
 */
export function getGetPrimitiveQueryKey() {
  return [client.primitive.$url().pathname] as const
}

/**
 * Returns Vue Query query options for GET /primitive
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetPrimitiveQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetPrimitiveQueryKey(),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.primitive.$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})
