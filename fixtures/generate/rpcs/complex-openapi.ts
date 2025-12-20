import { client } from '../index.ts'

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
export async function postUsers(body: {
  name: string
  email: string
  address?: { street: string; city: string; state: string; postalCode: string; country: string }
  profile?: { bio?: string; social?: { twitter?: string; linkedin?: string } }
}) {
  return await client.users.$post({ json: body })
}

/**
 * GET /users/{userId}
 *
 * Retrieve a user by ID
 */
export async function getUsersUserId(params: { path: { userId: string } }) {
  return await client.users[':userId'].$get({ param: params.path })
}

/**
 * PUT /users/{userId}
 *
 * Update an existing user
 */
export async function putUsersUserId(
  params: { path: { userId: string } },
  body: {
    name?: string
    email?: string
    address?: { street: string; city: string; state: string; postalCode: string; country: string }
    profile?: { bio?: string; social?: { twitter?: string; linkedin?: string } }
  },
) {
  return await client.users[':userId'].$put({ param: params.path, json: body })
}

/**
 * DELETE /users/{userId}
 *
 * Delete a user
 */
export async function deleteUsersUserId(params: { path: { userId: string } }) {
  return await client.users[':userId'].$delete({ param: params.path })
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
export async function postOrders(body: {
  userId: string
  items: { productId: string; quantity: number; price: number }[]
  paymentMethod?:
    | { method: 'credit_card'; cardNumber: string; cardHolder: string; expirationDate: string }
    | { method: 'paypal'; email: string }
}) {
  return await client.orders.$post({ json: body })
}
