import { createQuery } from '@tanstack/svelte-query'
import type { CreateQueryOptions, QueryFunctionContext } from '@tanstack/svelte-query'
import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/complex-schema-reference'

/**
 * Generates Svelte Query cache key for GET /test
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetTestQueryKey() {
  return ['test', '/test'] as const
}

/**
 * Returns Svelte Query query options for GET /test
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetTestQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetTestQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.test.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /test
 *
 * Test endpoint for comprehensive schema references
 */
export function createGetTest(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.test.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetTestQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}
