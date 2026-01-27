import { createQuery } from '@tanstack/svelte-query'
import type { CreateQueryOptions } from '@tanstack/svelte-query'
import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/openapi-nullable'

/**
 * GET /nullable
 *
 * zod nullable
 *
 * zod nullable
 */
export function createGetNullable(options?: {
  query?: CreateQueryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.nullable.$get>>>>>,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery(() => ({ ...getGetNullableQueryOptions(clientOptions), ...queryOptions }))
}

/**
 * Generates Svelte Query cache key for GET /nullable
 * Uses $url() for type-safe key generation
 */
export function getGetNullableQueryKey() {
  return [client.nullable.$url().pathname] as const
}

/**
 * Returns Svelte Query query options for GET /nullable
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetNullableQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetNullableQueryKey(),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.nullable.$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})
