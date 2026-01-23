import type { QueryClient, UseQueryOptions } from '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/sample-geojson'

/**
 * GET /
 *
 * Ping endpoint
 *
 * This endpoint is used to check if the server is working properly.
 */
export function useGet(
  options?: {
    query?: UseQueryOptions<
      InferResponseType<typeof client.index.$get>,
      Error,
      InferResponseType<typeof client.index.$get>,
      readonly ['/']
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetQueryKey()
  const query = useQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.index.$get(undefined, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /
 */
export function getGetQueryKey() {
  return ['/'] as const
}

/**
 * GET /projects
 *
 * Get projects related to a given chiban
 *
 * Get projects related to a given chiban
 */
export function useGetProjects(
  args: InferRequestType<typeof client.projects.$get>,
  options?: {
    query?: UseQueryOptions<
      InferResponseType<typeof client.projects.$get>,
      Error,
      InferResponseType<typeof client.projects.$get>,
      readonly ['/projects', InferRequestType<typeof client.projects.$get>]
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetProjectsQueryKey(args)
  const query = useQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.projects.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /projects
 */
export function getGetProjectsQueryKey(args: InferRequestType<typeof client.projects.$get>) {
  return ['/projects', args] as const
}
