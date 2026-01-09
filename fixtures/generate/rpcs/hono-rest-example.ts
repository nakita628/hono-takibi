import type { ClientRequestOptions } from 'hono/client'
import { client } from '../clients/hono-rest-example'

/**
 * GET /
 *
 * Welcome message
 *
 * Retrieve a simple welcome message from the Hono API.
 */
export async function get(options?: ClientRequestOptions) {
  return await client.index.$get(undefined, options)
}

/**
 * GET /posts
 *
 * Retrieve a list of posts
 *
 * Retrieve a paginated list of posts. Specify the page number and the number of posts per page.
 */
export async function getPosts(
  args: { query: { page: number; rows: number } },
  options?: ClientRequestOptions,
) {
  return await client.posts.$get(args, options)
}

/**
 * POST /posts
 *
 * Create a new post
 *
 * Submit a new post with a maximum length of 140 characters.
 */
export async function postPosts(args: { json: { post: string } }, options?: ClientRequestOptions) {
  return await client.posts.$post(args, options)
}

/**
 * PUT /posts/{id}
 *
 * Update an existing post
 *
 * Update the content of an existing post identified by its unique ID.
 */
export async function putPostsId(
  args: { param: { id: string }; json: { post: string } },
  options?: ClientRequestOptions,
) {
  return await client.posts[':id'].$put(args, options)
}

/**
 * DELETE /posts/{id}
 *
 * Delete a post
 *
 * Delete an existing post identified by its unique ID.
 */
export async function deletePostsId(
  args: { param: { id: string } },
  options?: ClientRequestOptions,
) {
  return await client.posts[':id'].$delete(args, options)
}
