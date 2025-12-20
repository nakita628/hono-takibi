import { client } from '../index.ts'

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
export async function getProjects(params: { query: { chiban: string } }) {
  return await client.projects.$get({ query: params.query })
}
