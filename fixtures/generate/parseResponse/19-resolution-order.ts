import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/19-resolution-order'

/**
 * GET /entities
 */
export async function getEntities(options?: ClientRequestOptions) {
  return await parseResponse(client.entities.$get(undefined, options))
}

/**
 * POST /process
 */
export async function postProcess(
  args: InferRequestType<typeof client.process.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.process.$post(args, options))
}

/**
 * GET /graph
 */
export async function getGraph(options?: ClientRequestOptions) {
  return await parseResponse(client.graph.$get(undefined, options))
}

/**
 * POST /transform
 */
export async function postTransform(
  args: InferRequestType<typeof client.transform.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.transform.$post(args, options))
}
