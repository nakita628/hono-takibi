import type { CreateQueryOptions, QueryFunctionContext } from '@tanstack/svelte-query'
import { createQuery } from '@tanstack/svelte-query'
import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/openapi-array'

/**
 * Generates Svelte Query cache key for GET /array
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetArrayQueryKey() {
  return ['array', 'GET', '/array'] as const
}

/**
 * Returns Svelte Query query options for GET /array
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetArrayQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetArrayQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.array.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /array
 *
 * zod array
 *
 * zod array
 */
export function createGetArray(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.array.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetArrayQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}
