import { createQuery } from '@tanstack/svelte-query'
import type { CreateQueryOptions } from '@tanstack/svelte-query'
import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/complex-schema-reference'

/**
 * GET /test
 *
 * Test endpoint for comprehensive schema references
 */
export function createGetTest(options?: {
  query?: CreateQueryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.test.$get>>>>>,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery(() => ({ ...getGetTestQueryOptions(clientOptions), ...queryOptions }))
}

/**
 * Generates Svelte Query cache key for GET /test
 * Uses $url() for type-safe key generation
 */
export function getGetTestQueryKey() {
  return [client.test.$url().pathname] as const
}

/**
 * Returns Svelte Query query options for GET /test
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetTestQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetTestQueryKey(),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.test.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})
