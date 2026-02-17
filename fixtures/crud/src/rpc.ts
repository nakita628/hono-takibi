import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { client } from './client'

/**
 * GET /
 *
 * Health check
 */
export async function get(options?: ClientRequestOptions) {
  return await client.$get(undefined, options)
}

/**
 * GET /tasks
 *
 * List tasks
 */
export async function getTasks(
  args: InferRequestType<typeof client.tasks.$get>,
  options?: ClientRequestOptions,
) {
  return await client.tasks.$get(args, options)
}

/**
 * POST /tasks
 *
 * Create task
 */
export async function postTasks(
  args: InferRequestType<typeof client.tasks.$post>,
  options?: ClientRequestOptions,
) {
  return await client.tasks.$post(args, options)
}

/**
 * GET /tasks/{taskId}
 *
 * Get task by ID
 */
export async function getTasksTaskId(
  args: InferRequestType<(typeof client.tasks)[':taskId']['$get']>,
  options?: ClientRequestOptions,
) {
  return await client.tasks[':taskId'].$get(args, options)
}

/**
 * PUT /tasks/{taskId}
 *
 * Update task
 */
export async function putTasksTaskId(
  args: InferRequestType<(typeof client.tasks)[':taskId']['$put']>,
  options?: ClientRequestOptions,
) {
  return await client.tasks[':taskId'].$put(args, options)
}

/**
 * DELETE /tasks/{taskId}
 *
 * Delete task
 */
export async function deleteTasksTaskId(
  args: InferRequestType<(typeof client.tasks)[':taskId']['$delete']>,
  options?: ClientRequestOptions,
) {
  return await client.tasks[':taskId'].$delete(args, options)
}
