import type { ClientRequestOptions } from 'hono/client'
import { client } from '../clients/complex-openapi'

/**
 * GET /users
 *
 * List all users
 */
export async function getUsers(args?: {} | undefined, options?: ClientRequestOptions) {
  return await client.users.$get(args, options)
}

/**
 * POST /users
 *
 * Create a new user
 */
export async function postUsers(
  args: {
    json: {
      name: string
      email: string
      address?: { street: string; city: string; state: string; postalCode: string; country: string }
      profile?: { bio?: string; social?: { twitter?: string; linkedin?: string } }
    }
  },
  options?: ClientRequestOptions,
) {
  return await client.users.$post(args, options)
}

/**
 * GET /users/{userId}
 *
 * Retrieve a user by ID
 */
export async function getUsersUserId(
  args: { param: { userId: string } },
  options?: ClientRequestOptions,
) {
  return await client['users'][':userId']['$get'](args, options)
}

/**
 * PUT /users/{userId}
 *
 * Update an existing user
 */
export async function putUsersUserId(
  args: {
    param: { userId: string }
    json: {
      name?: string
      email?: string
      address?: { street: string; city: string; state: string; postalCode: string; country: string }
      profile?: { bio?: string; social?: { twitter?: string; linkedin?: string } }
    }
  },
  options?: ClientRequestOptions,
) {
  return await client['users'][':userId']['$put'](args, options)
}

/**
 * DELETE /users/{userId}
 *
 * Delete a user
 */
export async function deleteUsersUserId(
  args: { param: { userId: string } },
  options?: ClientRequestOptions,
) {
  return await client['users'][':userId']['$delete'](args, options)
}

/**
 * GET /orders
 *
 * List all orders
 */
export async function getOrders(args?: {} | undefined, options?: ClientRequestOptions) {
  return await client.orders.$get(args, options)
}

/**
 * POST /orders
 *
 * Create a new order
 */
export async function postOrders(
  args: {
    json: {
      userId: string
      items: { productId: string; quantity: number; price: number }[]
      paymentMethod?:
        | { method: 'credit_card'; cardNumber: string; cardHolder: string; expirationDate: string }
        | { method: 'paypal'; email: string }
    }
  },
  options?: ClientRequestOptions,
) {
  return await client.orders.$post(args, options)
}
