import { useQuery } from '@tanstack/vue-query'
import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/example'

/**
 * GET /sample
 *
 * Returns a payload exercising every custom format, constraint, and nullable case
 */
export function useGetSample(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetSampleQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.sample.$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /sample
 */
export function getGetSampleQueryKey() {
  return ['/sample'] as const
}
