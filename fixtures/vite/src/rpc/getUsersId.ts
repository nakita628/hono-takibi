import { client } from '../client'

/**
 * GET /users/{id}
 *
 * Get user
 *
 * Retrieve a single user by ID.
 */
export async function getUsersId(params: { path: { id: string } }) {
  return await client.users[':id'].$get({ param: params.path })
}
