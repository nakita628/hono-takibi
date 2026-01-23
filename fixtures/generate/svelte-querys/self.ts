import type { CreateQueryOptions, QueryClient } from '@tanstack/svelte-query'
import { createQuery } from '@tanstack/svelte-query'
import type { ClientRequestOptions, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/self'

/**
 * GET /categories
 */
export function createGetCategories(
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<typeof client.categories.$get>,
      Error,
      InferResponseType<typeof client.categories.$get>,
      readonly ['/categories']
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetCategoriesQueryKey()
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.categories.$get(undefined, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /categories
 */
export function getGetCategoriesQueryKey() {
  return ['/categories'] as const
}
