import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { client } from './client'

/**
 * POST /nullable
 */
export async function postNullable(
  args: InferRequestType<typeof client.nullable.$post>,
  options?: ClientRequestOptions,
) {
  return await client.nullable.$post(args, options)
}

/**
 * POST /discriminated
 */
export async function postDiscriminated(
  args: InferRequestType<typeof client.discriminated.$post>,
  options?: ClientRequestOptions,
) {
  return await client.discriminated.$post(args, options)
}

/**
 * GET /composed
 */
export async function getComposed(options?: ClientRequestOptions) {
  return await client.composed.$get(undefined, options)
}

/**
 * GET /deep-nested
 */
export async function getDeepNested(options?: ClientRequestOptions) {
  return await client['deep-nested'].$get(undefined, options)
}

/**
 * GET /additional-props
 */
export async function getAdditionalProps(options?: ClientRequestOptions) {
  return await client['additional-props'].$get(undefined, options)
}
