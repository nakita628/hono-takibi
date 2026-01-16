import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { client } from '../client'

/**
 * PATCH /users/{id}
 *
 * Update user (partial)
 *
 * Partial update (PATCH). Only provided fields will be updated.
 */
export async function patchUsersId(
  args: InferRequestType<(typeof client.users)[':id']['$patch']>,
  options?: ClientRequestOptions,
) {
  return await client.users[':id'].$patch(args, options)
}
