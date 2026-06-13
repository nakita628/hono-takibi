import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { client } from './client'

export async function postItems(
  args: InferRequestType<typeof client.items.$post>,
  options?: ClientRequestOptions,
) {
  return await client.items.$post(args, options)
}

export async function getPing(options?: ClientRequestOptions) {
  return await client.ping.$get(undefined, options)
}
