import { createQuery, queryOptions } from '@tanstack/svelte-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/geojson-example'

/**
 * GET /
 *
 * Ping endpoint
 *
 * This endpoint is used to check if the server is working.
 */
export function createGet(options?: {
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
  return createQuery(() => ({ ...getGetQueryOptions(clientOptions), ...queryOptions }))
}

/**
 * Generates Svelte Query cache key for GET /
 */
export function getGetQueryKey() {
  return ['/'] as const
}

/**
 * Returns Svelte Query query options for GET /
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client.index.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * GET /projects
 *
 * Get the site associated with a given lot number
 *
 * Update the content of an existing post identified by its unique ID.
 */
export function createGetProjects(
  args: InferRequestType<typeof client.projects.$get>,
  options?: {
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
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery(() => ({
    ...getGetProjectsQueryOptions(args, clientOptions),
    ...queryOptions,
  }))
}

/**
 * Generates Svelte Query cache key for GET /projects
 */
export function getGetProjectsQueryKey(args: InferRequestType<typeof client.projects.$get>) {
  return ['/projects', args] as const
}

/**
 * Returns Svelte Query query options for GET /projects
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetProjectsQueryOptions = (
  args: InferRequestType<typeof client.projects.$get>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetProjectsQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.projects.$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
      ),
  })
