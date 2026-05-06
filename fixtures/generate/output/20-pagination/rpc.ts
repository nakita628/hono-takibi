import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { client } from './client'

export async function getUsers(
  args: InferRequestType<typeof client.users.$get>,
  options?: ClientRequestOptions,
) {
  return await client.users.$get(args, options)
}

export async function getPosts(
  args: InferRequestType<typeof client.posts.$get>,
  options?: ClientRequestOptions,
) {
  return await client.posts.$get(args, options)
}

export async function getHealth(options?: ClientRequestOptions) {
  return await client.health.$get(undefined, options)
}
