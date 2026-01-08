import type { InferRequestType } from 'hono/client'
import { client } from '../clients/complex-components'

/**
 * POST /auth/token
 *
 * Issue access token
 */
export async function postAuthToken(
  arg: InferRequestType<(typeof client)['auth']['token']['$post']>,
) {
  return await client['auth']['token']['$post'](arg)
}

/**
 * GET /users
 *
 * List users
 */
export async function getUsers(arg: InferRequestType<typeof client.users.$get>) {
  return await client.users.$get(arg)
}

/**
 * POST /users
 *
 * Create user
 */
export async function postUsers(arg: InferRequestType<typeof client.users.$post>) {
  return await client.users.$post(arg)
}

/**
 * GET /users/{userId}
 *
 * Get user by id
 */
export async function getUsersUserId(
  arg: InferRequestType<(typeof client)['users'][':userId']['$get']>,
) {
  return await client['users'][':userId']['$get'](arg)
}

/**
 * PATCH /users/{userId}
 *
 * Update user (partial)
 */
export async function patchUsersUserId(
  arg: InferRequestType<(typeof client)['users'][':userId']['$patch']>,
) {
  return await client['users'][':userId']['$patch'](arg)
}

/**
 * GET /companies/{companyId}
 *
 * Get company by id
 */
export async function getCompaniesCompanyId(
  arg: InferRequestType<(typeof client)['companies'][':companyId']['$get']>,
) {
  return await client['companies'][':companyId']['$get'](arg)
}

/**
 * GET /orders
 *
 * List orders
 */
export async function getOrders(arg: InferRequestType<typeof client.orders.$get>) {
  return await client.orders.$get(arg)
}

/**
 * POST /orders
 *
 * Create order (and optionally trigger callback)
 */
export async function postOrders(arg: InferRequestType<typeof client.orders.$post>) {
  return await client.orders.$post(arg)
}

/**
 * GET /orders/{orderId}
 *
 * Get order by id
 */
export async function getOrdersOrderId(
  arg: InferRequestType<(typeof client)['orders'][':orderId']['$get']>,
) {
  return await client['orders'][':orderId']['$get'](arg)
}

/**
 * GET /files/{fileId}
 *
 * Get file metadata
 */
export async function getFilesFileId(
  arg: InferRequestType<(typeof client)['files'][':fileId']['$get']>,
) {
  return await client['files'][':fileId']['$get'](arg)
}

/**
 * POST /subscriptions
 *
 * Create webhook subscription
 */
export async function postSubscriptions(arg: InferRequestType<typeof client.subscriptions.$post>) {
  return await client.subscriptions.$post(arg)
}
