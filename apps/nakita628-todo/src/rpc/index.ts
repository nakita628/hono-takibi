import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { client } from '../lib'

/**
 * GET /api
 *
 * Health Check
 */
export async function getApi(options?: ClientRequestOptions) {
  return await client.api.$get(undefined, options)
}

/**
 * GET /api/todo
 *
 * Retrieve a list of posts
 */
export async function getApiTodo(
  args: InferRequestType<typeof client.api.todo.$get>,
  options?: ClientRequestOptions,
) {
  return await client.api.todo.$get(args, options)
}

/**
 * POST /api/todo
 *
 * Create a new post
 */
export async function postApiTodo(
  args: InferRequestType<typeof client.api.todo.$post>,
  options?: ClientRequestOptions,
) {
  return await client.api.todo.$post(args, options)
}

/**
 * GET /api/todo/{id}
 *
 * Get a single todo
 */
export async function getApiTodoId(
  args: InferRequestType<(typeof client.api.todo)[':id']['$get']>,
  options?: ClientRequestOptions,
) {
  return await client.api.todo[':id'].$get(args, options)
}

/**
 * PUT /api/todo/{id}
 *
 * Update an existing todo
 */
export async function putApiTodoId(
  args: InferRequestType<(typeof client.api.todo)[':id']['$put']>,
  options?: ClientRequestOptions,
) {
  return await client.api.todo[':id'].$put(args, options)
}

/**
 * DELETE /api/todo/{id}
 *
 * Delete a todo
 */
export async function deleteApiTodoId(
  args: InferRequestType<(typeof client.api.todo)[':id']['$delete']>,
  options?: ClientRequestOptions,
) {
  return await client.api.todo[':id'].$delete(args, options)
}
