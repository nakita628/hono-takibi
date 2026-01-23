import { useQuery } from '@tanstack/vue-query'
import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/complex-schema-reference'

/**
 * GET /test
 *
 * Test endpoint for comprehensive schema references
 */
export function useGetTest(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetTestQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.test.$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /test
 */
export function getGetTestQueryKey() {
  return ['/test'] as const
}
