import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { client } from './client'

/**
 * GET /tags
 */
export async function getTags(options?: ClientRequestOptions) {
  return await client.tags.$get(undefined, options)
}

/**
 * POST /tags
 */
export async function postTags(
  args: InferRequestType<typeof client.tags.$post>,
  options?: ClientRequestOptions,
) {
  return await client.tags.$post(args, options)
}
