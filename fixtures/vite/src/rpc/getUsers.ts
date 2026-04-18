import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { client } from '../client'

export async function getUsers(
  args: InferRequestType<typeof client.users.$get>,
  options?: ClientRequestOptions,
) {
  return await client.users.$get(args, options)
}
