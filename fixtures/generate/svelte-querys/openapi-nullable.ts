import type { CreateQueryOptions, QueryFunctionContext } from '@tanstack/svelte-query'
import { createQuery } from '@tanstack/svelte-query'
import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/openapi-nullable'

/**
 * Generates Svelte Query cache key for GET /nullable
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetNullableQueryKey() {
  return ['nullable', 'GET', '/nullable'] as const
}

/**
 * Returns Svelte Query query options for GET /nullable
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetNullableQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetNullableQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.nullable.$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /nullable
 *
 * zod nullable
 *
 * zod nullable
 */
export function createGetNullable(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.nullable.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetNullableQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}
