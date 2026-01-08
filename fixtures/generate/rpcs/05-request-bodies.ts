import type { InferRequestType } from 'hono/client'
import { client } from '../clients/05-request-bodies'

/**
 * POST /users
 */
export async function postUsers(arg: InferRequestType<typeof client.users.$post>) {
  return await client.users.$post(arg)
}

/**
 * PUT /users/{userId}
 */
export async function putUsersUserId(
  arg: InferRequestType<(typeof client)['users'][':userId']['$put']>,
) {
  return await client['users'][':userId']['$put'](arg)
}

/**
 * PATCH /users/{userId}
 */
export async function patchUsersUserId(
  arg: InferRequestType<(typeof client)['users'][':userId']['$patch']>,
) {
  return await client['users'][':userId']['$patch'](arg)
}

/**
 * POST /users/{userId}/avatar
 */
export async function postUsersUserIdAvatar(
  arg: InferRequestType<(typeof client)['users'][':userId']['avatar']['$post']>,
) {
  return await client['users'][':userId']['avatar']['$post'](arg)
}

/**
 * POST /bulk/users
 */
export async function postBulkUsers(
  arg: InferRequestType<(typeof client)['bulk']['users']['$post']>,
) {
  return await client['bulk']['users']['$post'](arg)
}
