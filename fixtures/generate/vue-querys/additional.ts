import { useQuery } from '@tanstack/vue-query'
import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/additional'

/**
 * GET /passthrough
 *
 * zod passthrough
 *
 * zod passthrough
 */
export function useGetPassthrough(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetPassthroughQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.passthrough.$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /passthrough
 */
export function getGetPassthroughQueryKey() {
  return ['/passthrough'] as const
}
