import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { client } from '../client'

export async function patchUsersId(
  args: InferRequestType<(typeof client.users)[':id']['$patch']>,
  options?: ClientRequestOptions,
) {
  return await client.users[':id'].$patch(args, options)
}
