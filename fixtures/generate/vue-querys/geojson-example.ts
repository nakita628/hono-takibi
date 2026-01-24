import { useQuery } from '@tanstack/vue-query'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/geojson-example'

/**
 * GET /
 *
 * Ping endpoint
 *
 * This endpoint is used to check if the server is working.
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
 * Get the site associated with a given lot number
 *
 * Update the content of an existing post identified by its unique ID.
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
