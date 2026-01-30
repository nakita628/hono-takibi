import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/complex-components'

/**
 * POST /auth/token
 *
 * Issue access token
 */
export async function postAuthToken(
  args: InferRequestType<typeof client.auth.token.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.auth.token.$post(args, options))
}

/**
 * GET /users
 *
 * List users
 */
export async function getUsers(
  args: InferRequestType<typeof client.users.$get>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.users.$get(args, options))
}

/**
 * POST /users
 *
 * Create user
 */
export async function postUsers(
  args: InferRequestType<typeof client.users.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.users.$post(args, options))
}

/**
 * GET /users/{userId}
 *
 * Get user by id
 */
export async function getUsersUserId(
  args: InferRequestType<(typeof client.users)[':userId']['$get']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.users[':userId'].$get(args, options))
}

/**
 * PATCH /users/{userId}
 *
 * Update user (partial)
 */
export async function patchUsersUserId(
  args: InferRequestType<(typeof client.users)[':userId']['$patch']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.users[':userId'].$patch(args, options))
}

/**
 * GET /companies/{companyId}
 *
 * Get company by id
 */
export async function getCompaniesCompanyId(
  args: InferRequestType<(typeof client.companies)[':companyId']['$get']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.companies[':companyId'].$get(args, options))
}

/**
 * GET /orders
 *
 * List orders
 */
export async function getOrders(
  args: InferRequestType<typeof client.orders.$get>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.orders.$get(args, options))
}

/**
 * POST /orders
 *
 * Create order (and optionally trigger callback)
 */
export async function postOrders(
  args: InferRequestType<typeof client.orders.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.orders.$post(args, options))
}

/**
 * GET /orders/{orderId}
 *
 * Get order by id
 */
export async function getOrdersOrderId(
  args: InferRequestType<(typeof client.orders)[':orderId']['$get']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.orders[':orderId'].$get(args, options))
}

/**
 * GET /files/{fileId}
 *
 * Get file metadata
 */
export async function getFilesFileId(
  args: InferRequestType<(typeof client.files)[':fileId']['$get']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.files[':fileId'].$get(args, options))
}

/**
 * POST /subscriptions
 *
 * Create webhook subscription
 */
export async function postSubscriptions(
  args: InferRequestType<typeof client.subscriptions.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.subscriptions.$post(args, options))
}
