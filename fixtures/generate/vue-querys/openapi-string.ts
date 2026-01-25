import { useQuery } from '@tanstack/vue-query'
import type { ClientRequestOptions, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/openapi-string'

/**
 * GET /string
 *
 * zod string
 *
 * zod string
 */
export function useGetString(options?: {
  query?: {
    enabled?: boolean
    staleTime?: number
    gcTime?: number
    refetchInterval?: number | false
    refetchOnWindowFocus?: boolean
    refetchOnMount?: boolean
    refetchOnReconnect?: boolean
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetStringQueryKey(),
    queryFn: async () => parseResponse(client.string.$get(undefined, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /string
 */
export function getGetStringQueryKey() {
  return ['/string'] as const
}
