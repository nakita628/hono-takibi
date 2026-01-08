import type { InferRequestType } from 'hono/client'
import { client } from '../clients/sample-geojson'

/**
 * GET /
 *
 * Ping endpoint
 *
 * This endpoint is used to check if the server is working properly.
 */
export async function get() {
  return await client.index.$get()
}

/**
 * GET /projects
 *
 * Get projects related to a given chiban
 *
 * Get projects related to a given chiban
 */
export async function getProjects(arg: InferRequestType<typeof client.projects.$get>) {
  return await client.projects.$get(arg)
}
