import { useQuery } from '@tanstack/vue-query'
import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/openapi-nullable'

/**
 * GET /nullable
 *
 * zod nullable
 *
 * zod nullable
 */
export function useGetNullable(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetNullableQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.nullable.$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /nullable
 */
export function getGetNullableQueryKey() {
  return ['/nullable'] as const
}
