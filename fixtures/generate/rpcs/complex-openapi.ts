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
export async function postUsers(arg: {
  json: {
    name: string
    email: string
    address?: { street: string; city: string; state: string; postalCode: string; country: string }
    profile?: { bio?: string; social?: { twitter?: string; linkedin?: string } }
  }
}) {
  return await client.users.$post(arg)
}

/**
 * GET /users/{userId}
 *
 * Retrieve a user by ID
 */
export async function getUsersUserId(arg: { param: { userId: string } }) {
  return await client['users'][':userId']['$get'](arg)
}

/**
 * PUT /users/{userId}
 *
 * Update an existing user
 */
export async function putUsersUserId(arg: {
  param: { userId: string }
  json: {
    name?: string
    email?: string
    address?: { street: string; city: string; state: string; postalCode: string; country: string }
    profile?: { bio?: string; social?: { twitter?: string; linkedin?: string } }
  }
}) {
  return await client['users'][':userId']['$put'](arg)
}

/**
 * DELETE /users/{userId}
 *
 * Delete a user
 */
export async function deleteUsersUserId(arg: { param: { userId: string } }) {
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
export async function postOrders(arg: {
  json: {
    userId: string
    items: { productId: string; quantity: number; price: number }[]
    paymentMethod?:
      | { method: 'credit_card'; cardNumber: string; cardHolder: string; expirationDate: string }
      | { method: 'paypal'; email: string }
  }
}) {
  return await client.orders.$post(arg)
}
