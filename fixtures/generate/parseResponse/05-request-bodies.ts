import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/05-request-bodies'

/**
 * POST /users
 */
export async function postUsers(
  args: InferRequestType<typeof client.users.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.users.$post(args, options))
}

/**
 * PUT /users/{userId}
 */
export async function putUsersUserId(
  args: InferRequestType<(typeof client.users)[':userId']['$put']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.users[':userId'].$put(args, options))
}

/**
 * PATCH /users/{userId}
 */
export async function patchUsersUserId(
  args: InferRequestType<(typeof client.users)[':userId']['$patch']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.users[':userId'].$patch(args, options))
}

/**
 * POST /users/{userId}/avatar
 */
export async function postUsersUserIdAvatar(
  args: InferRequestType<(typeof client.users)[':userId']['avatar']['$post']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.users[':userId'].avatar.$post(args, options))
}

/**
 * POST /bulk/users
 */
export async function postBulkUsers(
  args: InferRequestType<typeof client.bulk.users.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.bulk.users.$post(args, options))
}
