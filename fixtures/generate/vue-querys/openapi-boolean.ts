import { useQuery } from '@tanstack/vue-query'
import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/openapi-boolean'

/**
 * GET /boolean
 *
 * zod boolean
 *
 * zod boolean
 */
export function useGetBoolean(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetBooleanQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.boolean.$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /boolean
 */
export function getGetBooleanQueryKey() {
  return ['/boolean'] as const
}
