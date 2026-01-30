import { createQuery } from '@tanstack/svelte-query'
import type { CreateQueryOptions, QueryFunctionContext } from '@tanstack/svelte-query'
import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/openapi-string'

/**
 * Generates Svelte Query cache key for GET /string
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetStringQueryKey() {
  return ['string', 'GET', '/string'] as const
}

/**
 * Returns Svelte Query query options for GET /string
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetStringQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetStringQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.string.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /string
 *
 * zod string
 *
 * zod string
 */
export function createGetString(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.string.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetStringQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}
