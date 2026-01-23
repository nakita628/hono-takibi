import { useQuery } from '@tanstack/vue-query'
import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/openapi-array'

/**
 * GET /array
 *
 * zod array
 *
 * zod array
 */
export function useGetArray(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetArrayQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.array.$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /array
 */
export function getGetArrayQueryKey() {
  return ['/array'] as const
}
