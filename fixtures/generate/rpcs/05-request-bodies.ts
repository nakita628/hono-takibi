import { client } from '../index.ts'

/**
 * POST /users
 */
export async function postUsers() {
  return await client.users.$post()
}

/**
 * PUT /users/{userId}
 */
export async function putUsersUserId(params: { path: { userId: string } }) {
  return await client.users[':userId'].$put({ param: params.path })
}

/**
 * PATCH /users/{userId}
 */
export async function patchUsersUserId(params: { path: { userId: string } }) {
  return await client.users[':userId'].$patch({ param: params.path })
}

/**
 * POST /users/{userId}/avatar
 */
export async function postUsersUserIdAvatar(params: { path: { userId: string } }) {
  return await client.users[':userId'].avatar.$post({ param: params.path })
}

/**
 * POST /bulk/users
 */
export async function postBulkUsers() {
  return await client.bulk.users.$post()
}
