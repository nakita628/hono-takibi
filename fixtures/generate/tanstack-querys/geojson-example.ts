import { useQuery } from '@tanstack/react-query'
import type { UseQueryOptions, QueryFunctionContext } from '@tanstack/react-query'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/geojson-example'

/**
 * Generates TanStack Query cache key for GET /
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetQueryKey() {
  return ['', '/'] as const
}

/**
 * Returns TanStack Query query options for GET /
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.index.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /
 *
 * Ping endpoint
 *
 * This endpoint is used to check if the server is working.
 */
export function useGet(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.index.$get>>>>>,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query cache key for GET /projects
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetProjectsQueryKey(args: InferRequestType<typeof client.projects.$get>) {
  return ['projects', '/projects', args] as const
}

/**
 * Returns TanStack Query query options for GET /projects
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetProjectsQueryOptions = (
  args: InferRequestType<typeof client.projects.$get>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetProjectsQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.projects.$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /projects
 *
 * Get the site associated with a given lot number
 *
 * Update the content of an existing post identified by its unique ID.
 */
export function useGetProjects(
  args: InferRequestType<typeof client.projects.$get>,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.projects.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetProjectsQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}
