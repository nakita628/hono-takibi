import type { ClientRequestOptions, InferRequestType, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import type { Key, SWRConfiguration } from 'swr'
import useSWR from 'swr'
import { client } from '../clients/sample-geojson'

/**
 * GET /
 *
 * Ping endpoint
 *
 * This endpoint is used to check if the server is working properly.
 */
export function useGet(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.index.$get(undefined, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /
 */
export function getGetKey() {
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetProjectsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.projects.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /projects
 */
export function getGetProjectsKey(args?: InferRequestType<typeof client.projects.$get>) {
  return ['/projects', ...(args ? [args] : [])] as const
}
