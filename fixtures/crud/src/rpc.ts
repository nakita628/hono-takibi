import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { client } from './client'

export async function get(options?: ClientRequestOptions) {
  return await client.$get(undefined, options)
}

export async function getTasks(
  args: InferRequestType<typeof client.tasks.$get>,
  options?: ClientRequestOptions,
) {
  return await client.tasks.$get(args, options)
}

export async function postTasks(
  args: InferRequestType<typeof client.tasks.$post>,
  options?: ClientRequestOptions,
) {
  return await client.tasks.$post(args, options)
}

export async function getTasksTaskId(
  args: InferRequestType<(typeof client.tasks)[':taskId']['$get']>,
  options?: ClientRequestOptions,
) {
  return await client.tasks[':taskId'].$get(args, options)
}

export async function putTasksTaskId(
  args: InferRequestType<(typeof client.tasks)[':taskId']['$put']>,
  options?: ClientRequestOptions,
) {
  return await client.tasks[':taskId'].$put(args, options)
}

export async function deleteTasksTaskId(
  args: InferRequestType<(typeof client.tasks)[':taskId']['$delete']>,
  options?: ClientRequestOptions,
) {
  return await client.tasks[':taskId'].$delete(args, options)
}
