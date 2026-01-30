import { createQuery } from '@tanstack/svelte-query'
import type { CreateQueryOptions, QueryFunctionContext } from '@tanstack/svelte-query'
import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/additional'

/**
 * Generates Svelte Query cache key for GET /passthrough
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetPassthroughQueryKey() {
  return ['passthrough', 'GET', '/passthrough'] as const
}

/**
 * Returns Svelte Query query options for GET /passthrough
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetPassthroughQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetPassthroughQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.passthrough.$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /passthrough
 *
 * zod passthrough
 *
 * zod passthrough
 */
export function createGetPassthrough(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.passthrough.$get>>>>
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetPassthroughQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}
