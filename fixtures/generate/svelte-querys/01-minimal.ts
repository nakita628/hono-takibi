import { createQuery } from '@tanstack/svelte-query'
import type { CreateQueryOptions } from '@tanstack/svelte-query'
import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/01-minimal'

/**
 * GET /health
 */
export function createGetHealth(options?: {
  query?: CreateQueryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.health.$get>>>>>,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery(() => ({ ...getGetHealthQueryOptions(clientOptions), ...queryOptions }))
}

/**
 * Generates Svelte Query cache key for GET /health
 * Uses $url() for type-safe key generation
 */
export function getGetHealthQueryKey() {
  return [client.health.$url().pathname] as const
}

/**
 * Returns Svelte Query query options for GET /health
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetHealthQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetHealthQueryKey(),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.health.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})
