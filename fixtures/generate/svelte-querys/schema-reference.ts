import { createQuery } from '@tanstack/svelte-query'
import type { QueryClient, CreateQueryOptions } from '@tanstack/svelte-query'
import type { InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/schema-reference'

/**
 * GET /example
 *
 * Sample Endpoint
 */
export function createGetExample(
  options?: {
    query?: CreateQueryOptions<InferResponseType<typeof client.example.$get>, Error>
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetExampleQueryKey()
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.example.$get(undefined, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /example
 */
export function getGetExampleQueryKey() {
  return ['/example'] as const
}
