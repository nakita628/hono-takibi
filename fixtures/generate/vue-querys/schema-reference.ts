import { useQuery } from '@tanstack/vue-query'
import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/schema-reference'

/**
 * GET /example
 *
 * Sample Endpoint
 */
export function useGetExample(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetExampleQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.example.$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /example
 */
export function getGetExampleQueryKey() {
  return ['/example'] as const
}
