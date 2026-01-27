import { createQuery } from '@tanstack/svelte-query'
import type { CreateQueryOptions } from '@tanstack/svelte-query'
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
export function createGetNumber(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.number.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { queryKey, queryFn, ...baseOptions } = getGetNumberQueryOptions(options?.()?.client)
    return { ...baseOptions, ...options?.()?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /number
 * Uses $url() for type-safe key generation
 */
export function getGetNumberQueryKey() {
  return [client.number.$url().pathname] as const
}

/**
 * Returns Svelte Query query options for GET /number
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
