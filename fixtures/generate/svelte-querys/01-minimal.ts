import { createQuery } from '@tanstack/svelte-query'
import type { QueryClient, CreateQueryOptions } from '@tanstack/svelte-query'
import type { InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/01-minimal'

/**
 * GET /health
 */
export function createGetHealth(
  options?: {
    query?: CreateQueryOptions<InferResponseType<typeof client.health.$get>, Error>
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetHealthQueryKey()
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.health.$get(undefined, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /health
 */
export function getGetHealthQueryKey() {
  return ['/health'] as const
}
