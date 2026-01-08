import type { InferRequestType } from 'hono/client'
import { client } from '../clients/21-extreme-status-content'

/**
 * GET /extreme-responses
 */
export async function getExtremeResponses() {
  return await client['extreme-responses']['$get']()
}

/**
 * POST /multipart-variations
 */
export async function postMultipartVariations(
  arg: InferRequestType<(typeof client)['multipart-variations']['$post']>,
) {
  return await client['multipart-variations']['$post'](arg)
}

/**
 * POST /charset-variations
 */
export async function postCharsetVariations() {
  return await client['charset-variations']['$post']()
}
