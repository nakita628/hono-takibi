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
export async function getPosts(arg: { query: { page: number; rows: number } }) {
  return await client.posts.$get(arg)
}

/**
 * POST /posts
 *
 * Create a new post
 *
 * Submit a new post with a maximum length of 140 characters.
 */
export async function postPosts(arg: { json: { post: string } }) {
  return await client.posts.$post(arg)
}

/**
 * PUT /posts/{id}
 *
 * Update an existing post
 *
 * Update the content of an existing post identified by its unique ID.
 */
export async function putPostsId(arg: { param: { id: string }; json: { post: string } }) {
  return await client['posts'][':id']['$put'](arg)
}

/**
 * DELETE /posts/{id}
 *
 * Delete a post
 *
 * Delete an existing post identified by its unique ID.
 */
export async function deletePostsId(arg: { param: { id: string } }) {
  return await client['posts'][':id']['$delete'](arg)
}
