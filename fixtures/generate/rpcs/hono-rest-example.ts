import { client } from '../index.ts'

/**
 * Welcome message
 *
 * Retrieve a simple welcome message from the Hono API.
 *
 * GET /
 */
export async function getIndex() {
  return await client.index.$get()
}

/**
 * Retrieve a list of posts
 *
 * Retrieve a paginated list of posts. Specify the page number and the number of posts per page.
 *
 * GET /posts
 */
export async function getPosts(params: { query: { page: number; rows: number } }) {
  return await client.posts.$get({ query: { page: params.query.page, rows: params.query.rows } })
}

/**
 * Create a new post
 *
 * Submit a new post with a maximum length of 140 characters.
 *
 * POST /posts
 */
export async function postPosts(body: { post: string }) {
  return await client.posts.$post({ json: body })
}

/**
 * Update an existing post
 *
 * Update the content of an existing post identified by its unique ID.
 *
 * PUT /posts/{id}
 */
export async function putPostsId(params: { path: { id: string } }, body: { post: string }) {
  return await client.posts[':id'].$put({ param: { id: params.path.id }, json: body })
}

/**
 * Delete a post
 *
 * Delete an existing post identified by its unique ID.
 *
 * DELETE /posts/{id}
 */
export async function deletePostsId(params: { path: { id: string } }) {
  return await client.posts[':id'].$delete({ param: { id: params.path.id } })
}
