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
export async function postUsers(body: { email: string; name?: string }) {
  return await client.users.$post({ json: body })
}

/**
 * GET /users/{userId}
 */
export async function getUsersUserId(params: { path: { userId: string } }) {
  return await client.users[':userId'].$get({ param: params.path })
}
