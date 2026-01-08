import { client } from '../clients/complex-components'

/**
 * POST /auth/token
 *
 * Issue access token
 */
export async function postAuthToken() {
  return await client.auth.token.$post()
}

/**
 * GET /users
 *
 * List users
 */
export async function getUsers(params: {
  query: {
    limit: number
    cursor: string
    include: ('company' | 'manager' | 'reports' | 'orders' | 'auditTrail' | 'graph')[]
    filter: unknown
  }
}) {
  return await client.users.$get({ query: params.query })
}

/**
 * POST /users
 *
 * Create user
 */
export async function postUsers() {
  return await client.users.$post()
}

/**
 * GET /users/{userId}
 *
 * Get user by id
 */
export async function getUsersUserId(params: {
  path: { userId: string | string }
  query: { include: ('company' | 'manager' | 'reports' | 'orders' | 'auditTrail' | 'graph')[] }
}) {
  return await client.users[':userId'].$get({ param: params.path, query: params.query })
}

/**
 * PATCH /users/{userId}
 *
 * Update user (partial)
 */
export async function patchUsersUserId(params: { path: { userId: string | string } }) {
  return await client.users[':userId'].$patch({ param: params.path })
}

/**
 * GET /companies/{companyId}
 *
 * Get company by id
 */
export async function getCompaniesCompanyId(params: {
  path: { companyId: string | string }
  query: { include: ('company' | 'manager' | 'reports' | 'orders' | 'auditTrail' | 'graph')[] }
}) {
  return await client.companies[':companyId'].$get({ param: params.path, query: params.query })
}

/**
 * GET /orders
 *
 * List orders
 */
export async function getOrders(params: {
  query: {
    limit: number
    cursor: string
    buyerId: string | string
    include: ('company' | 'manager' | 'reports' | 'orders' | 'auditTrail' | 'graph')[]
    filter: unknown
  }
}) {
  return await client.orders.$get({ query: params.query })
}

/**
 * POST /orders
 *
 * Create order (and optionally trigger callback)
 */
export async function postOrders() {
  return await client.orders.$post()
}

/**
 * GET /orders/{orderId}
 *
 * Get order by id
 */
export async function getOrdersOrderId(params: {
  path: { orderId: string | string }
  query: { include: ('company' | 'manager' | 'reports' | 'orders' | 'auditTrail' | 'graph')[] }
}) {
  return await client.orders[':orderId'].$get({ param: params.path, query: params.query })
}

/**
 * GET /files/{fileId}
 *
 * Get file metadata
 */
export async function getFilesFileId(params: { path: { fileId: string | string } }) {
  return await client.files[':fileId'].$get({ param: params.path })
}

/**
 * POST /subscriptions
 *
 * Create webhook subscription
 */
export async function postSubscriptions() {
  return await client.subscriptions.$post()
}
