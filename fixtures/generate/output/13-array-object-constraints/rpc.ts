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

/**
 * GET /settings
 */
export async function getSettings(
  args: InferRequestType<typeof client.settings.$get>,
  options?: ClientRequestOptions,
) {
  return await client.settings.$get(args, options)
}

/**
 * PUT /settings
 */
export async function putSettings(
  args: InferRequestType<typeof client.settings.$put>,
  options?: ClientRequestOptions,
) {
  return await client.settings.$put(args, options)
}

/**
 * POST /config
 */
export async function postConfig(
  args: InferRequestType<typeof client.config.$post>,
  options?: ClientRequestOptions,
) {
  return await client.config.$post(args, options)
}

/**
 * POST /payment
 */
export async function postPayment(
  args: InferRequestType<typeof client.payment.$post>,
  options?: ClientRequestOptions,
) {
  return await client.payment.$post(args, options)
}
