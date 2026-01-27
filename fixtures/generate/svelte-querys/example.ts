import { createQuery } from '@tanstack/svelte-query'
import type { CreateQueryOptions } from '@tanstack/svelte-query'
import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/example'

/**
 * GET /sample
 *
 * Returns a payload exercising every custom format, constraint, and nullable case
 */
export function createGetSample(options?: {
  query?: CreateQueryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.sample.$get>>>>>,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery(() => ({ ...getGetSampleQueryOptions(clientOptions), ...queryOptions }))
}

/**
 * Generates Svelte Query cache key for GET /sample
 * Uses $url() for type-safe key generation
 */
export function getGetSampleQueryKey() {
  return [client.sample.$url().pathname] as const
}

/**
 * Returns Svelte Query query options for GET /sample
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetSampleQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetSampleQueryKey(),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.sample.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})
