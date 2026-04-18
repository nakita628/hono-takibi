import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { client } from '../client'

export async function getUsersId(
  args: InferRequestType<(typeof client.users)[':id']['$get']>,
  options?: ClientRequestOptions,
) {
  return await client.users[':id'].$get(args, options)
}
