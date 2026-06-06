import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { client } from './client'

export async function getPosts(
  args: InferRequestType<typeof client.posts.$get>,
  options?: ClientRequestOptions,
) {
  return await client.posts.$get(args, options)
}

export async function postPosts(
  args: InferRequestType<typeof client.posts.$post>,
  options?: ClientRequestOptions,
) {
  return await client.posts.$post(args, options)
}

export async function getPostsId(
  args: InferRequestType<(typeof client.posts)[':id']['$get']>,
  options?: ClientRequestOptions,
) {
  return await client.posts[':id'].$get(args, options)
}

export async function putPostsId(
  args: InferRequestType<(typeof client.posts)[':id']['$put']>,
  options?: ClientRequestOptions,
) {
  return await client.posts[':id'].$put(args, options)
}

export async function deletePostsId(
  args: InferRequestType<(typeof client.posts)[':id']['$delete']>,
  options?: ClientRequestOptions,
) {
  return await client.posts[':id'].$delete(args, options)
}

export async function getPostsIdComments(
  args: InferRequestType<(typeof client.posts)[':id']['comments']['$get']>,
  options?: ClientRequestOptions,
) {
  return await client.posts[':id'].comments.$get(args, options)
}

export async function postPostsIdComments(
  args: InferRequestType<(typeof client.posts)[':id']['comments']['$post']>,
  options?: ClientRequestOptions,
) {
  return await client.posts[':id'].comments.$post(args, options)
}

export async function getTags(options?: ClientRequestOptions) {
  return await client.tags.$get(undefined, options)
}
