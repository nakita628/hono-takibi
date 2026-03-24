import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { client } from '../lib/client'

export async function getTodos(
  args: InferRequestType<typeof client.todos.$get>,
  options?: ClientRequestOptions,
) {
  return await client.todos.$get(args, options)
}

export async function postTodos(
  args: InferRequestType<typeof client.todos.$post>,
  options?: ClientRequestOptions,
) {
  return await client.todos.$post(args, options)
}

export async function getTodosId(
  args: InferRequestType<(typeof client.todos)[':id']['$get']>,
  options?: ClientRequestOptions,
) {
  return await client.todos[':id'].$get(args, options)
}

export async function deleteTodosId(
  args: InferRequestType<(typeof client.todos)[':id']['$delete']>,
  options?: ClientRequestOptions,
) {
  return await client.todos[':id'].$delete(args, options)
}

export async function patchTodosId(
  args: InferRequestType<(typeof client.todos)[':id']['$patch']>,
  options?: ClientRequestOptions,
) {
  return await client.todos[':id'].$patch(args, options)
}

export async function getHealth(options?: ClientRequestOptions) {
  return await client.health.$get(undefined, options)
}
