import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { client } from '../client'

export async function putUsersId(
  args: InferRequestType<(typeof client.users)[':id']['$put']>,
  options?: ClientRequestOptions,
) {
  return await client.users[':id'].$put(args, options)
}
