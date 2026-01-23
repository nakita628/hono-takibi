import type { QueryClient, UseQueryOptions } from '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query'
import type { ClientRequestOptions, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/additional'

/**
 * GET /passthrough
 *
 * zod passthrough
 *
 * zod passthrough
 */
export function useGetPassthrough(
  options?: {
    query?: UseQueryOptions<
      InferResponseType<typeof client.passthrough.$get>,
      Error,
      InferResponseType<typeof client.passthrough.$get>,
      readonly ['/passthrough']
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetPassthroughQueryKey()
  const query = useQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.passthrough.$get(undefined, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /passthrough
 */
export function getGetPassthroughQueryKey() {
  return ['/passthrough'] as const
}
