import { client } from '../clients/05-request-bodies'

/**
 * POST /users
 */
export async function postUsers(arg: { json: { email: string; name?: string; password?: File } }) {
  return await client.users.$post(arg)
}

/**
 * PUT /users/{userId}
 */
export async function putUsersUserId(arg: {
  param: { userId: string }
  json: { email: string; name: string; role?: 'admin' | 'user' | 'guest' }
}) {
  return await client['users'][':userId']['$put'](arg)
}

/**
 * PATCH /users/{userId}
 */
export async function patchUsersUserId(arg: {
  param: { userId: string }
  json:
    | { email?: string; name?: string; role?: 'admin' | 'user' | 'guest' }
    | { email?: string; name?: string; role?: 'admin' | 'user' | 'guest' }
}) {
  return await client['users'][':userId']['$patch'](arg)
}

/**
 * POST /users/{userId}/avatar
 */
export async function postUsersUserIdAvatar(arg: {
  param: { userId: string }
  form: { file: File; description?: string }
  json: File | File
}) {
  return await client['users'][':userId']['avatar']['$post'](arg)
}

/**
 * POST /bulk/users
 */
export async function postBulkUsers(arg: {
  json:
    | { email: string; name?: string; password?: File }[]
    | { email: string; name?: string; password?: File }
}) {
  return await client['bulk']['users']['$post'](arg)
}
