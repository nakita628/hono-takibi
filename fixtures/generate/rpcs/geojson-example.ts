import type { ClientRequestOptions } from 'hono/client'
import { client } from '../clients/geojson-example'

/**
 * GET /
 *
 * Ping endpoint
 *
 * This endpoint is used to check if the server is working.
 */
export async function get(args?: {} | undefined, options?: ClientRequestOptions) {
  return await client.index.$get(args, options)
}

/**
 * GET /projects
 *
 * Get the site associated with a given lot number
 *
 * Update the content of an existing post identified by its unique ID.
 */
export async function getProjects(
  args: { query: { chiban: string } },
  options?: ClientRequestOptions,
) {
  return await client.projects.$get(args, options)
}
