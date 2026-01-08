import type { InferRequestType } from 'hono/client'
import { client } from '../clients/02-simple-schemas'

/**
 * GET /users
 */
export async function getUsers() {
  return await client.users.$get()
}

/**
 * POST /users
 */
export async function postUsers(arg: InferRequestType<typeof client.users.$post>) {
  return await client.users.$post(arg)
}

/**
 * GET /users/{userId}
 */
export async function getUsersUserId(
  arg: InferRequestType<(typeof client)['users'][':userId']['$get']>,
) {
  return await client['users'][':userId']['$get'](arg)
}
