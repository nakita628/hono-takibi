import { createQuery } from '@tanstack/svelte-query'
import type { CreateQueryOptions } from '@tanstack/svelte-query'
import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/openapi-boolean'

/**
 * GET /boolean
 *
 * zod boolean
 *
 * zod boolean
 */
export function createGetBoolean(options?: {
  query?: CreateQueryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.boolean.$get>>>>>,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery(() => ({ ...getGetBooleanQueryOptions(clientOptions), ...queryOptions }))
}

/**
 * Generates Svelte Query cache key for GET /boolean
 * Uses $url() for type-safe key generation
 */
export function getGetBooleanQueryKey() {
  return [client.boolean.$url().pathname] as const
}

/**
 * Returns Svelte Query query options for GET /boolean
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetBooleanQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetBooleanQueryKey(),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.boolean.$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})
