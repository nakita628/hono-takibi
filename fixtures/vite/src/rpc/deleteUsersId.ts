import { client } from '../client'

/**
 * Delete user
 *
 * Delete a user by ID.
 *
 * DELETE /users/{id}
 */
export async function deleteUsersId(params: { path: { id: string } }) {
  return await client.users[':id'].$delete({ param: params.path })
}
