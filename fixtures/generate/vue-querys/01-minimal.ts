import { useQuery } from '@tanstack/vue-query'
import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/01-minimal'

/**
 * GET /health
 */
export function useGetHealth(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetHealthQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.health.$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /health
 */
export function getGetHealthQueryKey() {
  return ['/health'] as const
}
