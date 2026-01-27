import { useQuery } from '@tanstack/vue-query'
import type { UseQueryOptions } from '@tanstack/vue-query'
import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/additional'

/**
 * GET /passthrough
 *
 * zod passthrough
 *
 * zod passthrough
 */
export function useGetPassthrough(options?: {
  query?: Partial<
    Omit<
      UseQueryOptions<
        Awaited<
          ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.passthrough.$get>>>>
        >,
        Error
      >,
      'queryKey' | 'queryFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetPassthroughQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query cache key for GET /passthrough
 * Uses $url() for type-safe key generation
 */
export function getGetPassthroughQueryKey() {
  return [client.passthrough.$url().pathname] as const
}

/**
 * Returns Vue Query query options for GET /passthrough
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetPassthroughQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetPassthroughQueryKey(),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.passthrough.$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})
