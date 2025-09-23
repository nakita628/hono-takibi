import { client } from '../client'

/**
 * DELETE /users/{id}
 *
 * Delete user
 *
 * Delete a user by ID.
 */
export async function deleteUsersId(params: { path: { id: string } }) {
  return await client.users[':id'].$delete({ param: params.path })
}
