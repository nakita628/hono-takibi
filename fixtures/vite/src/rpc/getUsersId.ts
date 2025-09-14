import { client } from '../client'

/**
 * Get user
 *
 * Retrieve a single user by ID.
 *
 * GET /users/{id}
 */
export async function getUsersId(params: { path: { id: string } }) {
  return await client.users[':id'].$get({ param: params.path })
}
