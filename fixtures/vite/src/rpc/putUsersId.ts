import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { client } from '../client'

/**
 * PUT /users/{id}
 *
 * Replace user
 *
 * Full replace (PUT). All required fields must be present. Unspecified fields are treated as empty.
 */
export async function putUsersId(
  args: InferRequestType<(typeof client.users)[':id']['$put']>,
  options?: ClientRequestOptions,
) {
  return await client.users[':id'].$put(args, options)
}
