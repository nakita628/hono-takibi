import { createQuery } from '@tanstack/svelte-query'
import type { QueryClient, CreateQueryOptions } from '@tanstack/svelte-query'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/sample-geojson'

/**
 * GET /
 *
 * Ping endpoint
 *
 * This endpoint is used to check if the server is working properly.
 */
export function createGet(
  options?: {
    query?: CreateQueryOptions<
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
  const query = createQuery(
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
 * Generates Svelte Query cache key for GET /
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
export function createGetProjects(
  args: InferRequestType<typeof client.projects.$get>,
  options?: {
    query?: CreateQueryOptions<
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
  const query = createQuery(
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
 * Generates Svelte Query cache key for GET /projects
 */
export function getGetProjectsQueryKey(args: InferRequestType<typeof client.projects.$get>) {
  return ['/projects', args] as const
}
