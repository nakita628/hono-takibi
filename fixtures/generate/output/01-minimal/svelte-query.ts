import { createQuery, queryOptions } from '@tanstack/svelte-query'
import type { CreateQueryOptions, QueryFunctionContext } from '@tanstack/svelte-query'
import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from './client'

/**
 * Generates Svelte Query cache key for GET /health
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetHealthQueryKey() {
  return ['health', 'GET', '/health'] as const
}

/**
 * GET /health
 */
export async function getHealth(options?: ClientRequestOptions) {
  return await parseResponse(client.health.$get(undefined, options))
}

/**
 * Returns Svelte Query query options for GET /health
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetHealthQueryOptions(clientOptions?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getGetHealthQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getHealth({ ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

/**
 * GET /health
 */
export function createGetHealth(
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getHealth>>, Error>
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    return { ...getGetHealthQueryOptions(opts?.client), ...opts?.query }
  })
}
