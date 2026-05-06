import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { authClient } from './client'

export async function getUsers(
  args: InferRequestType<typeof authClient.users.$get>,
  options?: ClientRequestOptions,
) {
  return await authClient.users.$get(args, options)
}

export async function postUsers(
  args: InferRequestType<typeof authClient.users.$post>,
  options?: ClientRequestOptions,
) {
  return await authClient.users.$post(args, options)
}

export async function getUsersId(
  args: InferRequestType<(typeof authClient.users)[':id']['$get']>,
  options?: ClientRequestOptions,
) {
  return await authClient.users[':id'].$get(args, options)
}
