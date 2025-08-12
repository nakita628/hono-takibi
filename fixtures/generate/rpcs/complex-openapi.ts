import { client } from '../index.ts'

/**
 * List all users
 *
 * GET /users
 */
export async function getUsers() {
  return await client.users.$get()
}

/**
 * Create a new user
 *
 * POST /users
 */
export async function postUsers(body: any) {
  return await client.users.$post({ json: body })
}

/**
 * Retrieve a user by ID
 *
 * GET /users/{userId}
 */
export async function getUsersUserId(params: { path: { userId: string } }) {
  return await client.users[':userId'].$get({ param: { userId: params.path.userId } })
}

/**
 * Update an existing user
 *
 * PUT /users/{userId}
 */
export async function putUsersUserId(params: { path: { userId: string } }, body: any) {
  return await client.users[':userId'].$put({ param: { userId: params.path.userId }, json: body })
}

/**
 * Delete a user
 *
 * DELETE /users/{userId}
 */
export async function deleteUsersUserId(params: { path: { userId: string } }) {
  return await client.users[':userId'].$delete({ param: { userId: params.path.userId } })
}

/**
 * List all orders
 *
 * GET /orders
 */
export async function getOrders() {
  return await client.orders.$get()
}

/**
 * Create a new order
 *
 * POST /orders
 */
export async function postOrders(body: any) {
  return await client.orders.$post({ json: body })
}
