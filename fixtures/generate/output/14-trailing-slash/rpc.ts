import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { client } from './client'

export async function getApiReverseChibanIndex(options?: ClientRequestOptions) {
  return await client.api.reverseChiban.index.$get(undefined, options)
}

export async function getApiReverseChiban(options?: ClientRequestOptions) {
  return await client.api.reverseChiban.$get(undefined, options)
}

export async function getPostsIndex(
  args: InferRequestType<typeof client.posts.index.$get>,
  options?: ClientRequestOptions,
) {
  return await client.posts.index.$get(args, options)
}

export async function postPostsIndex(
  args: InferRequestType<typeof client.posts.index.$post>,
  options?: ClientRequestOptions,
) {
  return await client.posts.index.$post(args, options)
}

export async function getUsersIdIndex(
  args: InferRequestType<(typeof client.users)[':id']['index']['$get']>,
  options?: ClientRequestOptions,
) {
  return await client.users[':id'].index.$get(args, options)
}

export async function getItemsIndex(options?: ClientRequestOptions) {
  return await client.items.index.$get(undefined, options)
}
