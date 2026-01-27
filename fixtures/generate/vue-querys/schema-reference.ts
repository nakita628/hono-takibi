import { useQuery } from '@tanstack/vue-query'
import type { UseQueryOptions } from '@tanstack/vue-query'
import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/schema-reference'

/**
 * GET /example
 *
 * Sample Endpoint
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
  return useQuery({ ...getGetExampleQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query cache key for GET /example
 * Uses $url() for type-safe key generation
 */
export function getGetExampleQueryKey() {
  return [client.example.$url().pathname] as const
}

/**
 * Returns Vue Query query options for GET /example
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetExampleQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetExampleQueryKey(),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.example.$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})
