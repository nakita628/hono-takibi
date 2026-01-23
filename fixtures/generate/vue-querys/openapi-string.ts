import { useQuery } from '@tanstack/vue-query'
import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/openapi-string'

/**
 * GET /string
 *
 * zod string
 *
 * zod string
 */
export function useGetString(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetStringQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.string.$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /string
 */
export function getGetStringQueryKey() {
  return ['/string'] as const
}
