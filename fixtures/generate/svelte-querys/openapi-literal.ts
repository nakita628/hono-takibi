import { createQuery } from '@tanstack/svelte-query'
import type { CreateQueryOptions, QueryFunctionContext } from '@tanstack/svelte-query'
import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/openapi-literal'

/**
 * Generates Svelte Query cache key for GET /primitive
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetPrimitiveQueryKey() {
  return ['primitive', 'GET', '/primitive'] as const
}

/**
 * Returns Svelte Query query options for GET /primitive
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetPrimitiveQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetPrimitiveQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.primitive.$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /primitive
 *
 * zod primitive
 *
 * zod primitive
 */
export function createGetPrimitive(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.primitive.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetPrimitiveQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}
