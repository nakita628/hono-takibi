import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/21-extreme-status-content'

/**
 * GET /extreme-responses
 */
export async function getExtremeResponses(options?: ClientRequestOptions) {
  return await parseResponse(client['extreme-responses'].$get(undefined, options))
}

/**
 * POST /multipart-variations
 */
export async function postMultipartVariations(
  args: InferRequestType<(typeof client)['multipart-variations']['$post']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client['multipart-variations'].$post(args, options))
}

/**
 * POST /charset-variations
 */
export async function postCharsetVariations(
  args: InferRequestType<(typeof client)['charset-variations']['$post']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client['charset-variations'].$post(args, options))
}
