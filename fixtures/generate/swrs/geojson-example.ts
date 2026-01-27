import useSWR from 'swr'
import type { Key, SWRConfiguration } from 'swr'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/geojson-example'

/**
 * Generates SWR cache key for GET /
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetKey() {
  return ['', 'GET', '/'] as const
}

/**
 * GET /
 *
 * Ping endpoint
 *
 * This endpoint is used to check if the server is working.
 */
export function useGet(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = isEnabled ? (customKey ?? getGetKey()) : null
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
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetProjectsKey(args: InferRequestType<typeof client.projects.$get>) {
  return ['projects', 'GET', '/projects', args] as const
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = isEnabled ? (customKey ?? getGetProjectsKey(args)) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.projects.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}
