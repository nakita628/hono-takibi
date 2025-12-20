import { client } from '../index.ts'

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
export async function getPosts(params: { query: { page: number; rows: number } }) {
  return await client.posts.$get({ query: params.query })
}

/**
 * POST /posts
 *
 * Create a new post
 *
 * Submit a new post with a maximum length of 140 characters.
 */
export async function postPosts(body: { post: string }) {
  return await client.posts.$post({ json: body })
}

/**
 * PUT /posts/{id}
 *
 * Update an existing post
 *
 * Update the content of an existing post identified by its unique ID.
 */
export async function putPostsId(params: { path: { id: string } }, body: { post: string }) {
  return await client.posts[':id'].$put({ param: params.path, json: body })
}

/**
 * DELETE /posts/{id}
 *
 * Delete a post
 *
 * Delete an existing post identified by its unique ID.
 */
export async function deletePostsId(params: { path: { id: string } }) {
  return await client.posts[':id'].$delete({ param: params.path })
}
