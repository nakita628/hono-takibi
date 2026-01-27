import { useQuery } from '@tanstack/react-query'
import type { UseQueryOptions } from '@tanstack/react-query'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/sample-geojson'

/**
 * GET /
 *
 * Ping endpoint
 *
 * This endpoint is used to check if the server is working properly.
 */
export function useGet(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.index.$get>>>>>,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /
 * Uses $url() for type-safe key generation
 */
export function getGetQueryKey() {
  return [client.index.$url().pathname] as const
}

/**
 * Returns TanStack Query query options for GET /
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetQueryKey(),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.index.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

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
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.projects.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetProjectsQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /projects
 * Uses $url() for type-safe key generation
 */
export function getGetProjectsQueryKey(args: InferRequestType<typeof client.projects.$get>) {
  return [client.projects.$url(args).pathname] as const
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
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.projects.$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})
