import type { ClientRequestOptions } from 'hono/client'
import { client } from '../client'

/**
 * DELETE /users/{id}
 *
 * Delete user
 *
 * Delete a user by ID.
 */
export async function deleteUsersId(
  args: { param: { id: string } },
  options?: ClientRequestOptions,
) {
  return await client.users[':id'].$delete(args, options)
}
