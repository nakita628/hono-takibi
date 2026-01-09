import type { ClientRequestOptions } from 'hono/client'
import { client } from '../client'

/**
 * GET /users/{id}
 *
 * Get user
 *
 * Retrieve a single user by ID.
 */
export async function getUsersId(args: { param: { id: string } }, options?: ClientRequestOptions) {
  return await client.users[':id'].$get(args, options)
}
