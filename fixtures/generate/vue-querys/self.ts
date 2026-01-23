import { useQuery } from '@tanstack/vue-query'
import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/self'

/**
 * GET /categories
 */
export function useGetCategories(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetCategoriesQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.categories.$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /categories
 */
export function getGetCategoriesQueryKey() {
  return ['/categories'] as const
}
