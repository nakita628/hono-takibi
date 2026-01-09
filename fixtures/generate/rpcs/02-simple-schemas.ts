import type { ClientRequestOptions } from 'hono/client'
import { client } from '../clients/02-simple-schemas'

/**
 * GET /users
 */
export async function getUsers(options?: ClientRequestOptions) {
  return await client.users.$get(undefined, options)
}

/**
 * POST /users
 */
export async function postUsers(
  args: { json: { email: string; name?: string } },
  options?: ClientRequestOptions,
) {
  return await client.users.$post(args, options)
}

/**
 * GET /users/{userId}
 */
export async function getUsersUserId(
  args: { param: { userId: string } },
  options?: ClientRequestOptions,
) {
  return await client.users[':userId'].$get(args, options)
}
