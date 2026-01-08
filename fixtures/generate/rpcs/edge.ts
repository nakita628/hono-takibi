import type { InferRequestType } from 'hono/client'
import { client } from '../clients/edge'

/**
 * POST /polymorphic
 *
 * Polymorphic object with discriminator
 */
export async function postPolymorphic(arg: InferRequestType<typeof client.polymorphic.$post>) {
  return await client.polymorphic.$post(arg)
}

/**
 * GET /search
 *
 * Search with complex query
 */
export async function getSearch(arg: InferRequestType<typeof client.search.$get>) {
  return await client.search.$get(arg)
}

/**
 * PUT /multi-step
 *
 * Multi-step object definition using allOf
 */
export async function putMultiStep(arg: InferRequestType<(typeof client)['multi-step']['$put']>) {
  return await client['multi-step']['$put'](arg)
}
