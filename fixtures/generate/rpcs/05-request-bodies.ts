import type { ClientRequestOptions } from 'hono/client'
import { client } from '../clients/05-request-bodies'

/**
 * POST /users
 */
export async function postUsers(args: {
  json: { email: string; name?: string; password?: File }
  options?: ClientRequestOptions
}) {
  return await client.users.$post(args)
}

/**
 * PUT /users/{userId}
 */
export async function putUsersUserId(args: {
  param: { userId: string }
  json: { email: string; name: string; role?: 'admin' | 'user' | 'guest' }
  options?: ClientRequestOptions
}) {
  return await client['users'][':userId']['$put'](args)
}

/**
 * PATCH /users/{userId}
 */
export async function patchUsersUserId(args: {
  param: { userId: string }
  json:
    | { email?: string; name?: string; role?: 'admin' | 'user' | 'guest' }
    | { email?: string; name?: string; role?: 'admin' | 'user' | 'guest' }
  options?: ClientRequestOptions
}) {
  return await client['users'][':userId']['$patch'](args)
}

/**
 * POST /users/{userId}/avatar
 */
export async function postUsersUserIdAvatar(args: {
  param: { userId: string }
  form: { file: File; description?: string }
  json: File | File
  options?: ClientRequestOptions
}) {
  return await client['users'][':userId']['avatar']['$post'](args)
}

/**
 * POST /bulk/users
 */
export async function postBulkUsers(args: {
  json:
    | { email: string; name?: string; password?: File }[]
    | { email: string; name?: string; password?: File }
  options?: ClientRequestOptions
}) {
  return await client['bulk']['users']['$post'](args)
}
