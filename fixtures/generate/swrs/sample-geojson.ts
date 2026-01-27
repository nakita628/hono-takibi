import useSWR from 'swr'
import type { Key, SWRConfiguration } from 'swr'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/sample-geojson'

/**
 * Generates SWR cache key for GET /
 * Returns structured key [path] for filter-based invalidation
 */
export function getGetKey() {
  return ['/'] as const
}

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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.index.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /projects
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetProjectsKey(args: InferRequestType<typeof client.projects.$get>) {
  return ['/projects', args] as const
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetProjectsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.projects.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}
