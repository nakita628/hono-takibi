import type { InferRequestType } from 'hono/client'
import { client } from '../clients/complex-openapi'

/**
 * GET /users
 *
 * List all users
 */
export async function getUsers() {
  return await client.users.$get()
}

/**
 * POST /users
 *
 * Create a new user
 */
export async function postUsers(arg: InferRequestType<typeof client.users.$post>) {
  return await client.users.$post(arg)
}

/**
 * GET /users/{userId}
 *
 * Retrieve a user by ID
 */
export async function getUsersUserId(
  arg: InferRequestType<(typeof client)['users'][':userId']['$get']>,
) {
  return await client['users'][':userId']['$get'](arg)
}

/**
 * PUT /users/{userId}
 *
 * Update an existing user
 */
export async function putUsersUserId(
  arg: InferRequestType<(typeof client)['users'][':userId']['$put']>,
) {
  return await client['users'][':userId']['$put'](arg)
}

/**
 * DELETE /users/{userId}
 *
 * Delete a user
 */
export async function deleteUsersUserId(
  arg: InferRequestType<(typeof client)['users'][':userId']['$delete']>,
) {
  return await client['users'][':userId']['$delete'](arg)
}

/**
 * GET /orders
 *
 * List all orders
 */
export async function getOrders() {
  return await client.orders.$get()
}

/**
 * POST /orders
 *
 * Create a new order
 */
export async function postOrders(arg: InferRequestType<typeof client.orders.$post>) {
  return await client.orders.$post(arg)
}
