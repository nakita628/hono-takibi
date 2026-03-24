import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { client } from './client'

export async function getUsers(
  args: InferRequestType<typeof client.users.$get>,
  options?: ClientRequestOptions,
) {
  return await client.users.$get(args, options)
}

export async function postUsers(
  args: InferRequestType<typeof client.users.$post>,
  options?: ClientRequestOptions,
) {
  return await client.users.$post(args, options)
}

export async function getUsersId(
  args: InferRequestType<(typeof client.users)[':id']['$get']>,
  options?: ClientRequestOptions,
) {
  return await client.users[':id'].$get(args, options)
}
