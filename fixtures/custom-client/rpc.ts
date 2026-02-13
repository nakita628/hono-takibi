import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { authClient } from './client'

/**
 * GET /users
 *
 * Get all users
 */
export async function getUsers(
  args: InferRequestType<typeof authClient.users.$get>,
  options?: ClientRequestOptions,
) {
  return await authClient.users.$get(args, options)
}

/**
 * POST /users
 *
 * Create a user
 */
export async function postUsers(
  args: InferRequestType<typeof authClient.users.$post>,
  options?: ClientRequestOptions,
) {
  return await authClient.users.$post(args, options)
}

/**
 * GET /users/{id}
 *
 * Get user by ID
 */
export async function getUsersId(
  args: InferRequestType<(typeof authClient.users)[':id']['$get']>,
  options?: ClientRequestOptions,
) {
  return await authClient.users[':id'].$get(args, options)
}
