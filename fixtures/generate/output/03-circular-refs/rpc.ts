import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { client } from './client'

/**
 * GET /tree
 */
export async function getTree(options?: ClientRequestOptions) {
  return await client.tree.$get(undefined, options)
}

/**
 * POST /tree
 */
export async function postTree(
  args: InferRequestType<typeof client.tree.$post>,
  options?: ClientRequestOptions,
) {
  return await client.tree.$post(args, options)
}

/**
 * GET /graph
 */
export async function getGraph(options?: ClientRequestOptions) {
  return await client.graph.$get(undefined, options)
}
