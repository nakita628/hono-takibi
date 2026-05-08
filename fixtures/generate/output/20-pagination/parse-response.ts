import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from './client'

export async function getItems(
  args: InferRequestType<typeof client.items.$get>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.items.$get(args, options))
}

export async function getFeeds(options?: ClientRequestOptions) {
  return await parseResponse(client.feeds.$get(undefined, options))
}

export async function getUsersUserIdPosts(
  args: InferRequestType<(typeof client.users)[':userId']['posts']['$get']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.users[':userId'].posts.$get(args, options))
}
