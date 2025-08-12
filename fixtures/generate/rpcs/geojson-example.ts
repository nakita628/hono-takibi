import { client } from '../index.ts'

/**
 * Ping endpoint
 *
 * This endpoint is used to check if the server is working.
 *
 * GET /
 */
export async function getIndex() {
  return await client.index.$get()
}

/**
 * Get the site associated with a given lot number
 *
 * Update the content of an existing post identified by its unique ID.
 *
 * GET /projects
 */
export async function getProjects(params: { query: { chiban: string } }) {
  return await client.projects.$get({ query: { chiban: params.query.chiban } })
}
