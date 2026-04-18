import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { client } from '../client'

export async function deleteUsersId(
  args: InferRequestType<(typeof client.users)[':id']['$delete']>,
  options?: ClientRequestOptions,
) {
  return await client.users[':id'].$delete(args, options)
}
