import { createQuery } from '@tanstack/svelte-query'
import type { CreateQueryOptions, QueryFunctionContext } from '@tanstack/svelte-query'
import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/example'

/**
 * Generates Svelte Query cache key for GET /sample
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetSampleQueryKey() {
  return ['sample', '/sample'] as const
}

/**
 * Returns Svelte Query query options for GET /sample
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetSampleQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetSampleQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.sample.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /sample
 *
 * Returns a payload exercising every custom format, constraint, and nullable case
 */
export function createGetSample(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.sample.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetSampleQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}
