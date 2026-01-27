import { createQuery } from '@tanstack/svelte-query'
import type { CreateQueryOptions } from '@tanstack/svelte-query'
import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/abcde'

/**
 * GET /example
 *
 * Get example data
 */
export function createGetExample(options?: {
  query?: CreateQueryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.example.$get>>>>>,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery(() => ({ ...getGetExampleQueryOptions(clientOptions), ...queryOptions }))
}

/**
 * Generates Svelte Query cache key for GET /example
 * Uses $url() for type-safe key generation
 */
export function getGetExampleQueryKey() {
  return [client.example.$url().pathname] as const
}

/**
 * Returns Svelte Query query options for GET /example
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
