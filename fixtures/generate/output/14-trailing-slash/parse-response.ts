import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from './client'

/**
 * GET /api/reverseChiban/
 *
 * Reverse Chiban (trailing slash)
 */
export async function getApiReverseChibanIndex(options?: ClientRequestOptions) {
  return await parseResponse(client.api.reverseChiban.index.$get(undefined, options))
}

/**
 * GET /api/reverseChiban
 *
 * Reverse Chiban (no trailing slash)
 */
export async function getApiReverseChiban(options?: ClientRequestOptions) {
  return await parseResponse(client.api.reverseChiban.$get(undefined, options))
}

/**
 * GET /posts/
 *
 * List posts (trailing slash only)
 */
export async function getPostsIndex(
  args: InferRequestType<typeof client.posts.index.$get>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.posts.index.$get(args, options))
}

/**
 * POST /posts/
 *
 * Create post (trailing slash only)
 */
export async function postPostsIndex(
  args: InferRequestType<typeof client.posts.index.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.posts.index.$post(args, options))
}

/**
 * GET /users/{id}/
 *
 * Get user (trailing slash with path param)
 */
export async function getUsersIdIndex(
  args: InferRequestType<(typeof client.users)[':id']['index']['$get']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.users[':id'].index.$get(args, options))
}

/**
 * GET /items/
 *
 * List items (trailing slash only)
 */
export async function getItemsIndex(options?: ClientRequestOptions) {
  return await parseResponse(client.items.index.$get(undefined, options))
}
