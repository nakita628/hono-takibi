import type { ClientRequestOptions, InferRequestType, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import type { SWRConfiguration } from 'swr'
import useSWR from 'swr'
import { client } from '../clients/geojson-example'

/**
 * GET /
 *
 * Ping endpoint
 *
 * This endpoint is used to check if the server is working.
 */
export function useGet(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.index.$get>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/'] as const) : null
  return useSWR<InferResponseType<typeof client.index.$get>, Error>(
    key,
    async () => parseResponse(client.index.$get(undefined, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /
 */
export function getGetKey() {
  return ['GET', '/'] as const
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
  options?: {
    swr?: SWRConfiguration<InferResponseType<typeof client.projects.$get>, Error>
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key = options?.enabled !== false ? (['GET', '/projects', args] as const) : null
  return useSWR<InferResponseType<typeof client.projects.$get>, Error>(
    key,
    async () => parseResponse(client.projects.$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /projects
 */
export function getGetProjectsKey(args: InferRequestType<typeof client.projects.$get>) {
  return ['GET', '/projects', args] as const
}
