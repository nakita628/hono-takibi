import { useQuery } from '@tanstack/vue-query'
import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/openapi-number'

/**
 * GET /number
 *
 * zod number
 *
 * zod number
 */
export function useGetNumber(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetNumberQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.number.$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /number
 */
export function getGetNumberQueryKey() {
  return ['/number'] as const
}
