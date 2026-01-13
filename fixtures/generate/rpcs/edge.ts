import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { client } from '../clients/edge'

/**
 * POST /polymorphic
 *
 * Polymorphic object with discriminator
 */
export async function postPolymorphic(
  args: InferRequestType<typeof client.polymorphic.$post>,
  options?: ClientRequestOptions,
) {
  return await client.polymorphic.$post(args, options)
}

/**
 * GET /search
 *
 * Search with complex query
 */
export async function getSearch(
  args: InferRequestType<typeof client.search.$get>,
  options?: ClientRequestOptions,
) {
  return await client.search.$get(args, options)
}

/**
 * PUT /multi-step
 *
 * Multi-step object definition using allOf
 */
export async function putMultiStep(
  args: InferRequestType<(typeof client)['multi-step']['$put']>,
  options?: ClientRequestOptions,
) {
  return await client['multi-step'].$put(args, options)
}
