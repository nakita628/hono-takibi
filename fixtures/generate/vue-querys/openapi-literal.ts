import { useQuery } from '@tanstack/vue-query'
import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/openapi-literal'

/**
 * GET /primitive
 *
 * zod primitive
 *
 * zod primitive
 */
export function useGetPrimitive(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetPrimitiveQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.primitive.$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /primitive
 */
export function getGetPrimitiveQueryKey() {
  return ['/primitive'] as const
}
