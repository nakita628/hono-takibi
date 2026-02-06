import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { client } from '../client'

/**
 * DELETE /users/{id}
 *
 * Delete user
 *
 * Delete a user by ID.
 */
export async function deleteUsersId(
  args: InferRequestType<(typeof client.users)[':id']['$delete']>,
  options?: ClientRequestOptions,
) {
  return await client.users[':id'].$delete(args, options)
}
