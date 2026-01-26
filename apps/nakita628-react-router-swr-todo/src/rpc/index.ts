import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { client } from '../lib'

/**
 * GET /
 *
 * Health Check
 */
export async function get(options?: ClientRequestOptions) {
  return await client.index.$get(undefined, options)
}

/**
 * GET /todo
 *
 * Retrieve a list of posts
 */
export async function getTodo(
  args: InferRequestType<typeof client.todo.$get>,
  options?: ClientRequestOptions,
) {
  return await client.todo.$get(args, options)
}

/**
 * POST /todo
 *
 * Create a new post
 */
export async function postTodo(
  args: InferRequestType<typeof client.todo.$post>,
  options?: ClientRequestOptions,
) {
  return await client.todo.$post(args, options)
}

/**
 * GET /todo/{id}
 *
 * Get a single todo
 */
export async function getTodoId(
  args: InferRequestType<(typeof client.todo)[':id']['$get']>,
  options?: ClientRequestOptions,
) {
  return await client.todo[':id'].$get(args, options)
}

/**
 * PUT /todo/{id}
 *
 * Update an existing todo
 */
export async function putTodoId(
  args: InferRequestType<(typeof client.todo)[':id']['$put']>,
  options?: ClientRequestOptions,
) {
  return await client.todo[':id'].$put(args, options)
}

/**
 * DELETE /todo/{id}
 *
 * Delete a todo
 */
export async function deleteTodoId(
  args: InferRequestType<(typeof client.todo)[':id']['$delete']>,
  options?: ClientRequestOptions,
) {
  return await client.todo[':id'].$delete(args, options)
}
