import { useQuery } from '@tanstack/vue-query'
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
export function useGet(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.index.$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /
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
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetProjectsQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.projects.$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /projects
 */
export function getGetProjectsQueryKey(args: InferRequestType<typeof client.projects.$get>) {
  return ['/projects', args] as const
}
