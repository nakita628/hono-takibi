import { client } from '../index.ts'

/**
 * GET /
 *
 * Ping endpoint
 *
 * This endpoint is used to check if the server is working.
 */
export async function get() {
  return await client.index.$get()
}

/**
 * GET /projects
 *
 * Get the site associated with a given lot number
 *
 * Update the content of an existing post identified by its unique ID.
 */
export async function getProjects(params: { query: { chiban: string } }) {
  return await client.projects.$get({ query: params.query })
}
