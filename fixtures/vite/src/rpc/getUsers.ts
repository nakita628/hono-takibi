import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { client } from '../client'

/**
 * GET /users
 *
 * List users
 *
 * List users with pagination and optional role filter.
 */
export async function getUsers(
  args: InferRequestType<typeof client.users.$get>,
  options?: ClientRequestOptions,
) {
  return await client.users.$get(args, options)
}
