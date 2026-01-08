import type { InferRequestType } from 'hono/client'
import { client } from '../clients/17-mixed-inline-refs'

/**
 * GET /users
 */
export async function getUsers(arg: InferRequestType<typeof client.users.$get>) {
  return await client.users.$get(arg)
}

/**
 * POST /users
 */
export async function postUsers(arg: InferRequestType<typeof client.users.$post>) {
  return await client.users.$post(arg)
}

/**
 * GET /users/{userId}
 */
export async function getUsersUserId(
  arg: InferRequestType<(typeof client)['users'][':userId']['$get']>,
) {
  return await client['users'][':userId']['$get'](arg)
}

/**
 * POST /orders
 */
export async function postOrders(arg: InferRequestType<typeof client.orders.$post>) {
  return await client.orders.$post(arg)
}

/**
 * GET /products/{productId}/variants
 */
export async function getProductsProductIdVariants(
  arg: InferRequestType<(typeof client)['products'][':productId']['variants']['$get']>,
) {
  return await client['products'][':productId']['variants']['$get'](arg)
}

/**
 * POST /reports/generate
 */
export async function postReportsGenerate(
  arg: InferRequestType<(typeof client)['reports']['generate']['$post']>,
) {
  return await client['reports']['generate']['$post'](arg)
}

/**
 * POST /webhooks/test
 */
export async function postWebhooksTest(
  arg: InferRequestType<(typeof client)['webhooks']['test']['$post']>,
) {
  return await client['webhooks']['test']['$post'](arg)
}
