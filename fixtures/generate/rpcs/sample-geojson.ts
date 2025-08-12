import { client } from '../index.ts'

/**
 * Ping endpoint
 *
 * This endpoint is used to check if the server is working properly.
 *
 * GET /
 */
export async function getIndex() {
  return await client.index.$get()
}

/**
 * Get projects related to a given chiban
 *
 * Get projects related to a given chiban
 *
 * GET /projects
 */
export async function getProjects(params: { query: { chiban: string } }) {
  return await client.projects.$get({ query: { chiban: params.query.chiban } })
}
