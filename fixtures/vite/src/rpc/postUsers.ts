import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { client } from '../client'

export async function postUsers(
  args: InferRequestType<typeof client.users.$post>,
  options?: ClientRequestOptions,
) {
  return await client.users.$post(args, options)
}
