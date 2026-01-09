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
export async function postUsers(arg: { json: { email: string; name?: string } }) {
  return await client.users.$post(arg)
}

/**
 * GET /users/{userId}
 */
export async function getUsersUserId(arg: { param: { userId: string } }) {
  return await client['users'][':userId']['$get'](arg)
}
