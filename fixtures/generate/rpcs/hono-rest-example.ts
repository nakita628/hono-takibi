import type { InferRequestType } from 'hono/client'
import { client } from '../clients/hono-rest-example'

/**
 * GET /
 *
 * Welcome message
 *
 * Retrieve a simple welcome message from the Hono API.
 */
export async function get() {
  return await client.index.$get()
}

/**
 * GET /posts
 *
 * Retrieve a list of posts
 *
 * Retrieve a paginated list of posts. Specify the page number and the number of posts per page.
 */
export async function getPosts(arg: InferRequestType<typeof client.posts.$get>) {
  return await client.posts.$get(arg)
}

/**
 * POST /posts
 *
 * Create a new post
 *
 * Submit a new post with a maximum length of 140 characters.
 */
export async function postPosts(arg: InferRequestType<typeof client.posts.$post>) {
  return await client.posts.$post(arg)
}

/**
 * PUT /posts/{id}
 *
 * Update an existing post
 *
 * Update the content of an existing post identified by its unique ID.
 */
export async function putPostsId(arg: InferRequestType<(typeof client)['posts'][':id']['$put']>) {
  return await client['posts'][':id']['$put'](arg)
}

/**
 * DELETE /posts/{id}
 *
 * Delete a post
 *
 * Delete an existing post identified by its unique ID.
 */
export async function deletePostsId(
  arg: InferRequestType<(typeof client)['posts'][':id']['$delete']>,
) {
  return await client['posts'][':id']['$delete'](arg)
}
