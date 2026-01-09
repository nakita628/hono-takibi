import type { ClientRequestOptions } from 'hono/client'
import { client } from '../clients/sample-geojson'

/**
 * GET /
 *
 * Ping endpoint
 *
 * This endpoint is used to check if the server is working properly.
 */
export async function get(args?: {} | undefined, options?: ClientRequestOptions) {
  return await client.index.$get(args, options)
}

/**
 * GET /projects
 *
 * Get projects related to a given chiban
 *
 * Get projects related to a given chiban
 */
export async function getProjects(
  args: { query: { chiban: string } },
  options?: ClientRequestOptions,
) {
  return await client.projects.$get(args, options)
}
