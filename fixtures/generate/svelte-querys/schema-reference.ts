import type { CreateQueryOptions, QueryFunctionContext } from '@tanstack/svelte-query'
import { createQuery } from '@tanstack/svelte-query'
import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/schema-reference'

/**
 * Generates Svelte Query cache key for GET /example
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetExampleQueryKey() {
  return ['example', 'GET', '/example'] as const
}

/**
 * Returns Svelte Query query options for GET /example
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetExampleQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetExampleQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.example.$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /example
 *
 * Sample Endpoint
 */
export function createGetExample(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.example.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetExampleQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}
